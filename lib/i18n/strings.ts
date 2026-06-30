export type Language = 'en' | 'es';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Hero
    'hero.headline': "You don't have a confidence problem. You have a timing problem.",
    'hero.subheadline':
      "I help faith-driven professionals who've confused invisibility with humility stop deferring the authority God already gave them — not by becoming someone louder, but by correcting the timing of their signal.",
    'hero.cta': 'Apply for the Founding Cohort',

    // Features
    'features.heading': 'For faith-driven professionals who are accurate but overlooked',
    'features.subheading': 'Trusted informally, never chosen formally. The Signal Audit is built to surface and correct this pattern.',
    'features.invoicing.title': 'The Signal Audit',
    'features.invoicing.body':
      'A diagnostic that measures the gap between your internal clarity and how fully you say it out loud. Know exactly where your signal breaks down.',
    'features.expenses.title': 'Gap Diagnosis',
    'features.expenses.body':
      'Understand the specific pattern keeping you invisible — Chronic Deferred Authority, Selective Signal Gap, or Situational mismatch.',
    'features.payments.title': 'Authority Recalibration',
    'features.payments.body':
      'Practical work to correct the timing of your signal — not louder, not a different version of you. Just the right moment.',

    // How It Works
    'hiw.heading': 'How it works',
    'hiw.1.title': 'Take the Signal Audit',
    'hiw.1.body':
      'Complete the diagnostic to measure the gap between your internal clarity and your signal strength.',
    'hiw.2.title': 'Get your gap diagnosis',
    'hiw.2.body':
      'Receive your pattern label and a clear picture of where your signal is breaking down.',
    'hiw.3.title': 'Apply for the founding cohort',
    'hiw.3.body':
      'Do direct work on correcting the timing of your authority — not your confidence.',
    'hiw.3.scarcity': '3 of 5 spots remaining',

    // Waitlist form section
    'waitlist.heading': 'Apply for the founding cohort',
    'waitlist.subheading':
      'Five spots. Direct work. If you have been accurate but overlooked, this is for you.',
    'waitlist.cta': 'Apply Now',
    'waitlist.success':
      'Application received. I will be in touch shortly.',
    'waitlist.error':
      'Something went wrong. Please try again or reach out directly.',

    // Form fields
    'form.firstName.label': 'First name',
    'form.firstName.placeholder': 'Alex',
    'form.firstName.error': 'Please enter your first name.',
    'form.email.label': 'Email',
    'form.email.placeholder': 'alex@yourcompany.com',
    'form.email.error': 'Please enter a valid email address.',
    'form.language.label': 'Preferred language',

    // Footer
    'footer.tagline': 'Correcting the timing of your signal.',
    'footer.copyright': '© 2026 Deferred Authority. All rights reserved.',

    // App — nav
    'app.nav.dashboard': 'Overview',
    'app.nav.invoices': 'Audit Sessions',
    'app.nav.expenses': 'Pattern Log',
    'app.nav.settings': 'Settings',
    'app.nav.logout': 'Log out',

    // App — login
    'app.login.heading': 'Welcome back',
    'app.login.subheading': 'Sign in to your Deferred Authority account',
    'app.login.cta': 'Log in',
    'app.login.helper': 'Use demo@deferredauthority.com / demo1234 to sign in',
    'app.login.error': 'Please enter your email and password.',

    // App — dashboard
    'app.dashboard.greeting': 'Good morning',
    'app.dashboard.subtitle': "Here's your signal snapshot",
    'app.dashboard.stats.invoiced': 'Clarity Score',
    'app.dashboard.stats.collected': 'Signal Score',
    'app.dashboard.stats.outstanding': 'Gap',
    'app.dashboard.stats.avgTime': 'Pattern Label',
    'app.dashboard.recentSessions': 'Recent Audit Sessions',
    'app.dashboard.viewAll': 'View all',
    'app.dashboard.newSession': 'New Session',
    'app.dashboard.logPattern': 'Log Pattern',

    // App — audit sessions
    'app.invoices.heading': 'Audit Sessions',
    'app.invoices.newButton': 'New Session',
    'app.invoices.filterAll': 'All',
    'app.invoices.filterAligned': 'Aligned',
    'app.invoices.filterDeferred': 'Deferred',
    'app.invoices.filterSelective': 'Selective',
    'app.invoices.filterSituational': 'Situational',
    'app.invoices.modal.heading': 'New Session',
    'app.invoices.modal.client': 'Participant name',
    'app.invoices.modal.description': 'Focus area',
    'app.invoices.modal.amount': 'Score',
    'app.invoices.modal.dueDate': 'Session date',
    'app.invoices.modal.send': 'Save Session',
    'app.invoices.modal.cancel': 'Cancel',
    'app.invoices.toast': 'Session saved.',

    // App — pattern log
    'app.expenses.heading': 'Pattern Log',
    'app.expenses.addButton': 'Log Pattern',
    'app.expenses.thisMonth': 'Clarity Avg.',
    'app.expenses.lastMonth': 'Signal Avg.',
    'app.expenses.taxDeductible': 'Gap Avg.',
    'app.expenses.modal.heading': 'Log Pattern',
    'app.expenses.modal.description': 'Observation',
    'app.expenses.modal.category': 'Pattern type',
    'app.expenses.modal.amount': 'Gap score',
    'app.expenses.modal.date': 'Date',
    'app.expenses.modal.save': 'Save Pattern',
    'app.expenses.toast': 'Pattern logged.',

    // App — settings
    'app.settings.heading': 'Settings',
    'app.settings.profile': 'Profile',
    'app.settings.firstName': 'First name',
    'app.settings.lastName': 'Last name',
    'app.settings.email': 'Email',
    'app.settings.businessName': 'Organization',
    'app.settings.saveChanges': 'Save changes',
    'app.settings.toast': 'Profile updated',
    'app.settings.preferences': 'Preferences',
    'app.settings.language': 'Language',
    'app.settings.languageDesc': 'Interface language',
    'app.settings.currency': 'Currency display',
    'app.settings.currencyDesc': 'Used for pricing figures',
    'app.settings.notifications': 'Email notifications',
    'app.settings.notificationsDesc': 'Receive program updates',
  },

  es: {
    // Hero
    'hero.headline': 'No tienes un problema de confianza. Tienes un problema de timing.',
    'hero.subheadline':
      'Ayudo a profesionales con fe que han confundido la invisibilidad con humildad a dejar de diferir la autoridad que Dios ya les dio — no volviéndose más ruidosos, sino corrigiendo el momento de su señal.',
    'hero.cta': 'Aplicar al cohorte fundador',

    // Features
    'features.heading': 'Para profesionales con fe que son precisos pero ignorados',
    'features.subheading': 'Confiados informalmente, nunca elegidos formalmente. La Auditoría de Señal está diseñada para identificar y corregir este patrón.',
    'features.invoicing.title': 'La Auditoría de Señal',
    'features.invoicing.body':
      'Un diagnóstico que mide la brecha entre tu claridad interna y qué tan completamente la expresas. Entiende exactamente dónde se interrumpe tu señal.',
    'features.expenses.title': 'Diagnóstico de brecha',
    'features.expenses.body':
      'Comprende el patrón específico que te mantiene invisible — Autoridad Diferida Crónica, Brecha de Señal Selectiva o desajuste situacional.',
    'features.payments.title': 'Recalibración de autoridad',
    'features.payments.body':
      'Trabajo práctico para corregir el momento de tu señal — no más ruidoso, no una versión diferente de ti. Solo el momento correcto.',

    // How It Works
    'hiw.heading': 'Cómo funciona',
    'hiw.1.title': 'Toma la Auditoría de Señal',
    'hiw.1.body':
      'Completa el diagnóstico para medir la brecha entre tu claridad interna y la fuerza de tu señal.',
    'hiw.2.title': 'Recibe tu diagnóstico de brecha',
    'hiw.2.body':
      'Recibe tu etiqueta de patrón y una imagen clara de dónde se interrumpe tu señal.',
    'hiw.3.title': 'Aplica al cohorte fundador',
    'hiw.3.body':
      'Trabaja directamente en corregir el momento de tu autoridad — no tu confianza.',
    'hiw.3.scarcity': '3 de 5 lugares disponibles',

    // Waitlist form section
    'waitlist.heading': 'Aplica al cohorte fundador',
    'waitlist.subheading':
      'Cinco lugares. Trabajo directo. Si has sido preciso pero ignorado, esto es para ti.',
    'waitlist.cta': 'Aplicar ahora',
    'waitlist.success':
      'Solicitud recibida. Me pondré en contacto pronto.',
    'waitlist.error':
      'Algo salió mal. Intenta de nuevo o contáctanos directamente.',

    // Form fields
    'form.firstName.label': 'Nombre',
    'form.firstName.placeholder': 'Alejandro',
    'form.firstName.error': 'Por favor ingresa tu nombre.',
    'form.email.label': 'Correo electrónico',
    'form.email.placeholder': 'alejandro@tuempresa.com',
    'form.email.error': 'Por favor ingresa un correo electrónico válido.',
    'form.language.label': 'Idioma preferido',

    // Footer
    'footer.tagline': 'Corrigiendo el momento de tu señal.',
    'footer.copyright': '© 2026 Deferred Authority. Todos los derechos reservados.',

    // App — nav
    'app.nav.dashboard': 'Vista general',
    'app.nav.invoices': 'Sesiones de auditoría',
    'app.nav.expenses': 'Registro de patrones',
    'app.nav.settings': 'Configuración',
    'app.nav.logout': 'Cerrar sesión',

    // App — login
    'app.login.heading': 'Bienvenido de vuelta',
    'app.login.subheading': 'Inicia sesión en tu cuenta de Deferred Authority',
    'app.login.cta': 'Iniciar sesión',
    'app.login.helper': 'Usa demo@deferredauthority.com / demo1234 para iniciar sesión',
    'app.login.error': 'Por favor ingresa tu correo y contraseña.',

    // App — dashboard
    'app.dashboard.greeting': 'Buen día',
    'app.dashboard.subtitle': 'Tu resumen de señal',
    'app.dashboard.stats.invoiced': 'Puntuación de claridad',
    'app.dashboard.stats.collected': 'Puntuación de señal',
    'app.dashboard.stats.outstanding': 'Brecha',
    'app.dashboard.stats.avgTime': 'Etiqueta de patrón',
    'app.dashboard.recentSessions': 'Sesiones de auditoría recientes',
    'app.dashboard.viewAll': 'Ver todo',
    'app.dashboard.newSession': 'Nueva sesión',
    'app.dashboard.logPattern': 'Registrar patrón',

    // App — audit sessions
    'app.invoices.heading': 'Sesiones de auditoría',
    'app.invoices.newButton': 'Nueva sesión',
    'app.invoices.filterAll': 'Todas',
    'app.invoices.filterAligned': 'Alineadas',
    'app.invoices.filterDeferred': 'Diferidas',
    'app.invoices.filterSelective': 'Selectivas',
    'app.invoices.filterSituational': 'Situacionales',
    'app.invoices.modal.heading': 'Nueva sesión',
    'app.invoices.modal.client': 'Nombre del participante',
    'app.invoices.modal.description': 'Área de enfoque',
    'app.invoices.modal.amount': 'Puntuación',
    'app.invoices.modal.dueDate': 'Fecha de sesión',
    'app.invoices.modal.send': 'Guardar sesión',
    'app.invoices.modal.cancel': 'Cancelar',
    'app.invoices.toast': 'Sesión guardada.',

    // App — pattern log
    'app.expenses.heading': 'Registro de patrones',
    'app.expenses.addButton': 'Registrar patrón',
    'app.expenses.thisMonth': 'Prom. claridad',
    'app.expenses.lastMonth': 'Prom. señal',
    'app.expenses.taxDeductible': 'Prom. brecha',
    'app.expenses.modal.heading': 'Registrar patrón',
    'app.expenses.modal.description': 'Observación',
    'app.expenses.modal.category': 'Tipo de patrón',
    'app.expenses.modal.amount': 'Puntuación de brecha',
    'app.expenses.modal.date': 'Fecha',
    'app.expenses.modal.save': 'Guardar patrón',
    'app.expenses.toast': 'Patrón registrado.',

    // App — settings
    'app.settings.heading': 'Configuración',
    'app.settings.profile': 'Perfil',
    'app.settings.firstName': 'Nombre',
    'app.settings.lastName': 'Apellido',
    'app.settings.email': 'Correo electrónico',
    'app.settings.businessName': 'Organización',
    'app.settings.saveChanges': 'Guardar cambios',
    'app.settings.toast': 'Perfil actualizado',
    'app.settings.preferences': 'Preferencias',
    'app.settings.language': 'Idioma',
    'app.settings.languageDesc': 'Idioma de la interfaz',
    'app.settings.currency': 'Moneda',
    'app.settings.currencyDesc': 'Usada para cifras de precios',
    'app.settings.notifications': 'Notificaciones por correo',
    'app.settings.notificationsDesc': 'Recibir actualizaciones del programa',
  },
};
