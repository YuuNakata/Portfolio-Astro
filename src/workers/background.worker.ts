// Protocol definitions
type InitMessage = {
  type: "INIT";
  canvas: OffscreenCanvas;
  width: number;
  height: number;
};

type ResizeMessage = {
  type: "RESIZE";
  width: number;
  height: number;
};

type WorkerMessage = InitMessage | ResizeMessage;

// Configuration
const GRID_SIZE = 20; // Internal spatial grid
// Increased connection distance for more "jumping" connections
const CONNECTION_DISTANCE = 90;
// Moderate density (600 is less dense than 250, but denser than 1200)
const PARTICLE_DENSITY = 600;

let canvas: OffscreenCanvas | null = null;
let ctx: OffscreenCanvasRenderingContext2D | null = null;
let width = 0;
let height = 0;
let particles: Particle[] = [];
let animationFrameId: number;

// Spatial Grid
let grid: Map<string, Particle[]> = new Map();

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  type: number; // 0 = square, 1 = cross

  constructor(w: number, h: number) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    // Faster movement for "fluidity" (Increased from 0.3 to 0.8)
    this.vx = (Math.random() - 0.5) * 0.8;
    this.vy = (Math.random() - 0.5) * 0.8;
    // Larger size: 3px to 5px
    this.size = Math.floor(Math.random() * 3) + 3;
    this.type = Math.random() > 0.9 ? 1 : 0;
  }

  update(w: number, h: number) {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;
  }

  draw(context: OffscreenCanvasRenderingContext2D) {
    // 1:1 Direct drawing (No snapping)
    const drawX = this.x;
    const drawY = this.y;

    // Reduced opacity by ~20% (0.5 -> 0.3)
    context.fillStyle = "rgba(100, 100, 100, 0.3)";

    // Force single pixel for EVERYTHING to ensure minimal size
    // Using dynamic size for middle ground (2-3px)
    context.fillRect(drawX, drawY, this.size, this.size);
  }
}

function initParticles() {
  particles = [];
  const count = Math.floor((width * height) / PARTICLE_DENSITY);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(width, height));
  }
}

function updateGrid() {
  grid.clear();
  const cellSize = CONNECTION_DISTANCE;

  for (const p of particles) {
    const gx = Math.floor(p.x / cellSize);
    const gy = Math.floor(p.y / cellSize);
    const key = `${gx},${gy}`;

    if (!grid.has(key)) {
      grid.set(key, []);
    }
    grid.get(key)!.push(p);
  }
}

function getNeighbors(p: Particle, cellSize: number): Particle[] {
  const neighbors: Particle[] = [];
  const gx = Math.floor(p.x / cellSize);
  const gy = Math.floor(p.y / cellSize);

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const key = `${gx + x},${gy + y}`;
      const cellParticles = grid.get(key);
      if (cellParticles) {
        for (const neighbor of cellParticles) {
          neighbors.push(neighbor);
        }
      }
    }
  }
  return neighbors;
}

function animate() {
  if (!ctx) return;

  // Clear
  ctx.clearRect(0, 0, width, height);

  // Draw subtle grid lines? No, at high res grid lines can look messy.
  // Skipping grid lines for cleaner noise.

  updateGrid();
  const cellSize = CONNECTION_DISTANCE;

  ctx.beginPath();

  for (const i of particles) {
    const neighbors = getNeighbors(i, cellSize);

    for (const j of neighbors) {
      if (i === j) continue;

      const dx = i.x - j.x;
      const dy = i.y - j.y;
      const distSq = dx * dx + dy * dy;
      const maxDistSq = CONNECTION_DISTANCE * CONNECTION_DISTANCE;

      if (distSq < maxDistSq) {
        const dist = Math.sqrt(distSq);

        // Direct high-res lines
        // Offset 0.5 for crisp 1px rendering
        const x1 = i.x + 0.5;
        const y1 = i.y + 0.5;
        const x2 = j.x + 0.5;
        const y2 = j.y + 0.5;

        // Dynamic opacity
        ctx.beginPath();
        // Dynamic opacity - slightly more transparent
        ctx.strokeStyle = `rgba(34, 211, 238, ${
          0.1 - dist / (CONNECTION_DISTANCE * 5)
        })`;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }
  }

  for (const p of particles) {
    p.update(width, height);
    p.draw(ctx);
  }

  animationFrameId = requestAnimationFrame(animate);
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  const { type } = e.data;

  if (type === "INIT") {
    console.log("Worker received INIT message");
    const {
      canvas: offscreenCanvas,
      width: w,
      height: h,
    } = e.data as InitMessage;
    canvas = offscreenCanvas;
    // CRITICAL: Set the internal resolution of the OffscreenCanvas matches the screen buffer
    canvas.width = w;
    canvas.height = h;

    ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
    width = w;
    height = h;
    initParticles();
    animate();
    console.log(`Worker initialized with resolution: ${w}x${h}`);
  } else if (type === "RESIZE") {
    const { width: w, height: h } = e.data as ResizeMessage;
    width = w;
    height = h;
    if (canvas) {
      canvas.width = w;
      canvas.height = h;
    }
    initParticles();
  }
};
