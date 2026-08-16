import type { Locale } from "@/i18n/config";
import type { GalleryItem } from "@/types";

const translations: Record<Exclude<Locale, "en">, Record<string, { caption: string; alt: string }>> = {
  pt: {
    "hero-blonde": { caption: "Loiro · camadas longas", alt: "Cabelo loiro longo e dimensional em ondas junto a uma parede de tijolos" },
    "0799": { caption: "Coloração dimensional · altura dos ombros", alt: "Coloração dimensional castanha e loira na altura dos ombros refletida no espelho do salão" },
    "0847": { caption: "Maquiagem suave", alt: "Cliente com olhos suavemente esfumados e batom neutro" },
    "1039": { caption: "Contorno do rosto · loiro dimensional", alt: "Cabelo castanho longo com mechas loiras dimensionais ao redor do rosto" },
    "1325": { caption: "Comprimento polido · maquiagem", alt: "Cliente com cabelo loiro longo e liso e maquiagem elegante para a noite" },
    "1533": { caption: "Loiro claro · camadas suaves", alt: "Cabelo loiro longo e claro com camadas suaves ao redor do rosto" },
    "1616": { caption: "Balayage · longo", alt: "Cabelo longo com balayage, raiz esfumada e pontas loiras claras" },
    "2225": { caption: "Loiro · finalização volumosa", alt: "Cabelo loiro volumoso finalizado em ondas soltas e camadas" },
    bride: { caption: "Maquiagem de noiva · Chicago", alt: "Noiva com maquiagem elegante e acessório de cristal no cabelo" },
    "aesthetics-room": { caption: "Sala de tratamento", alt: "Sala privativa de tratamentos estéticos da D'Lucca" },
    "aesthetics-treatment": { caption: "Preparação clínica", alt: "Profissional preparando um tratamento estético na D'Lucca" },
  },
  es: {
    "hero-blonde": { caption: "Rubio · capas largas", alt: "Cabello rubio largo y dimensional en ondas junto a una pared de ladrillo" },
    "0799": { caption: "Color dimensional · altura de los hombros", alt: "Color dimensional castaño y rubio a la altura de los hombros reflejado en el espejo del salón" },
    "0847": { caption: "Maquillaje suave", alt: "Clienta con ojos difuminados suavemente y labial neutro" },
    "1039": { caption: "Marco del rostro · rubio dimensional", alt: "Cabello castaño largo con reflejos rubios dimensionales alrededor del rostro" },
    "1325": { caption: "Largo pulido · maquillaje", alt: "Clienta con cabello rubio largo y liso y maquillaje elegante de noche" },
    "1533": { caption: "Rubio luminoso · capas suaves", alt: "Cabello rubio largo y luminoso con capas suaves alrededor del rostro" },
    "1616": { caption: "Balayage · largo", alt: "Cabello largo con balayage, raíz difuminada y puntas rubias luminosas" },
    "2225": { caption: "Rubio · peinado con volumen", alt: "Cabello rubio voluminoso peinado con ondas sueltas y capas" },
    bride: { caption: "Maquillaje de novia · Chicago", alt: "Novia con maquillaje elegante y accesorio de cristal en el cabello" },
    "aesthetics-room": { caption: "Sala de tratamiento", alt: "Sala privada de tratamientos estéticos de D'Lucca" },
    "aesthetics-treatment": { caption: "Preparación clínica", alt: "Profesional preparando un tratamiento estético en D'Lucca" },
  },
};

export function localizeGallery(items: GalleryItem[], locale: Locale): GalleryItem[] {
  if (locale === "en") return items;
  return items.map((item) => ({ ...item, ...(translations[locale][item.id] ?? {}) }));
}
