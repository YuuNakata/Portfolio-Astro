# 📁 Estructura de Imágenes

Este directorio contiene todas las imágenes públicas del portafolio. Las imágenes aquí son servidas directamente por el servidor web.

## 📂 Estructura de Directorios

```
public/images/
├── avatar/           # Imágenes de perfil y avatares
├── projects/         # Capturas de pantalla de proyectos
├── backgrounds/      # Imágenes de fondo y decorativas
├── icons/           # Íconos personalizados
└── README.md        # Este archivo
```

## 🎯 Uso en el Código

### **Referencias desde componentes:**

```typescript
// ✅ Correcto - Imágenes en public/
<img src="/images/avatar/raydel-avatar.jpg" alt="Avatar" />

// ❌ Incorrecto - No uses import para imágenes públicas
import avatar from '/images/avatar/raydel-avatar.jpg'
```

### **Optimización automática:**

- ✅ **WebP/AVIF**: Conversión automática
- ✅ **Responsive**: `srcset` automático
- ✅ **Lazy loading**: Carga diferida
- ✅ **Cache**: Headers optimizados

## 📸 Especificaciones de Imágenes

### **Avatar (`/images/avatar/`)**

- **Formato**: JPG, PNG, WebP
- **Tamaño recomendado**: 400x400px
- **Uso**: Foto de perfil principal
- **Ejemplo**: `raydel-avatar.jpg`

### **Proyectos (`/images/projects/`)**

- **Formato**: JPG, PNG, WebP
- **Tamaño recomendado**: 1200x800px
- **Uso**: Capturas de proyectos
- **Convención**: `project-name.jpg`

### **Fondos (`/images/backgrounds/`)**

- **Formato**: JPG, PNG, WebP
- **Tamaño recomendado**: 1920x1080px
- **Uso**: Imágenes de fondo
- **Convención**: `background-name.jpg`

### **Íconos (`/images/icons/`)**

- **Formato**: SVG, PNG
- **Tamaño recomendado**: 64x64px
- **Uso**: Íconos personalizados
- **Convención**: `icon-name.svg`

## 🚀 Subida de Imágenes

### **Paso 1: Coloca tu imagen**

```bash
# Copia tu imagen al directorio correspondiente
cp mi-avatar.jpg public/images/avatar/
cp captura-proyecto.png public/images/projects/
```

### **Paso 2: Actualiza el código**

```typescript
// En src/data/portfolio.ts
export const portfolioData = {
  personalInfo: {
    avatar: '/images/avatar/mi-avatar.jpg',
    // ...
  }
}
```

### **Paso 3: Optimiza (opcional)**

```bash
# Si quieres optimizar imágenes
npm run build  # Astro optimiza automáticamente
```

## 📋 Checklist para Nuevas Imágenes

- [ ] **Formato correcto**: JPG/PNG/WebP/SVG
- [ ] **Tamaño optimizado**: No más de 2MB por imagen
- [ ] **Nombre descriptivo**: `avatar-raydel.jpg`
- [ ] **Directorio correcto**: Según el tipo de imagen
- [ ] **Referencia actualizada**: En el código correspondiente
- [ ] **Responsive**: Considera diferentes tamaños

## 🎨 Recomendaciones

### **Compresión:**

- Usa herramientas como TinyPNG o ImageOptim
- Mantén calidad visual con tamaño reducido

### **Formatos:**

- **Fotos**: JPG (80-90% calidad)
- **Gráficos**: PNG (con transparencia)
- **Web**: WebP (mejor compresión)

### **Nombres:**

- Usa kebab-case: `mi-proyecto-avatar.jpg`
- Sé descriptivo: `dashboard-mobile-view.jpg`

¡Mantén tus imágenes organizadas y optimizadas! 📸
