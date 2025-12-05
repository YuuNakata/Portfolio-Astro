import { useEffect, useRef } from "react";

const PixelBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workerRef = useRef<Worker | null>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Detect OffscreenCanvas support (for safety, though widely supported)
    if (!("transferControlToOffscreen" in canvas)) {
      console.warn(
        "OffscreenCanvas not supported. Background animation disabled."
      );
      return;
    }

    try {
      // Initialize Worker using standard Vite URL constructor
      const worker = new Worker(
        new URL("../workers/background.worker.ts", import.meta.url),
        { type: "module" }
      );
      workerRef.current = worker;

      const offscreen = canvas.transferControlToOffscreen();

      const updateSize = () => {
        const dpr = window.devicePixelRatio || 1;
        const width = window.innerWidth * dpr;
        const height = window.innerHeight * dpr;
        return { width, height };
      };

      const { width, height } = updateSize();

      // Init Worker
      worker.postMessage(
        {
          type: "INIT",
          canvas: offscreen,
          width,
          height,
        },
        [offscreen]
      );

      initialized.current = true;

      const resize = () => {
        if (workerRef.current) {
          const { width, height } = updateSize();
          workerRef.current.postMessage({
            type: "RESIZE",
            width,
            height,
          });
        }
      };

      window.addEventListener("resize", resize);

      return () => {
        window.removeEventListener("resize", resize);
        worker.terminate();
        initialized.current = false;
      };
    } catch (err) {
      console.error("Failed to initialize background worker:", err);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-20"
    />
  );
};

export default PixelBackground;
