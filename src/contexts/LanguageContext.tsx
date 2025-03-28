
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    // Navigation
    "nav.howItWorks": "How It Works",
    "nav.benefits": "Benefits",
    "nav.about": "About",
    "nav.joinWaitlist": "Join Waitlist",
    
    // Hero Section
    "hero.title": "Own Your Practice, Without the Hassle",
    "hero.subtitle": "Launch and own your medical practice with complete operational support. Maximize your autonomy, income, and professional satisfaction.",
    "hero.joinWaitlist": "Join Waitlist",
    "hero.learnHow": "Learn How It Works",
    "hero.joinedWaitlist": "Join 100+ physicians already on the waitlist",
    
    // Pain Points
    "painPoints.title": "Why Practice Ownership Feels Out of Reach",
    "painPoints.subtitle": "Most physicians want the autonomy and income potential of owning a practice, but face significant barriers:",
    "painPoints.operations.title": "Complex Operations",
    "painPoints.operations.desc": "Starting a practice involves overwhelming operational requirements, regulatory compliance, and administrative burden.",
    "painPoints.profitability.title": "Time to Profitability",
    "painPoints.profitability.desc": "Traditional practice models can take years to reach sustainable profitability, creating financial uncertainty.",
    "painPoints.negotiation.title": "Limited Negotiation Power",
    "painPoints.negotiation.desc": "Individual practices lack bargaining power with insurers, resulting in suboptimal reimbursement rates.",
    "painPoints.admin.title": "Administrative Overhead",
    "painPoints.admin.desc": "Managing compliance, billing, staffing, and technology takes time away from providing patient care.",
    
    // Solution Overview
    "solution.title": "How We Make Practice Ownership Simple",
    "solution.subtitle": "Our comprehensive operational support system removes barriers and simplifies the path to practice ownership.",
    "solution.step1.title": "Apply to Join",
    "solution.step1.desc": "Complete our simple application to join our network of physician-owners. We'll evaluate your practice goals and specialty alignment.",
    "solution.step2.title": "Practice Setup",
    "solution.step2.desc": "We handle everything from location selection to regulatory compliance, staffing, and technology implementation.",
    "solution.step3.title": "Begin Practicing",
    "solution.step3.desc": "Focus on providing exceptional patient care while we manage the day-to-day operations, billing, and administrative tasks.",
    "solution.step4.title": "Grow & Scale",
    "solution.step4.desc": "Leverage our network's growing resources, negotiating power, and operational efficiencies to maximize your practice's potential.",
    "solution.weHandle": "We Handle Everything Else",
    
    // Benefits Grid
    "benefits.title": "The Benefits of Joining Our Network",
    "benefits.subtitle": "Experience the freedom of ownership with the support of an established network.",
    "benefits.income.title": "50-80% Higher Income",
    "benefits.income.desc": "Earn significantly more than traditional employment while retaining the security of our operational support.",
    "benefits.autonomy.title": "Full Clinical Autonomy",
    "benefits.autonomy.desc": "Practice medicine your way, with complete freedom over clinical decision-making and patient care approach.",
    "benefits.launch.title": "Rapid Launch",
    "benefits.launch.desc": "Get your practice up and running in a fraction of the time it would take independently - often in just 90 days.",
    "benefits.risk.title": "Reduced Risk",
    "benefits.risk.desc": "Our operational expertise minimizes financial, regulatory, and administrative risks of practice ownership.",
    "benefits.network.title": "Network Advantages",
    "benefits.network.desc": "Benefit from shared resources, collective negotiating power, and knowledge exchange with peer physicians.",
    "benefits.legacy.title": "Legacy Building",
    "benefits.legacy.desc": "Create a valuable, sustainable practice asset that can be scaled or transferred in the future.",
    
    // Footer
    "footer.description": "Empowering physicians to own their practices while eliminating administrative burdens and maximizing professional satisfaction.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.copyright": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service"
  },
  es: {
    // Navigation
    "nav.howItWorks": "Cómo Funciona",
    "nav.benefits": "Beneficios",
    "nav.about": "Nosotros",
    "nav.joinWaitlist": "Únete a la Lista",
    
    // Hero Section
    "hero.title": "Posee Tu Práctica, Sin Complicaciones",
    "hero.subtitle": "Lanza y posee tu práctica médica con apoyo operativo completo. Maximiza tu autonomía, ingresos y satisfacción profesional.",
    "hero.joinWaitlist": "Únete a la Lista",
    "hero.learnHow": "Aprende Cómo Funciona",
    "hero.joinedWaitlist": "Únete a más de 100 médicos ya en la lista de espera",
    
    // Pain Points
    "painPoints.title": "Por Qué la Propiedad de la Práctica Parece Inalcanzable",
    "painPoints.subtitle": "La mayoría de los médicos desean la autonomía y el potencial de ingresos de tener una práctica propia, pero enfrentan barreras significativas:",
    "painPoints.operations.title": "Operaciones Complejas",
    "painPoints.operations.desc": "Iniciar una práctica implica requisitos operativos abrumadores, cumplimiento regulatorio y carga administrativa.",
    "painPoints.profitability.title": "Tiempo para Rentabilidad",
    "painPoints.profitability.desc": "Los modelos tradicionales de práctica pueden tardar años en alcanzar una rentabilidad sostenible, creando incertidumbre financiera.",
    "painPoints.negotiation.title": "Poder de Negociación Limitado",
    "painPoints.negotiation.desc": "Las prácticas individuales carecen de poder de negociación con las aseguradoras, lo que resulta en tasas de reembolso subóptimas.",
    "painPoints.admin.title": "Sobrecarga Administrativa",
    "painPoints.admin.desc": "Gestionar el cumplimiento, la facturación, el personal y la tecnología quita tiempo para brindar atención al paciente.",
    
    // Solution Overview
    "solution.title": "Cómo Simplificamos la Propiedad de la Práctica",
    "solution.subtitle": "Nuestro sistema integral de apoyo operativo elimina barreras y simplifica el camino hacia la propiedad de la práctica.",
    "solution.step1.title": "Solicitar Unirse",
    "solution.step1.desc": "Complete nuestra simple solicitud para unirse a nuestra red de médicos propietarios. Evaluaremos sus objetivos de práctica y alineación de especialidad.",
    "solution.step2.title": "Configuración de la Práctica",
    "solution.step2.desc": "Nos encargamos de todo, desde la selección de ubicación hasta el cumplimiento normativo, personal e implementación tecnológica.",
    "solution.step3.title": "Comenzar a Practicar",
    "solution.step3.desc": "Concéntrese en brindar atención excepcional al paciente mientras gestionamos las operaciones diarias, facturación y tareas administrativas.",
    "solution.step4.title": "Crecer y Escalar",
    "solution.step4.desc": "Aproveche los recursos crecientes de nuestra red, poder de negociación y eficiencias operativas para maximizar el potencial de su práctica.",
    "solution.weHandle": "Nos Encargamos de Todo lo Demás",
    
    // Benefits Grid
    "benefits.title": "Los Beneficios de Unirse a Nuestra Red",
    "benefits.subtitle": "Experimente la libertad de propiedad con el apoyo de una red establecida.",
    "benefits.income.title": "50-80% Más Ingresos",
    "benefits.income.desc": "Gane significativamente más que con el empleo tradicional mientras conserva la seguridad de nuestro apoyo operativo.",
    "benefits.autonomy.title": "Autonomía Clínica Total",
    "benefits.autonomy.desc": "Practique la medicina a su manera, con total libertad en la toma de decisiones clínicas y enfoque de atención al paciente.",
    "benefits.launch.title": "Lanzamiento Rápido",
    "benefits.launch.desc": "Ponga en marcha su práctica en una fracción del tiempo que tomaría de forma independiente, a menudo en solo 90 días.",
    "benefits.risk.title": "Riesgo Reducido",
    "benefits.risk.desc": "Nuestra experiencia operativa minimiza los riesgos financieros, regulatorios y administrativos de la propiedad de la práctica.",
    "benefits.network.title": "Ventajas de la Red",
    "benefits.network.desc": "Benefíciese de recursos compartidos, poder de negociación colectivo e intercambio de conocimientos con médicos colegas.",
    "benefits.legacy.title": "Construcción de Legado",
    "benefits.legacy.desc": "Cree un activo de práctica valioso y sostenible que pueda escalar o transferir en el futuro.",
    
    // Footer
    "footer.description": "Capacitando a los médicos para poseer sus prácticas mientras eliminamos las cargas administrativas y maximizamos la satisfacción profesional.",
    "footer.quickLinks": "Enlaces Rápidos",
    "footer.contact": "Contacto",
    "footer.copyright": "Todos los derechos reservados.",
    "footer.privacy": "Política de Privacidad",
    "footer.terms": "Términos de Servicio"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
