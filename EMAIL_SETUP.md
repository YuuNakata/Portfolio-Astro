# 📧 Configuración del Sistema de Email para Notificaciones de Contacto

Este documento explica cómo configurar notificaciones por email automáticas cuando alguien envía un mensaje desde tu portafolio.

## 🎯 ¿Qué hace este sistema?

- ✅ **Notificaciones automáticas**: Recibe un email cada vez que alguien te contacta
- ✅ **Información completa**: Los emails incluyen nombre, email, asunto y mensaje completo
- ✅ **Diseño profesional**: Emails con formato HTML responsive
- ✅ **Fácil configuración**: Solo necesitas una cuenta gratuita en Resend
- ✅ **Alta entrega**: Resend tiene excelente reputación de entrega

## 🚀 Guía de Configuración Rápida

### Paso 1: Crear cuenta en Resend

1. Ve a [resend.com](https://resend.com) y regístrate (cuenta gratuita)
2. Verifica tu email
3. Ve a **API Keys** en el menú lateral
4. Haz clic en **Create API Key**
5. Copia la API Key (la necesitarás después)

### Paso 2: Configurar Supabase

1. Ve a tu [Supabase Dashboard](https://supabase.com/dashboard)
2. Selecciona tu proyecto
3. Ve a **Settings** → **Environment Variables**
4. Agrega estas variables:

```
RESEND_API_KEY=tu_api_key_de_resend_aqui
ADMIN_EMAIL=tu_email@donde_recibir_notificaciones
```

### Paso 3: Desplegar la Edge Function

```bash
# Instalar Supabase CLI (si no lo tienes)
npm install -g supabase

# Iniciar sesión
supabase login

# Vincular tu proyecto
supabase link --project-ref TU_PROJECT_REF

# Desplegar la función
supabase functions deploy send-contact-notification
```

### Paso 4: Probar el sistema

#### Opción A: Desde el navegador

1. Ve a tu portafolio
2. Envía un mensaje de prueba desde el formulario de contacto
3. Revisa tu email - deberías recibir la notificación

#### Opción B: Script de prueba

```bash
# Configurar variables de entorno
export PUBLIC_SUPABASE_URL=tu_supabase_url
export PUBLIC_SUPABASE_ANON_KEY=tu_anon_key

# Ejecutar prueba
node test-email.js
```

## 📧 ¿Cómo funciona?

1. **Usuario envía mensaje** → Se guarda en la base de datos
2. **Se invoca Edge Function** → Procesa el mensaje automáticamente
3. **Se envía email** → Tú recibes la notificación por email
4. **Usuario ve confirmación** → El formulario muestra "Mensaje enviado"

## 🎨 Personalización del Email

### Cambiar el remitente

Edita `portfolio-raydel/supabase/functions/send-contact-notification/index.ts`:

```typescript
from: 'Tu Nombre <tu-email@tu-dominio.com>',
```

### Cambiar el diseño

Modifica la variable `emailHtml` en la función para personalizar:

- Colores
- Logo
- Estilos
- Contenido adicional

### Agregar más destinatarios

```typescript
to: ['admin@tudominio.com', 'otro@email.com'],
```

## 🔧 Solución de Problemas

### ❌ "Request body is empty"

- ✅ **Corregido**: Ahora usa `fetch` en lugar de `supabase.functions.invoke`
- ✅ **Solución**: La función ahora recibe correctamente los datos JSON
- ✅ **Validación**: Incluye logging detallado para debugging

### ❌ "JSON parse error"

- ✅ **Corregido**: Mejor manejo de errores de parsing JSON
- ✅ **Validación**: Verifica que el body no esté vacío antes de parsear
- ✅ **Logging**: Muestra el contenido del body para debugging

### ❌ "RESEND_API_KEY not configured"

- Verifica que configuraste la variable de entorno en Supabase
- Asegúrate de que no tenga espacios extras

### ❌ "Function not found"

```bash
# Verificar que la función esté desplegada
supabase functions list

# Si no está, desplegarla
supabase functions deploy send-contact-notification
```

### ❌ Emails no llegan

- Revisa la carpeta de spam
- Verifica que tu email de administrador esté correcto
- Revisa los logs: `supabase functions logs send-contact-notification`

### ❌ Error de CORS

- ✅ **Corregido**: Headers CORS agregados a todas las respuestas
- ✅ **Soporte**: OPTIONS, POST methods permitidos
- ✅ **Orígenes**: `*` (todos los orígenes permitidos)
- ✅ **Headers**: `authorization`, `content-type`, etc.

### ❌ "Request body is empty"

- ✅ **Corregido**: Mejor logging y validación del body
- ✅ **Múltiples métodos**: Intenta leer como text y JSON
- ✅ **Debugging**: Logging detallado de headers y body
- ✅ **Validación**: Verifica campos requeridos antes de procesar

## 📊 Monitoreo y Logs

### Ver logs de la función

```bash
supabase functions logs send-contact-notification
```

### Verificar estado de la función

```bash
supabase functions list
```

### Ver logs en tiempo real

```bash
# Ver logs en tiempo real mientras pruebas
supabase functions logs send-contact-notification --follow
```

### Información de debugging incluida

La función ahora incluye logging detallado:

- ✅ Método HTTP y headers de la request
- ✅ URL completa de la request
- ✅ Contenido del body (text y JSON)
- ✅ Longitud y tipo del body
- ✅ Datos parseados y validados
- ✅ Errores de parsing JSON
- ✅ Respuesta de Resend API
- ✅ Status codes y headers de respuesta

### Logging del cliente

El cliente también incluye logging detallado:

- ✅ Datos del email enviados
- ✅ URL de Supabase
- ✅ Body serializado
- ✅ Status de respuesta
- ✅ Headers de respuesta

## 💡 Alternativas a Resend

Si prefieres otro servicio de email, puedes modificar la función para usar:

### SendGrid

```typescript
const sendgridResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${SENDGRID_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    personalizations: [{ to: [{ email: adminEmail }] }],
    from: { email: 'noreply@tudominio.com' },
    subject: `Nuevo contacto: ${subject}`,
    content: [{ type: 'text/html', value: emailHtml }],
  }),
});
```

### Mailgun

```typescript
const mailgunResponse = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    from: 'Tu Portfolio <noreply@tudominio.com>',
    to: adminEmail,
    subject: `Nuevo contacto: ${subject}`,
    html: emailHtml,
  }),
});
```

## 🎉 ¡Listo

Una vez configurado, recibirás un email profesional cada vez que alguien te contacte desde tu portafolio. Los emails incluyen toda la información necesaria para responder rápidamente a tus potenciales clientes o colaboradores.

¿Necesitas ayuda con algún paso específico?
