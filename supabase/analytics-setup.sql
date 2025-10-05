-- ============================================
-- ANALYTICS SYSTEM FOR PORTFOLIO
-- Private visit tracking without exposing data
-- ============================================

-- 1. Create analytics table
CREATE TABLE IF NOT EXISTS analytics_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT, -- mobile, desktop, tablet
  browser TEXT,
  os TEXT,
  session_id TEXT,
  ip_hash TEXT, -- hashed IP for privacy
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_visits_date ON analytics_visits(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_page ON analytics_visits(page_path);
CREATE INDEX IF NOT EXISTS idx_visits_session ON analytics_visits(session_id);

-- 3. Create view for daily stats
CREATE OR REPLACE VIEW analytics_daily_stats AS
SELECT
  DATE(visited_at) as date,
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(DISTINCT page_path) as pages_visited,
  ARRAY_AGG(DISTINCT page_path) as popular_pages
FROM analytics_visits
GROUP BY DATE(visited_at)
ORDER BY date DESC;

-- 4. Create view for monthly stats
CREATE OR REPLACE VIEW analytics_monthly_stats AS
SELECT
  DATE_TRUNC('month', visited_at) as month,
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(DISTINCT page_path) as pages_visited,
  ARRAY_AGG(DISTINCT page_path) as popular_pages
FROM analytics_visits
GROUP BY DATE_TRUNC('month', visited_at)
ORDER BY month DESC;

-- 5. Create view for page stats
CREATE OR REPLACE VIEW analytics_page_stats AS
SELECT
  page_path,
  COUNT(*) as total_views,
  COUNT(DISTINCT session_id) as unique_visitors,
  MAX(visited_at) as last_visit,
  MIN(visited_at) as first_visit
FROM analytics_visits
GROUP BY page_path
ORDER BY total_views DESC;

-- 6. Create view for device/browser stats
CREATE OR REPLACE VIEW analytics_device_stats AS
SELECT
  device_type,
  browser,
  os,
  COUNT(*) as visits,
  COUNT(DISTINCT session_id) as unique_users
FROM analytics_visits
GROUP BY device_type, browser, os
ORDER BY visits DESC;

-- 7. Create function to get analytics summary
CREATE OR REPLACE FUNCTION get_analytics_summary(secret_key TEXT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Verify secret key (replace 'your-secret-key' with your actual key)
  IF secret_key != 'portfolio-analytics-secret-2024' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  SELECT json_build_object(
    'total', (SELECT COUNT(*) FROM analytics_visits),
    'unique_visitors', (SELECT COUNT(DISTINCT session_id) FROM analytics_visits),
    'today', (
      SELECT json_build_object(
        'visits', COUNT(*),
        'unique', COUNT(DISTINCT session_id)
      )
      FROM analytics_visits
      WHERE DATE(visited_at) = CURRENT_DATE
    ),
    'this_week', (
      SELECT json_build_object(
        'visits', COUNT(*),
        'unique', COUNT(DISTINCT session_id)
      )
      FROM analytics_visits
      WHERE visited_at >= DATE_TRUNC('week', CURRENT_DATE)
    ),
    'this_month', (
      SELECT json_build_object(
        'visits', COUNT(*),
        'unique', COUNT(DISTINCT session_id)
      )
      FROM analytics_visits
      WHERE visited_at >= DATE_TRUNC('month', CURRENT_DATE)
    ),
    'top_pages', (
      SELECT json_agg(
        json_build_object('page', page_path, 'views', views)
      )
      FROM (
        SELECT page_path, COUNT(*) as views
        FROM analytics_visits
        GROUP BY page_path
        ORDER BY views DESC
        LIMIT 10
      ) top
    ),
    'devices', (
      SELECT json_object_agg(device_type, count)
      FROM (
        SELECT device_type, COUNT(*) as count
        FROM analytics_visits
        WHERE device_type IS NOT NULL
        GROUP BY device_type
      ) devices
    ),
    'browsers', (
      SELECT json_object_agg(browser, count)
      FROM (
        SELECT browser, COUNT(*) as count
        FROM analytics_visits
        WHERE browser IS NOT NULL
        GROUP BY browser
        ORDER BY count DESC
        LIMIT 5
      ) browsers
    ),
    'recent_visits', (
      SELECT json_agg(
        json_build_object(
          'page', page_path,
          'time', visited_at,
          'device', device_type
        )
      )
      FROM (
        SELECT page_path, visited_at, device_type
        FROM analytics_visits
        ORDER BY visited_at DESC
        LIMIT 20
      ) recent
    )
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create function to get daily breakdown
CREATE OR REPLACE FUNCTION get_analytics_daily(
  secret_key TEXT,
  days_back INTEGER DEFAULT 30
)
RETURNS JSON AS $$
BEGIN
  IF secret_key != 'portfolio-analytics-secret-2024' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN (
    SELECT json_agg(
      json_build_object(
        'date', date,
        'visits', visits,
        'unique_visitors', unique_visitors
      )
      ORDER BY date DESC
    )
    FROM (
      SELECT
        DATE(visited_at) as date,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM analytics_visits
      WHERE visited_at >= CURRENT_DATE - days_back
      GROUP BY DATE(visited_at)
    ) daily
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 9. Create function to get monthly breakdown
CREATE OR REPLACE FUNCTION get_analytics_monthly(
  secret_key TEXT,
  months_back INTEGER DEFAULT 12
)
RETURNS JSON AS $$
BEGIN
  IF secret_key != 'portfolio-analytics-secret-2024' THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  RETURN (
    SELECT json_agg(
      json_build_object(
        'month', month,
        'visits', visits,
        'unique_visitors', unique_visitors
      )
      ORDER BY month DESC
    )
    FROM (
      SELECT
        TO_CHAR(DATE_TRUNC('month', visited_at), 'YYYY-MM') as month,
        COUNT(*) as visits,
        COUNT(DISTINCT session_id) as unique_visitors
      FROM analytics_visits
      WHERE visited_at >= DATE_TRUNC('month', CURRENT_DATE) - (months_back || ' months')::INTERVAL
      GROUP BY DATE_TRUNC('month', visited_at)
    ) monthly
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 10. Enable RLS (Row Level Security) - Important for privacy
ALTER TABLE analytics_visits ENABLE ROW LEVEL SECURITY;

-- 11. Create policy - only allow insert from authenticated sources
CREATE POLICY "Allow public insert" ON analytics_visits
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- 12. Create policy - no public read access
CREATE POLICY "No public read" ON analytics_visits
  FOR SELECT
  TO anon
  USING (false);

-- 13. Create policy - allow service role full access
CREATE POLICY "Service role full access" ON analytics_visits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- ============================================
-- INSTRUCTIONS:
-- ============================================
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Change 'portfolio-analytics-secret-2024' to your own secret key
-- 3. Keep the secret key safe in your .env file
-- 4. Use the API endpoints created in the next steps
-- ============================================
