import sharp from "sharp";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INPUT = join(__dirname, "src", "assets", "raydel-avatar.jpg");
const OUTPUT_DIR = join(__dirname, "public");

console.log("🎨 Generando favicons circulares...\n");

// Verificar que existe la imagen
if (!existsSync(INPUT)) {
  console.error("❌ No se encontró la imagen:", INPUT);
  process.exit(1);
}

// Crear máscara circular SVG
const createCircleMask = (size) => {
  const radius = size / 2;
  return Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${radius}" cy="${radius}" r="${radius}" fill="white"/>
    </svg>`,
  );
};

// Generar favicon circular
const generateFavicon = async (size, outputName) => {
  try {
    const mask = createCircleMask(size);

    await sharp(INPUT)
      .resize(size, size, { fit: "cover", position: "center" })
      .composite([{ input: mask, blend: "dest-in" }])
      .png({ quality: 100, compressionLevel: 9 })
      .toFile(join(OUTPUT_DIR, outputName));

    console.log(`✅ ${outputName} (${size}x${size})`);
    return true;
  } catch (error) {
    console.error(`❌ Error en ${outputName}:`, error.message);
    return false;
  }
};

// Lista de favicons a generar
const favicons = [
  { size: 16, name: "favicon-16x16.png" },
  { size: 32, name: "favicon-32x32.png" },
  { size: 48, name: "favicon-48x48.png" },
  { size: 64, name: "favicon-64x64.png" },
  { size: 180, name: "apple-touch-icon.png" },
  { size: 192, name: "android-chrome-192x192.png" },
  { size: 512, name: "android-chrome-512x512.png" },
];

// Generar todos los favicons
(async () => {
  let success = 0;

  for (const { size, name } of favicons) {
    const result = await generateFavicon(size, name);
    if (result) success++;
  }

  // Generar favicon.ico (32x32)
  if (await generateFavicon(32, "favicon.ico")) {
    success++;
  }

  console.log(
    `\n✨ Completado: ${success}/${favicons.length + 1} favicons generados`,
  );
  console.log("📁 Ubicación:", OUTPUT_DIR);
})();
