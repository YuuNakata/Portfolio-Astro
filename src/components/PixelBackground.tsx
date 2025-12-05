import { useEffect, useRef } from "react";

const PixelBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    // Grid size for snapping
    const GRID_SIZE = 20;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      type: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.2; // Slower for retro feel
        this.vy = (Math.random() - 0.5) * 0.2;
        this.size = Math.random() > 0.5 ? 4 : 2;
        this.type = Math.random() > 0.8 ? 1 : 0; // 0 = square, 1 = cross
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw() {
        if (!ctx) return;

        // Snap to grid
        const drawX = Math.floor(this.x / GRID_SIZE) * GRID_SIZE;
        const drawY = Math.floor(this.y / GRID_SIZE) * GRID_SIZE;

        ctx.fillStyle = "rgba(100, 100, 100, 0.3)";

        if (this.type === 1) {
          // "Cross" shape (plus sign)
          ctx.fillRect(drawX + 4, drawY + 2, 2, 6);
          ctx.fillRect(drawX + 2, drawY + 4, 6, 2);
        } else {
          // Simple block
          ctx.fillRect(drawX + 2, drawY + 2, 4, 4);
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.floor(
        (canvas.width * canvas.height) / 8000 // More sparse for retro feel
      );
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines (Subtle background)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;

      /* 
      // Optional: Draw full grid? Might be too busy. 
      // Keeping it clean for now, just snapping particles.
      */

      // Draw Connections (Snapped)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            // Increased distance range
            // Snap line endpoints too
            const x1 = Math.floor(particles[i].x / GRID_SIZE) * GRID_SIZE + 4;
            const y1 = Math.floor(particles[i].y / GRID_SIZE) * GRID_SIZE + 4;
            const x2 = Math.floor(particles[j].x / GRID_SIZE) * GRID_SIZE + 4;
            const y2 = Math.floor(particles[j].y / GRID_SIZE) * GRID_SIZE + 4;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.15 - distance / 1000})`; // Slightly brighter cyan

            // Draw angular lines instead of straight diagonal (Manhattan style)?
            // Straight diagonal is fine for now but stepped looks more 8-bit.
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-60"
    />
  );
};

export default PixelBackground;
