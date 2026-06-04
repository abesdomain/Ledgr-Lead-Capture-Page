export type Language = 'en' | 'es';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero
    'hero.headline': 'Get Paid Faster — Without the Paperwork',
    'hero.subheadline':
      'Ledgr gives freelancers and small businesses a single place to send invoices, track expenses, and collect payments. Built for people who work, not accountants.',
    'hero.cta': 'Join the Waitlist',

    // Features
    'features.heading': 'Everything you need to run your business finances',
    'features.invoicing.title': 'Professional Invoicing',
    'features.invoicing.body':
      'Create and send polished invoices in seconds. Set payment terms, add your branding, and let Ledgr handle the follow-up.',
    'features.expenses.title': 'Expense Tracking',
    'features.expenses.body':
      'Snap a receipt, tag a category, and move on. Ledgr keeps a clean record so tax season is never a surprise.',
    'features.payments.title': 'Payment Reminders',
    'features.payments.body':
      'Automated, friendly nudges keep your clients on schedule — without the awkward email you never want to write.',

    // How It Works
    'hiw.heading': 'Up and running in three steps',
    'hiw.1.title': 'Sign up',
    'hiw.1.body':
      'Create your free account in under a minute. No credit card required.',
    'hiw.2.title': 'Add your work',
    'hiw.2.body':
      'Import clients, log expenses, or send your first invoice straight away.',
    'hiw.3.title': 'Get paid',
    'hiw.3.body':
      'Clients pay online via card or bank transfer. Funds land directly in your account.',

    // Proof — stats
    'proof.stat1.value': '2 min',
    'proof.stat1.label': 'Average invoice creation time',
    'proof.stat2.value': '94%',
    'proof.stat2.label': 'Of invoices paid within 14 days',
    'proof.stat3.value': '$0',
    'proof.stat3.label': 'Setup cost — always free to start',

    // Proof — testimonials
    'proof.testimonial1.quote':
      '"I used to spend half my Sunday chasing payments. Ledgr cut that to nothing."',
    'proof.testimonial1.author': 'María G. — Freelance Designer',
    'proof.testimonial2.quote':
      '"Finally a finance tool that doesn\'t feel like filing taxes. My whole team switched in a week."',
    'proof.testimonial2.author': 'James T. — Agency Owner',

    // Waitlist form section
    'waitlist.heading': 'Be first in line',
    'waitlist.subheading':
      'Early-access members get six months free and a direct line to our product team. Drop your details below.',
    'waitlist.cta': 'Reserve My Spot',
    'waitlist.success':
      "You're on the list! We'll be in touch soon with early access details.",
    'waitlist.error':
      'Something went wrong. Please try again or email us at hello@ledgr.io.',

    // Form fields
    'form.firstName.label': 'First name',
    'form.firstName.placeholder': 'Alex',
    'form.firstName.error': 'Please enter your first name.',
    'form.email.label': 'Work email',
    'form.email.placeholder': 'alex@yourcompany.com',
    'form.email.error': 'Please enter a valid email address.',
    'form.language.label': 'Preferred language',

    // Footer
    'footer.tagline': 'Simple finances for people who build things.',
    'footer.copyright': '© 2024 Ledgr Technologies Inc. All rights reserved.',
  },

  es: {
    // Hero
    'hero.headline': 'Cobra más rápido — sin papeleo',
    'hero.subheadline':
      'Ledgr le da a freelancers y pequeñas empresas un solo lugar para enviar facturas, registrar gastos y cobrar pagos. Pensado para quien trabaja, no para contadores.',
    'hero.cta': 'Unirse a la lista de espera',

    // Features
    'features.heading': 'Todo lo que necesitas para gestionar tus finanzas',
    'features.invoicing.title': 'Facturación profesional',
    'features.invoicing.body':
      'Crea y envía facturas impecables en segundos. Define los plazos de pago, agrega tu marca y deja que Ledgr gestione los recordatorios.',
    'features.expenses.title': 'Control de gastos',
    'features.expenses.body':
      'Fotografía un recibo, asigna una categoría y sigue adelante. Ledgr mantiene un registro limpio para que la temporada de impuestos no te tome por sorpresa.',
    'features.payments.title': 'Recordatorios de pago',
    'features.payments.body':
      'Avisos automáticos y amigables mantienen a tus clientes al día — sin ese correo incómodo que nunca quieres escribir.',

    // How It Works
    'hiw.heading': 'Empieza en tres pasos',
    'hiw.1.title': 'Regístrate',
    'hiw.1.body':
      'Crea tu cuenta gratuita en menos de un minuto. Sin tarjeta de crédito.',
    'hiw.2.title': 'Agrega tu trabajo',
    'hiw.2.body':
      'Importa clientes, registra gastos o envía tu primera factura de inmediato.',
    'hiw.3.title': 'Cobra',
    'hiw.3.body':
      'Los clientes pagan en línea con tarjeta o transferencia bancaria. El dinero llega directo a tu cuenta.',

    // Proof — stats
    'proof.stat1.value': '2 min',
    'proof.stat1.label': 'Tiempo promedio para crear una factura',
    'proof.stat2.value': '94%',
    'proof.stat2.label': 'De las facturas pagadas en 14 días',
    'proof.stat3.value': '$0',
    'proof.stat3.label': 'Costo de inicio — siempre gratis para comenzar',

    // Proof — testimonials
    'proof.testimonial1.quote':
      '"Antes pasaba la mitad del domingo persiguiendo pagos. Con Ledgr eso desapareció."',
    'proof.testimonial1.author': 'María G. — Diseñadora Freelance',
    'proof.testimonial2.quote':
      '"Por fin una herramienta financiera que no parece declarar impuestos. Todo mi equipo se cambió en una semana."',
    'proof.testimonial2.author': 'James T. — Dueño de Agencia',

    // Waitlist form section
    'waitlist.heading': 'Sé el primero en la fila',
    'waitlist.subheading':
      'Los miembros con acceso anticipado obtienen seis meses gratis y contacto directo con nuestro equipo de producto. Déjanos tus datos.',
    'waitlist.cta': 'Reservar mi lugar',
    'waitlist.success':
      '¡Ya estás en la lista! Pronto te enviaremos los detalles de acceso anticipado.',
    'waitlist.error':
      'Algo salió mal. Inténtalo de nuevo o escríbenos a hello@ledgr.io.',

    // Form fields
    'form.firstName.label': 'Nombre',
    'form.firstName.placeholder': 'Alejandro',
    'form.firstName.error': 'Por favor ingresa tu nombre.',
    'form.email.label': 'Correo de trabajo',
    'form.email.placeholder': 'alejandro@tuempresa.com',
    'form.email.error': 'Por favor ingresa un correo electrónico válido.',
    'form.language.label': 'Idioma preferido',

    // Footer
    'footer.tagline': 'Finanzas simples para quienes crean cosas.',
    'footer.copyright':
      '© 2024 Ledgr Technologies Inc. Todos los derechos reservados.',
  },
};
