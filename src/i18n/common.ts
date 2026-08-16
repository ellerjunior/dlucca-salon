import type { Locale, PageId } from "@/i18n/config";

export interface CommonDictionary {
  skipToContent: string;
  nav: Record<Exclude<PageId, "home">, string>;
  actions: {
    book: string;
    bookAppointment: string;
    call: string;
    openMenu: string;
    closeMenu: string;
    home: string;
    quickActions: string;
    primaryNavigation: string;
    mobileNavigation: string;
    language: string;
    chooseLanguage: string;
    previousImage: string;
    nextImage: string;
    closeGallery: string;
    galleryNavigation: string;
    scrollingGallery: string;
    getDirections: string;
    openCherry: string;
  };
  footer: {
    visit: string;
    hours: string;
    availability: string;
    callHouse: string;
    contact: string;
    follow: string;
    newsTitle: string;
    newsCopy: string;
    city: string;
    credit: string;
  };
  newsletter: {
    email: string;
    signup: string;
    sending: string;
    success: string;
    disconnected: string;
  };
  map: { title: string };
  service: {
    categories: Record<"consultation" | "color" | "treatment" | "cuts" | "styling" | "extensions", string>;
    categoryNavigation: string;
    flaviano: string;
    dani: string;
    variable: string;
    from: string;
    free: string;
    unit: string;
    priceTiers: string;
    short: string;
    medium: string;
    long: string;
  };
  forms: {
    required: string;
    invalidEmail: string;
    name: string;
    email: string;
    phone: string;
    eventDate: string;
    eventType: string;
    selectOne: string;
    bride: string;
    bridesmaid: string;
    debutante: string;
    other: string;
    partySize: string;
    location: string;
    studio: string;
    onSite: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    disconnected: string;
  };
  cherry: {
    connecting: string;
    opening: string;
    explainer: string;
    errorBefore: string;
    errorAfter: string;
  };
  notFound: { label: string; title: string; action: string };
}

const en: CommonDictionary = {
  skipToContent: "Skip to content",
  nav: { story: "Story", hair: "Hair", aesthetics: "Aesthetics", weddings: "Weddings", gallery: "Gallery", financing: "Payment Plans", contact: "Contact" },
  actions: {
    book: "Book", bookAppointment: "Book an appointment", call: "Call", openMenu: "Open menu", closeMenu: "Close menu", home: "D'Lucca home", quickActions: "Quick actions", primaryNavigation: "Primary navigation", mobileNavigation: "Mobile navigation", language: "Language", chooseLanguage: "Choose language", previousImage: "Previous image", nextImage: "Next image", closeGallery: "Close gallery", galleryNavigation: "Gallery navigation", scrollingGallery: "Horizontally scrolling gallery", getDirections: "Get directions", openCherry: "Open Cherry directly",
  },
  footer: { visit: "Visit", hours: "Hours", availability: "Please call for current availability.", callHouse: "Call the house", contact: "Contact", follow: "Follow", newsTitle: "News from the house.", newsCopy: "Openings, new treatments, and the occasional note from Flaviano.", city: "Chicago, Illinois", credit: "Developed by Eller Jr" },
  newsletter: { email: "Email address", signup: "Sign up", sending: "Sending", success: "You’re on the list.", disconnected: "Signup delivery is not connected in this preview." },
  map: { title: "Map showing D'Lucca Hair & Beauty at 904 N California Avenue in Chicago" },
  service: {
    categories: { consultation: "Consultation", color: "Color", treatment: "Treatment", cuts: "Cuts", styling: "Styling & Makeup", extensions: "Extensions & More" },
    categoryNavigation: "Service categories", flaviano: "By Flaviano — Master Stylist", dani: "By Dani — Stylist", variable: "Variable", from: "From", free: "Free", unit: "unit", priceTiers: "price tiers", short: "Short", medium: "Medium", long: "Long",
  },
  forms: { required: "Please complete this field.", invalidEmail: "Enter a valid email address.", name: "Name", email: "Email", phone: "Phone", eventDate: "Event date", eventType: "Event type", selectOne: "Select one", bride: "Bride", bridesmaid: "Bridesmaid", debutante: "Debutante", other: "Other", partySize: "Number of people", location: "Location", studio: "D’Lucca studio", onSite: "On-site", message: "Message", send: "Send inquiry", sending: "Sending", success: "Your inquiry has been sent. We’ll reply by email.", disconnected: "Form delivery is not connected in this preview. Email" },
  cherry: { connecting: "Connecting to Cherry", opening: "Opening secure payment options.", explainer: "See examples, then check personalized options directly with Cherry.", errorBefore: "The payment calculator could not load.", errorAfter: "Open Cherry directly" },
  notFound: { label: "404 — The room is closed", title: "This page isn’t in the house.", action: "Return home" },
};

const pt: CommonDictionary = {
  skipToContent: "Pular para o conteúdo",
  nav: { story: "História", hair: "Cabelo", aesthetics: "Estética", weddings: "Casamentos", gallery: "Galeria", financing: "Financiamento", contact: "Contato" },
  actions: {
    book: "Agendar", bookAppointment: "Agendar um horário", call: "Ligar", openMenu: "Abrir menu", closeMenu: "Fechar menu", home: "Página inicial da D'Lucca", quickActions: "Ações rápidas", primaryNavigation: "Navegação principal", mobileNavigation: "Navegação mobile", language: "Idioma", chooseLanguage: "Escolher idioma", previousImage: "Imagem anterior", nextImage: "Próxima imagem", closeGallery: "Fechar galeria", galleryNavigation: "Navegação da galeria", scrollingGallery: "Galeria com rolagem horizontal", getDirections: "Como chegar", openCherry: "Abrir a Cherry diretamente",
  },
  footer: { visit: "Visite", hours: "Horários", availability: "Ligue para consultar a disponibilidade atual.", callHouse: "Ligar para a casa", contact: "Contato", follow: "Siga", newsTitle: "Novidades da casa.", newsCopy: "Horários disponíveis, novos tratamentos e recados ocasionais de Flaviano.", city: "Chicago, Illinois", credit: "Desenvolvido por Eller Jr" },
  newsletter: { email: "Endereço de e-mail", signup: "Inscrever-se", sending: "Enviando", success: "Você está na lista.", disconnected: "O envio da newsletter ainda não está conectado nesta prévia." },
  map: { title: "Mapa mostrando o D'Lucca Hair & Beauty na 904 N California Avenue, em Chicago" },
  service: {
    categories: { consultation: "Consulta", color: "Coloração", treatment: "Tratamentos", cuts: "Cortes", styling: "Penteados e maquiagem", extensions: "Extensões e mais" },
    categoryNavigation: "Categorias de serviços", flaviano: "Com Flaviano — Master Stylist", dani: "Com Dani — Stylist", variable: "Sob consulta", from: "A partir de", free: "Grátis", unit: "unidade", priceTiers: "faixas de preço", short: "Curto", medium: "Médio", long: "Longo",
  },
  forms: { required: "Preencha este campo.", invalidEmail: "Digite um endereço de e-mail válido.", name: "Nome", email: "E-mail", phone: "Telefone", eventDate: "Data do evento", eventType: "Tipo de evento", selectOne: "Selecione", bride: "Noiva", bridesmaid: "Madrinha", debutante: "Debutante", other: "Outro", partySize: "Número de pessoas", location: "Local", studio: "Estúdio D’Lucca", onSite: "No local do evento", message: "Mensagem", send: "Enviar solicitação", sending: "Enviando", success: "Sua solicitação foi enviada. Responderemos por e-mail.", disconnected: "O envio do formulário ainda não está conectado nesta prévia. Envie um e-mail para" },
  cherry: { connecting: "Conectando à Cherry", opening: "Abrindo opções seguras de pagamento.", explainer: "Veja exemplos e consulte opções personalizadas diretamente com a Cherry.", errorBefore: "Não foi possível carregar a calculadora de pagamentos.", errorAfter: "Abrir a Cherry diretamente" },
  notFound: { label: "404 — Este ambiente está fechado", title: "Esta página não está na casa.", action: "Voltar ao início" },
};

const es: CommonDictionary = {
  skipToContent: "Saltar al contenido",
  nav: { story: "Historia", hair: "Cabello", aesthetics: "Estética", weddings: "Bodas", gallery: "Galería", financing: "Financiamiento", contact: "Contacto" },
  actions: {
    book: "Reservar", bookAppointment: "Reservar una cita", call: "Llamar", openMenu: "Abrir menú", closeMenu: "Cerrar menú", home: "Inicio de D'Lucca", quickActions: "Acciones rápidas", primaryNavigation: "Navegación principal", mobileNavigation: "Navegación móvil", language: "Idioma", chooseLanguage: "Elegir idioma", previousImage: "Imagen anterior", nextImage: "Siguiente imagen", closeGallery: "Cerrar galería", galleryNavigation: "Navegación de la galería", scrollingGallery: "Galería con desplazamiento horizontal", getDirections: "Cómo llegar", openCherry: "Abrir Cherry directamente",
  },
  footer: { visit: "Visítanos", hours: "Horarios", availability: "Llama para consultar la disponibilidad actual.", callHouse: "Llamar a la casa", contact: "Contacto", follow: "Síguenos", newsTitle: "Noticias de la casa.", newsCopy: "Citas disponibles, nuevos tratamientos y alguna nota ocasional de Flaviano.", city: "Chicago, Illinois", credit: "Desarrollado por Eller Jr" },
  newsletter: { email: "Correo electrónico", signup: "Suscribirme", sending: "Enviando", success: "Ya estás en la lista.", disconnected: "El envío del boletín aún no está conectado en esta vista previa." },
  map: { title: "Mapa de D'Lucca Hair & Beauty en 904 N California Avenue, Chicago" },
  service: {
    categories: { consultation: "Consulta", color: "Color", treatment: "Tratamientos", cuts: "Cortes", styling: "Peinado y maquillaje", extensions: "Extensiones y más" },
    categoryNavigation: "Categorías de servicios", flaviano: "Con Flaviano — Master Stylist", dani: "Con Dani — Stylist", variable: "Variable", from: "Desde", free: "Gratis", unit: "unidad", priceTiers: "niveles de precio", short: "Corto", medium: "Medio", long: "Largo",
  },
  forms: { required: "Completa este campo.", invalidEmail: "Ingresa un correo electrónico válido.", name: "Nombre", email: "Correo electrónico", phone: "Teléfono", eventDate: "Fecha del evento", eventType: "Tipo de evento", selectOne: "Selecciona una opción", bride: "Novia", bridesmaid: "Dama de honor", debutante: "Quinceañera", other: "Otro", partySize: "Número de personas", location: "Lugar", studio: "Estudio D’Lucca", onSite: "En el lugar del evento", message: "Mensaje", send: "Enviar consulta", sending: "Enviando", success: "Tu consulta fue enviada. Responderemos por correo electrónico.", disconnected: "El envío del formulario aún no está conectado en esta vista previa. Escribe a" },
  cherry: { connecting: "Conectando con Cherry", opening: "Abriendo opciones de pago seguras.", explainer: "Consulta ejemplos y revisa opciones personalizadas directamente con Cherry.", errorBefore: "No se pudo cargar la calculadora de pagos.", errorAfter: "Abrir Cherry directamente" },
  notFound: { label: "404 — Esta sala está cerrada", title: "Esta página no está en la casa.", action: "Volver al inicio" },
};

export const commonDictionaries: Record<Locale, CommonDictionary> = { en, pt, es };

export function getCommon(locale: Locale): CommonDictionary {
  return commonDictionaries[locale];
}
