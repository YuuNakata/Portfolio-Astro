# 🚀 Portfolio - Raydel Ernesto Reuco García

Un portafolio web moderno y responsivo construido con **Astro**, **React**, **TypeScript** y **Tailwind CSS**. Incluye sistema de internacionalización, notificaciones por email automáticas y diseño profesional.

![Portfolio Preview](./public/images/raydel-avatar.jpg)

## ✨ Características

- 🎨 **Diseño Moderno** - Interfaz limpia y profesional con modo oscuro
- 🌍 **Multidioma** - Soporte completo para Español e Inglés
- 📧 **Notificaciones por Email** - Sistema automático de notificaciones con Resend
- 📱 **Responsive** - Optimizado para todos los dispositivos
- ⚡ **Rendimiento** - Construido con Astro para máxima velocidad
- 🎯 **SEO Optimizado** - Meta tags y estructura semántica
- 🔧 **TypeScript** - Tipado fuerte para mejor desarrollo
- 🎭 **Animaciones** - Transiciones suaves con Framer Motion

## 🛠️ Tecnologías

- **Framework**: [Astro](https://astro.build/)
- **UI**: [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/)
- **Backend**: [Supabase](https://supabase.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- npm, yarn o pnpm
- Cuenta de Supabase
- Cuenta de Resend (opcional, para emails)

### Instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/YuuNakata/Portfolio-Atro.git
   cd Portfolio-Atro
   ```

2. **Instala dependencias**

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura variables de entorno**

   Copia el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   Configura las variables en `.env`:

   ```env
   # Supabase
   PUBLIC_SUPABASE_URL=tu_supabase_url
   PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

   # Email (opcional)
   RESEND_API_KEY=tu_resend_api_key
   ADMIN_EMAIL=tu_email@gmail.com
   ```

4. **Configura Supabase**

   - Crea un proyecto en [Supabase](https://supabase.com/)
   - Ejecuta el SQL en `src/lib/supabase.ts` para crear las tablas
   - Configura las variables de entorno en Supabase Dashboard

5. **Configura Email (opcional)**

   - Crea cuenta en [Resend](https://resend.com/)
   - Obtén tu API key
   - Configura las variables de entorno

## 🏃‍♂️ Desarrollo

```bash
# Inicia el servidor de desarrollo
npm run dev
# o
yarn dev
# o
pnpm dev
```

Visita `http://localhost:4321` para ver el portafolio.

## 📦 Build

```bash
# Construye para producción
npm run build
# o
yarn build
# o
pnpm build

# Previsualiza la build
npm run preview
# o
yarn preview
# o
pnpm preview
```

## 🚀 Deployment

### Vercel (Recomendado)

1. **Conecta tu repositorio a Vercel**
2. **Configura variables de entorno** en Vercel Dashboard
3. **Deploy automático** con cada push

### Otros proveedores

El proyecto está optimizado para cualquier plataforma que soporte Node.js:

- Netlify
- Railway
- Render
- etc.

## 📧 Sistema de Email

El portafolio incluye un sistema automático de notificaciones por email:

### Configuración

1. **Resend Setup**

   ```bash
   # Crea cuenta gratuita en resend.com
   # Obtén tu API key
   ```

2. **Variables de entorno**

   ```env
   RESEND_API_KEY=tu_api_key
   ADMIN_EMAIL=tu_email@gmail.com
   ```

3. **Deploy Function**

   ```bash
   supabase functions deploy send-contact-notification
   ```

### ¿Cómo funciona?

1. Usuario envía mensaje desde el formulario
2. Se guarda en la base de datos
3. Se invoca Edge Function automáticamente
4. Se envía email profesional con toda la información

## 🌍 Internacionalización

El portafolio soporta Español e Inglés completamente:

- Navegación
- Contenido de secciones
- Formularios
- Mensajes de error
- Meta tags

### Cambiar idioma

Los usuarios pueden cambiar el idioma usando el botón de idioma en la barra de navegación.

## 📁 Estructura del Proyecto

```
portfolio-raydel/
├── public/                 # Assets estáticos
├── src/
│   ├── components/         # Componentes React
│   ├── contexts/          # Contextos (Language, Theme)
│   ├── data/              # Datos estáticos (translations, portfolio)
│   ├── lib/               # Utilidades (Supabase, hooks)
│   ├── pages/             # Páginas Astro
│   └── styles/            # Estilos globales
├── supabase/
│   └── functions/         # Edge Functions
└── EMAIL_SETUP.md         # Guía de configuración de email
```

## 🎨 Personalización

### Colores y Tema

Edita `tailwind.config.mjs` para cambiar colores:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#2563eb',
      secondary: '#7c3aed',
      // ... más colores
    }
  }
}
```

### Contenido

Edita los archivos en `src/data/`:

- `portfolio.ts` - Información personal y proyectos
- `translations.ts` - Textos en diferentes idiomas

### Email Template

Personaliza el email en `supabase/functions/send-contact-notification/index.ts`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [Astro](https://astro.build/) - Framework web moderno
- [Supabase](https://supabase.com/) - Backend as a Service
- [Resend](https://resend.com/) - Servicio de email
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Framer Motion](https://www.framer.com/motion/) - Animaciones

## 📞 Contacto

**Raydel Ernesto Reuco García**

- Email: <raydel.reuco@gmail.com>
- LinkedIn: [linkedin.com/in/raydel-ernesto-reuco-garcía](https://www.linkedin.com/in/raydel-ernesto-reuco-garc%C3%ADa-contact-info)
- GitHub: [github.com/raydel-reuco](https://github.com/raydel-reuco)

---

⭐ Si te gusta este proyecto, ¡dale una estrella en GitHub!
