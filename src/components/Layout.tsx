import { motion } from "framer-motion";
import { ArrowUp, Globe, Menu, Moon, Sun, X } from "lucide-react";
import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { useScrollDirection, useTheme } from "../lib/hooks";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggle: toggleTheme } = useTheme();
  const { currentLanguage, setLanguage, t } = useLanguage();
  const scrollDirection = useScrollDirection();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  const navigationItems = React.useMemo(
    () => [
      { href: "#home", label: t("nav.home") },
      { href: "#services", label: t("nav.services") },
      { href: "#about", label: t("nav.about") },
      { href: "#skills", label: t("nav.skills") },
      { href: "#projects", label: t("nav.projects") },
      { href: "#achievements", label: t("nav.achievements") },
      { href: "#education", label: t("nav.education") },
      { href: "#contact", label: t("nav.contact") },
    ],
    [t],
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === "es" ? "en" : "es");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Skip to content link for accessibility */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        {t("a11y.skip.main")}
      </a>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        } bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#home");
                }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                Raydel
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    whileHover={{ y: -2 }}
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t("common.language.toggle")}
              >
                <Globe className="w-5 h-5" />
                <span className="ml-1 text-xs">
                  {currentLanguage.toUpperCase()}
                </span>
              </motion.button>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t("common.theme.toggle")}
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </motion.button>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label={t("a11y.menu.toggle")}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={
              isMenuOpen
                ? { opacity: 1, height: "auto" }
                : { opacity: 0, height: 0 }
            }
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
              {navigationItems.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  whileHover={{ x: 4 }}
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Main Content */}
      <main id="main" className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Raydel Ernesto Reuco García
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                {t("meta.description.home")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex justify-center space-x-6 mb-8"
            >
              <a
                href="mailto:raydel.reuco@gmail.com"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                raydel.reuco@gmail.com
              </a>
              <span className="text-gray-400">•</span>
              <a
                href="tel:+5355791136"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                +53 55791136
              </a>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 dark:text-gray-400">
                Havana, Cuba
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="border-t border-gray-200 dark:border-gray-700 pt-8"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                © {new Date().getFullYear()} Raydel Ernesto Reuco García.{" "}
                {t("footer.rights")}.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                {t("footer.built.with")} Astro + React + Tailwind CSS
              </p>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={
          showScrollTop ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
        }
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-30 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-colors"
        aria-label={t("common.scroll_to_top")}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.05, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-green-400 to-blue-600 rounded-full filter blur-3xl"
        />
      </div>
    </div>
  );
};

export default Layout;
