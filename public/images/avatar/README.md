# 📸 Avatar Directory

Coloca aquí las imágenes de perfil y avatares del portafolio.

## 📋 Especificaciones Recomendadas

- **Formato**: JPG, PNG, WebP
- **Tamaño**: 400x400px (cuadrado)
- **Peso máximo**: 2MB
- **Calidad**: 80-90% para JPG

## 🎯 Archivos de Ejemplo

```
avatar/
├── raydel-avatar.jpg      # Avatar principal
├── raydel-avatar.webp     # Versión optimizada
├── profile-photo.png      # Foto de perfil alternativa
└── README.md             # Este archivo
```

## 🔧 Uso en el Código

```typescript
// En src/data/portfolio.ts
export const portfolioData = {
  personalInfo: {
    avatar: '/images/avatar/raydel-avatar.jpg',
    // ...
  }
}
```

## 📤 Cómo Agregar tu Avatar

1. **Coloca tu imagen** en este directorio
2. **Actualiza la referencia** en `src/data/portfolio.ts`
3. **Commit y push** los cambios

¡Tu avatar aparecerá automáticamente en el portafolio! 🎨
