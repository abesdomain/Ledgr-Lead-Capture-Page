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

    // App — nav
    'app.nav.dashboard': 'Dashboard',
    'app.nav.invoices': 'Invoices',
    'app.nav.expenses': 'Expenses',
    'app.nav.settings': 'Settings',
    'app.nav.logout': 'Log out',

    // App — login
    'app.login.heading': 'Welcome back',
    'app.login.subheading': 'Sign in to your Ledgr account',
    'app.login.cta': 'Log in',
    'app.login.helper': 'Use demo@ledgr.app / demo1234 to sign in',
    'app.login.error': 'Please enter your email and password.',

    // App — dashboard
    'app.dashboard.greeting': 'Good morning',
    'app.dashboard.subtitle': "Here's your financial snapshot for June 2026",
    'app.dashboard.stats.invoiced': 'Total Invoiced',
    'app.dashboard.stats.collected': 'Collected',
    'app.dashboard.stats.outstanding': 'Outstanding',
    'app.dashboard.stats.avgTime': 'Avg. Payment Time',
    'app.dashboard.recentInvoices': 'Recent Invoices',
    'app.dashboard.viewAll': 'View all',
    'app.dashboard.newInvoice': 'New Invoice',
    'app.dashboard.logExpense': 'Log Expense',

    // App — invoices
    'app.invoices.heading': 'Invoices',
    'app.invoices.newButton': 'New Invoice',
    'app.invoices.filterAll': 'All',
    'app.invoices.filterPaid': 'Paid',
    'app.invoices.filterPending': 'Pending',
    'app.invoices.filterOverdue': 'Overdue',
    'app.invoices.modal.heading': 'New Invoice',
    'app.invoices.modal.client': 'Client name',
    'app.invoices.modal.description': 'Description',
    'app.invoices.modal.amount': 'Amount',
    'app.invoices.modal.dueDate': 'Due date',
    'app.invoices.modal.send': 'Send Invoice',
    'app.invoices.modal.cancel': 'Cancel',
    'app.invoices.toast': 'Invoice sent!',

    // App — expenses
    'app.expenses.heading': 'Expenses',
    'app.expenses.addButton': 'Add Expense',
    'app.expenses.thisMonth': 'This Month',
    'app.expenses.lastMonth': 'Last Month',
    'app.expenses.taxDeductible': 'Tax Deductible',
    'app.expenses.modal.heading': 'Add Expense',
    'app.expenses.modal.description': 'Description',
    'app.expenses.modal.category': 'Category',
    'app.expenses.modal.amount': 'Amount',
    'app.expenses.modal.date': 'Date',
    'app.expenses.modal.save': 'Save Expense',
    'app.expenses.toast': 'Expense saved!',

    // App — settings
    'app.settings.heading': 'Settings',
    'app.settings.profile': 'Profile',
    'app.settings.firstName': 'First name',
    'app.settings.lastName': 'Last name',
    'app.settings.email': 'Email',
    'app.settings.businessName': 'Business name',
    'app.settings.saveChanges': 'Save changes',
    'app.settings.toast': 'Profile updated',
    'app.settings.preferences': 'Preferences',
    'app.settings.language': 'Language',
    'app.settings.languageDesc': 'Interface language',
    'app.settings.currency': 'Currency display',
    'app.settings.currencyDesc': 'Used for invoice amounts',
    'app.settings.notifications': 'Email notifications',
    'app.settings.notificationsDesc': 'Receive payment reminders',
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

    // App — nav
    'app.nav.dashboard': 'Panel',
    'app.nav.invoices': 'Facturas',
    'app.nav.expenses': 'Gastos',
    'app.nav.settings': 'Configuración',
    'app.nav.logout': 'Cerrar sesión',

    // App — login
    'app.login.heading': 'Bienvenido de vuelta',
    'app.login.subheading': 'Inicia sesión en tu cuenta de Ledgr',
    'app.login.cta': 'Iniciar sesión',
    'app.login.helper': 'Usa demo@ledgr.app / demo1234 para iniciar sesión',
    'app.login.error': 'Por favor ingresa tu correo y contraseña.',

    // App — dashboard
    'app.dashboard.greeting': 'Buen día',
    'app.dashboard.subtitle': 'Tu resumen financiero de junio de 2026',
    'app.dashboard.stats.invoiced': 'Total facturado',
    'app.dashboard.stats.collected': 'Cobrado',
    'app.dashboard.stats.outstanding': 'Pendiente',
    'app.dashboard.stats.avgTime': 'Tiempo promedio de pago',
    'app.dashboard.recentInvoices': 'Facturas recientes',
    'app.dashboard.viewAll': 'Ver todo',
    'app.dashboard.newInvoice': 'Nueva factura',
    'app.dashboard.logExpense': 'Registrar gasto',

    // App — invoices
    'app.invoices.heading': 'Facturas',
    'app.invoices.newButton': 'Nueva factura',
    'app.invoices.filterAll': 'Todas',
    'app.invoices.filterPaid': 'Pagadas',
    'app.invoices.filterPending': 'Pendientes',
    'app.invoices.filterOverdue': 'Vencidas',
    'app.invoices.modal.heading': 'Nueva factura',
    'app.invoices.modal.client': 'Nombre del cliente',
    'app.invoices.modal.description': 'Descripción',
    'app.invoices.modal.amount': 'Monto',
    'app.invoices.modal.dueDate': 'Fecha de vencimiento',
    'app.invoices.modal.send': 'Enviar factura',
    'app.invoices.modal.cancel': 'Cancelar',
    'app.invoices.toast': '¡Factura enviada!',

    // App — expenses
    'app.expenses.heading': 'Gastos',
    'app.expenses.addButton': 'Agregar gasto',
    'app.expenses.thisMonth': 'Este mes',
    'app.expenses.lastMonth': 'Mes anterior',
    'app.expenses.taxDeductible': 'Deducible de impuestos',
    'app.expenses.modal.heading': 'Agregar gasto',
    'app.expenses.modal.description': 'Descripción',
    'app.expenses.modal.category': 'Categoría',
    'app.expenses.modal.amount': 'Monto',
    'app.expenses.modal.date': 'Fecha',
    'app.expenses.modal.save': 'Guardar gasto',
    'app.expenses.toast': '¡Gasto guardado!',

    // App — settings
    'app.settings.heading': 'Configuración',
    'app.settings.profile': 'Perfil',
    'app.settings.firstName': 'Nombre',
    'app.settings.lastName': 'Apellido',
    'app.settings.email': 'Correo electrónico',
    'app.settings.businessName': 'Nombre del negocio',
    'app.settings.saveChanges': 'Guardar cambios',
    'app.settings.toast': 'Perfil actualizado',
    'app.settings.preferences': 'Preferencias',
    'app.settings.language': 'Idioma',
    'app.settings.languageDesc': 'Idioma de la interfaz',
    'app.settings.currency': 'Moneda',
    'app.settings.currencyDesc': 'Usada para montos de facturas',
    'app.settings.notifications': 'Notificaciones por correo',
    'app.settings.notificationsDesc': 'Recibir recordatorios de pago',
  },
};
