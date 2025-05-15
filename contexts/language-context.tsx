"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

// Define available languages
export type Language = "en" | "es" | "fr" | "ar" | "hi" | "zh"

// Define the context type
type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
  dir: "ltr" | "rtl"
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
  dir: "ltr",
})

// Define RTL languages
const rtlLanguages: Language[] = ["ar"]

// Translation dictionaries
const translations: Record<Language, Record<string, string>> = {
  en: {
    // General
    "app.name": "WhatsApp",
    "app.tagline": "Send and receive messages without keeping your phone online.",
    "app.version": "Version 1.0.0",

    // Auth
    "auth.login": "Log In",
    "auth.signup": "Sign Up",
    "auth.logout": "Logout",
    "auth.email": "Email Address",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Full Name",
    "auth.phone": "Phone Number",
    "auth.createAccount": "Create Account",
    "auth.alreadyHaveAccount": "Already have an account?",
    "auth.dontHaveAccount": "Don't have an account?",
    "auth.demoLogin": "Use Demo Login",
    "auth.loggingIn": "Logging in...",
    "auth.creatingAccount": "Creating Account...",

    // Navigation
    "nav.chats": "Chats",
    "nav.status": "Status",
    "nav.calls": "Calls",
    "nav.communities": "Communities",
    "nav.settings": "Settings",
    "nav.profile": "Profile",

    // Chats
    "chats.newChat": "New Chat",
    "chats.newGroup": "New Group",
    "chats.archived": "Archived",
    "chats.search": "Search or start new chat",
    "chats.typing": "typing...",
    "chats.online": "Online",
    "chats.lastSeen": "Last seen recently",
    "chats.messageInput": "Type a message",

    // Status
    "status.myStatus": "My Status",
    "status.recentUpdates": "Recent updates",
    "status.viewedUpdates": "Viewed updates",
    "status.tapToAdd": "Tap to add status update",

    // Calls
    "calls.recentCalls": "Recent calls",
    "calls.missedCalls": "Missed calls",
    "calls.createCallLink": "Create call link",
    "calls.shareLink": "Share a link for your WhatsApp call",

    // Settings
    "settings.account": "Account",
    "settings.privacy": "Privacy",
    "settings.security": "Security",
    "settings.notifications": "Notifications",
    "settings.storage": "Storage and data",
    "settings.appLanguage": "App language",
    "settings.help": "Help",
    "settings.about": "About",

    // Language names (in their own language)
    "language.en": "English",
    "language.es": "Español",
    "language.fr": "Français",
    "language.ar": "العربية",
    "language.hi": "हिन्दी",
    "language.zh": "中文",
  },

  es: {
    // General
    "app.name": "WhatsApp",
    "app.tagline": "Envía y recibe mensajes sin mantener tu teléfono en línea.",
    "app.version": "Versión 1.0.0",

    // Auth
    "auth.login": "Iniciar Sesión",
    "auth.signup": "Registrarse",
    "auth.logout": "Cerrar Sesión",
    "auth.email": "Correo Electrónico",
    "auth.password": "Contraseña",
    "auth.confirmPassword": "Confirmar Contraseña",
    "auth.name": "Nombre Completo",
    "auth.phone": "Número de Teléfono",
    "auth.createAccount": "Crear Cuenta",
    "auth.alreadyHaveAccount": "¿Ya tienes una cuenta?",
    "auth.dontHaveAccount": "¿No tienes una cuenta?",
    "auth.demoLogin": "Usar Inicio de Sesión Demo",
    "auth.loggingIn": "Iniciando sesión...",
    "auth.creatingAccount": "Creando cuenta...",

    // Navigation
    "nav.chats": "Chats",
    "nav.status": "Estados",
    "nav.calls": "Llamadas",
    "nav.communities": "Comunidades",
    "nav.settings": "Ajustes",
    "nav.profile": "Perfil",

    // Chats
    "chats.newChat": "Nuevo Chat",
    "chats.newGroup": "Nuevo Grupo",
    "chats.archived": "Archivados",
    "chats.search": "Buscar o iniciar nuevo chat",
    "chats.typing": "escribiendo...",
    "chats.online": "En línea",
    "chats.lastSeen": "Última vez recientemente",
    "chats.messageInput": "Escribe un mensaje",

    // Status
    "status.myStatus": "Mi Estado",
    "status.recentUpdates": "Actualizaciones recientes",
    "status.viewedUpdates": "Actualizaciones vistas",
    "status.tapToAdd": "Toca para añadir actualización de estado",

    // Calls
    "calls.recentCalls": "Llamadas recientes",
    "calls.missedCalls": "Llamadas perdidas",
    "calls.createCallLink": "Crear enlace de llamada",
    "calls.shareLink": "Comparte un enlace para tu llamada de WhatsApp",

    // Settings
    "settings.account": "Cuenta",
    "settings.privacy": "Privacidad",
    "settings.security": "Seguridad",
    "settings.notifications": "Notificaciones",
    "settings.storage": "Almacenamiento y datos",
    "settings.appLanguage": "Idioma de la aplicación",
    "settings.help": "Ayuda",
    "settings.about": "Acerca de",

    // Language names (in their own language)
    "language.en": "English",
    "language.es": "Español",
    "language.fr": "Français",
    "language.ar": "العربية",
    "language.hi": "हिन्दी",
    "language.zh": "中文",
  },

  fr: {
    // General
    "app.name": "WhatsApp",
    "app.tagline": "Envoyez et recevez des messages sans garder votre téléphone en ligne.",
    "app.version": "Version 1.0.0",

    // Auth
    "auth.login": "Se Connecter",
    "auth.signup": "S'inscrire",
    "auth.logout": "Déconnexion",
    "auth.email": "Adresse Email",
    "auth.password": "Mot de Passe",
    "auth.confirmPassword": "Confirmer le Mot de Passe",
    "auth.name": "Nom Complet",
    "auth.phone": "Numéro de Téléphone",
    "auth.createAccount": "Créer un Compte",
    "auth.alreadyHaveAccount": "Vous avez déjà un compte?",
    "auth.dontHaveAccount": "Vous n'avez pas de compte?",
    "auth.demoLogin": "Utiliser la Connexion Démo",
    "auth.loggingIn": "Connexion en cours...",
    "auth.creatingAccount": "Création du compte...",

    // Navigation
    "nav.chats": "Discussions",
    "nav.status": "Statuts",
    "nav.calls": "Appels",
    "nav.communities": "Communautés",
    "nav.settings": "Paramètres",
    "nav.profile": "Profil",

    // Chats
    "chats.newChat": "Nouvelle Discussion",
    "chats.newGroup": "Nouveau Groupe",
    "chats.archived": "Archivés",
    "chats.search": "Rechercher ou démarrer une nouvelle discussion",
    "chats.typing": "en train d'écrire...",
    "chats.online": "En ligne",
    "chats.lastSeen": "Vu récemment",
    "chats.messageInput": "Tapez un message",

    // Status
    "status.myStatus": "Mon Statut",
    "status.recentUpdates": "Mises à jour récentes",
    "status.viewedUpdates": "Mises à jour vues",
    "status.tapToAdd": "Appuyez pour ajouter un statut",

    // Calls
    "calls.recentCalls": "Appels récents",
    "calls.missedCalls": "Appels manqués",
    "calls.createCallLink": "Créer un lien d'appel",
    "calls.shareLink": "Partagez un lien pour votre appel WhatsApp",

    // Settings
    "settings.account": "Compte",
    "settings.privacy": "Confidentialité",
    "settings.security": "Sécurité",
    "settings.notifications": "Notifications",
    "settings.storage": "Stockage et données",
    "settings.appLanguage": "Langue de l'application",
    "settings.help": "Aide",
    "settings.about": "À propos",

    // Language names (in their own language)
    "language.en": "English",
    "language.es": "Español",
    "language.fr": "Français",
    "language.ar": "العربية",
    "language.hi": "हिन्दी",
    "language.zh": "中文",
  },

  ar: {
    // General
    "app.name": "واتساب",
    "app.tagline": "أرسل واستقبل الرسائل دون الحاجة إلى إبقاء هاتفك متصلاً بالإنترنت.",
    "app.version": "الإصدار 1.0.0",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.signup": "إنشاء حساب",
    "auth.logout": "تسجيل الخروج",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.name": "الاسم الكامل",
    "auth.phone": "رقم الهاتف",
    "auth.createAccount": "إنشاء حساب",
    "auth.alreadyHaveAccount": "لديك حساب بالفعل؟",
    "auth.dontHaveAccount": "ليس لديك حساب؟",
    "auth.demoLogin": "استخدام تسجيل الدخول التجريبي",
    "auth.loggingIn": "جاري تسجيل الدخول...",
    "auth.creatingAccount": "جاري إنشاء الحساب...",

    // Navigation
    "nav.chats": "الدردشات",
    "nav.status": "الحالة",
    "nav.calls": "المكالمات",
    "nav.communities": "المجتمعات",
    "nav.settings": "الإعدادات",
    "nav.profile": "الملف الشخصي",

    // Chats
    "chats.newChat": "دردشة جديدة",
    "chats.newGroup": "مجموعة جديدة",
    "chats.archived": "المؤرشفة",
    "chats.search": "البحث أو بدء دردشة جديدة",
    "chats.typing": "يكتب...",
    "chats.online": "متصل",
    "chats.lastSeen": "شوهد مؤخرًا",
    "chats.messageInput": "اكتب رسالة",

    // Status
    "status.myStatus": "حالتي",
    "status.recentUpdates": "التحديثات الأخيرة",
    "status.viewedUpdates": "التحديثات المشاهدة",
    "status.tapToAdd": "انقر لإضافة تحديث الحالة",

    // Calls
    "calls.recentCalls": "المكالمات الأخيرة",
    "calls.missedCalls": "المكالمات الفائتة",
    "calls.createCallLink": "إنشاء رابط مكالمة",
    "calls.shareLink": "شارك رابطًا لمكالمة واتساب الخاصة بك",

    // Settings
    "settings.account": "الحساب",
    "settings.privacy": "الخصوصية",
    "settings.security": "الأمان",
    "settings.notifications": "الإشعارات",
    "settings.storage": "التخزين والبيانات",
    "settings.appLanguage": "لغة التطبيق",
    "settings.help": "المساعدة",
    "settings.about": "حول",

    // Language names (in their own language)
    "language.en": "English",
    "language.es": "Español",
    "language.fr": "Français",
    "language.ar": "العربية",
    "language.hi": "हिन्दी",
    "language.zh": "中文",
  },

  hi: {
    // General
    "app.name": "व्हाट्सएप",
    "app.tagline": "अपने फोन को ऑनलाइन रखे बिना संदेश भेजें और प्राप्त करें।",
    "app.version": "संस्करण 1.0.0",

    // Auth
    "auth.login": "लॉग इन करें",
    "auth.signup": "साइन अप करें",
    "auth.logout": "लॉग आउट",
    "auth.email": "ईमेल पता",
    "auth.password": "पासवर्ड",
    "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
    "auth.name": "पूरा नाम",
    "auth.phone": "फोन नंबर",
    "auth.createAccount": "खाता बनाएं",
    "auth.alreadyHaveAccount": "पहले से ही खाता है?",
    "auth.dontHaveAccount": "खाता नहीं है?",
    "auth.demoLogin": "डेमो लॉगिन का उपयोग करें",
    "auth.loggingIn": "लॉग इन हो रहा है...",
    "auth.creatingAccount": "खाता बनाया जा रहा है...",

    // Navigation
    "nav.chats": "चैट",
    "nav.status": "स्टेटस",
    "nav.calls": "कॉल",
    "nav.communities": "समुदाय",
    "nav.settings": "सेटिंग्स",
    "nav.profile": "प्रोफाइल",

    // Chats
    "chats.newChat": "नई चैट",
    "chats.newGroup": "नया समूह",
    "chats.archived": "आर्काइव्ड",
    "chats.search": "खोजें या नई चैट शुरू करें",
    "chats.typing": "टाइप कर रहा है...",
    "chats.online": "ऑनलाइन",
    "chats.lastSeen": "हाल ही में देखा गया",
    "chats.messageInput": "एक संदेश लिखें",

    // Status
    "status.myStatus": "मेरा स्टेटस",
    "status.recentUpdates": "हाल के अपडेट",
    "status.viewedUpdates": "देखे गए अपडेट",
    "status.tapToAdd": "स्टेटस अपडेट जोड़ने के लिए टैप करें",

    // Calls
    "calls.recentCalls": "हाल के कॉल",
    "calls.missedCalls": "मिस्ड कॉल",
    "calls.createCallLink": "कॉल लिंक बनाएं",
    "calls.shareLink": "अपने व्हाट्सएप कॉल के लिए एक लिंक शेयर करें",

    // Settings
    "settings.account": "अकाउंट",
    "settings.privacy": "प्राइवेसी",
    "settings.security": "सुरक्षा",
    "settings.notifications": "नोटिफिकेशन",
    "settings.storage": "स्टोरेज और डेटा",
    "settings.appLanguage": "ऐप भाषा",
    "settings.help": "सहायता",
    "settings.about": "के बारे में",

    // Language names (in their own language)
    "language.en": "English",
    "language.es": "Español",
    "language.fr": "Français",
    "language.ar": "العربية",
    "language.hi": "हिन्दी",
    "language.zh": "中文",
  },

  zh: {
    // General
    "app.name": "WhatsApp",
    "app.tagline": "无需保持手机在线即可发送和接收消息。",
    "app.version": "版本 1.0.0",

    // Auth
    "auth.login": "登录",
    "auth.signup": "注册",
    "auth.logout": "登出",
    "auth.email": "电子邮件地址",
    "auth.password": "密码",
    "auth.confirmPassword": "确认密码",
    "auth.name": "全名",
    "auth.phone": "电话号码",
    "auth.createAccount": "创建账户",
    "auth.alreadyHaveAccount": "已有账户？",
    "auth.dontHaveAccount": "没有账户？",
    "auth.demoLogin": "使用演示登录",
    "auth.loggingIn": "登录中...",
    "auth.creatingAccount": "创建账户中...",

    // Navigation
    "nav.chats": "聊天",
    "nav.status": "状态",
    "nav.calls": "通话",
    "nav.communities": "社区",
    "nav.settings": "设置",
    "nav.profile": "个人资料",

    // Chats
    "chats.newChat": "新聊天",
    "chats.newGroup": "新建群组",
    "chats.archived": "已归档",
    "chats.search": "搜索或开始新的聊天",
    "chats.typing": "正在输入...",
    "chats.online": "在线",
    "chats.lastSeen": "最近查看",
    "chats.messageInput": "输入消息",

    // Status
    "status.myStatus": "我的状态",
    "status.recentUpdates": "最近更新",
    "status.viewedUpdates": "已查看的更新",
    "status.tapToAdd": "点击添加状态更新",

    // Calls
    "calls.recentCalls": "最近通话",
    "calls.missedCalls": "未接来电",
    "calls.createCallLink": "创建通话链接",
    "calls.shareLink": "分享您的WhatsApp通话链接",

    // Settings
    "settings.account": "账户",
    "settings.privacy": "隐私",
    "settings.security": "安全",
    "settings.notifications": "通知",
    "settings.storage": "存储和数据",
    "settings.appLanguage": "应用语言",
    "settings.help": "帮助",
    "settings.about": "关于",

    // Language names (in their own language)
    "language.en": "English",
    "language.es": "Español",
    "language.fr": "Français",
    "language.ar": "العربية",
    "language.hi": "हिन्दी",
    "language.zh": "中文",
  },
}

// Language Provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Get initial language from localStorage or default to English
  const [language, setLanguageState] = useState<Language>("en")
  const [mounted, setMounted] = useState(false)

  // Set up the language on client-side
  useEffect(() => {
    const savedLanguage = localStorage.getItem("whatsapp_language") as Language
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split("-")[0] as Language
      if (Object.keys(translations).includes(browserLang)) {
        setLanguageState(browserLang)
      }
    }
    setMounted(true)
  }, [])

  // Set language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("whatsapp_language", lang)

    // Set document direction based on language
    document.documentElement.dir = rtlLanguages.includes(lang) ? "rtl" : "ltr"
  }

  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) return key
    return translations[language][key] || translations.en[key] || key
  }

  // Determine text direction
  const dir = rtlLanguages.includes(language) ? "rtl" : "ltr"

  // Set document direction
  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = dir
    }
  }, [dir, mounted])

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext)
