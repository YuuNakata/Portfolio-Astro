# 📂 ESTADO ACTUAL DEL PROYECTO: Portafolio Raydel Reuco

## 🎯 Objetivo General

Crear un portafolio personal estilo **"Cyber/Hacker/Edgy"** (Cyberpunk minimalista).
El sitio no funciona como una web tradicional con scroll infinito, sino como una **Aplicación de Sistema (HUD)** con módulos independientes y transiciones suaves.

## 🛠 Stack Tecnológico

- **Framework:** Astro (v5+)
- **Lenguaje:** TypeScript / React (para componentes interactivos complejos)
- **Estilos:** Tailwind CSS v4 (Configurado vía variables CSS en `global.css`).
- **Navegación:** Astro View Transitions (`<ClientRouter />`).
- **Iconos:** `lucide-react`.
- **Fuentes:** `@fontsource/silkscreen` (Títulos) y `@fontsource/jetbrains-mono` (Cuerpo).

---

## 🎨 Guía de Estilo (Design System)

- **Vibe:** Terminal moderna, interfaz de videojuego, "System Online".
- **Colores Principales:**
  - Fondo: `#050505` (Casi negro absoluto).
  - Primary (Cyan Tóxico): `#22d3ee`.
  - Secondary (Purple Moe): `#c084fc`.
  - Texto Base: `#e5e5e5`.
- **Layout:**
  - `body` tiene `overflow-hidden` (sin scroll global).
  - El contenido principal tiene su propio scroll interno.
  - Navegación flotante (Dock) en la parte inferior.
  - Fondo de partículas + Scanlines CRT persistentes entre cambios de página.

---

## 📂 Estado de los Archivos Clave

### 1. Configuración (`astro.config.mjs`)

- Usa la integración oficial `@astrojs/tailwind` con `{ applyBaseStyles: false }` para evitar conflictos y controlar nosotros las bases.
- Incluye `react()` y `sitemap()`.

### 2. Estilos Globales (`src/styles/global.css`)

- Define las variables de tema (`--color-primary`, `--font-pixel`, etc.) estilo Tailwind v4.
- Configura el scrollbar invisible pero funcional.
- Define animaciones clave como `glitch`.

### 3. Layout Principal (`src/layouts/Layout.astro`)

- Implementa `<ClientRouter />` para SPA feel.
- Contiene el fondo `<PixelBackground />` con `transition:persist` (no recarga).
- Tiene overlays de CSS para efecto Vignette y Scanlines.
- Define un `slot` principal para contenido y un `slot name="nav"` para la barra.

### 4. Componente de Navegación (`src/components/CyberNav.astro`)

- Barra flotante en la parte inferior (`fixed bottom-8`).
- Estilo "Glassmorphism" oscuro con bordes neón.
- Links: Home, Projects, Profile, Contact.

### 5. Páginas (`src/pages/`)

- ✅ **`index.astro` (Home):** Estilo minimalista, avatar con glitch, textos de bienvenida tipo terminal.
- ✅ **`proyectos.astro` (Projects):** Grid holográfico con tarjetas de proyectos. Header tipo directorio de archivos.
- ❌ **`sobre-mi.astro` (Profile):** **PENDIENTE DE CREAR.** Debe contener la experiencia y skills.
- ❌ **`contacto.astro` (Contact):** **PENDIENTE DE CREAR.** Debe contener formulario o enlaces directos estilo terminal.

---

## 📝 Instrucciones para la IA (Siguientes Pasos)

1. **Crear `src/pages/sobre-mi.astro`:**
   - Usar el mismo `Layout` y `CyberNav`.
   - Diseñar una sección de "Habilidades" que parezca una terminal ejecutando un script.
   - Mostrar la experiencia laboral (Exam Management System, Moogle!, etc.) como "Logs del sistema".

2. **Crear `src/pages/contacto.astro`:**
   - Diseño simple y directo.
   - Botones grandes estilo "Action Buttons" de interfaz de juego.

3. **Refinar Componentes UI:**
   - Si se necesita reutilizar botones o badges, crear componentes en `src/components/ui/`.

4. **Nota sobre Tailwind:**
   - No usar `@apply` en CSS si da problemas. Usar clases utilitarias directamente en el HTML o variables CSS en `global.css`.
