# Email Notification Function

Esta Edge Function envía notificaciones por email cuando se recibe un mensaje de contacto en el portafolio.

## 🚀 Configuración Rápida

### 1. Configurar Resend

```bash
# Ve a https://resend.com y crea cuenta gratuita
# Crea una API Key y cópiala
```

### 2. Variables de entorno en Supabase

```bash
# En Supabase Dashboard → Settings → Environment Variables
RESEND_API_KEY=tu_api_key_de_resend
ADMIN_EMAIL=tu_email@donde_recibir_notificaciones
```

### 3. Desplegar

```bash
supabase functions deploy send-contact-notification
```

## 📧 ¿Qué incluye el email?

✅ **Nombre del remitente**
✅ **Email del remitente**
✅ **Asunto del mensaje**
✅ **Contenido completo del mensaje**
✅ **Fecha y hora de recepción**
✅ **Diseño profesional HTML**

## 🎨 Personalización

Edita `index.ts` para cambiar:

- `from`: Dirección del remitente
- `to`: Destinatarios del email
- `subject`: Asunto del email
- `html`: Diseño del email

## 🔧 Comandos Útiles

```bash
# Ver estado de la función
supabase functions list

# Ver logs
supabase functions logs send-contact-notification

# Redeploy
supabase functions deploy send-contact-notification
```

## 💡 Alternativas a Resend

Cambia la URL y headers para usar otros servicios:

### SendGrid

```typescript
const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
  headers: { 'Authorization': `Bearer ${SENDGRID_API_KEY}` },
  // ... resto igual
})
```

### Mailgun

```typescript
const res = await fetch('https://api.mailgun.net/v3/TU_DOMAIN/messages', {
  headers: { 'Authorization': `Basic ${btoa(`api:${MAILGUN_KEY}`)}` },
  // ... resto igual
})
```
