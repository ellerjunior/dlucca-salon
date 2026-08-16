import { GalleryViewer } from "@/components/features/gallery-viewer";
import { PageSchema } from "@/components/site/page-schema";
import { ButtonLink } from "@/components/ui/button";
import { galleryItems } from "@/data/gallery";
import { getCommon } from "@/i18n/common";
import { routeFor, type Locale } from "@/i18n/config";
import { localizeGallery } from "@/i18n/gallery";
import { getPages } from "@/i18n/pages";
import { BOOKING_URL } from "@/lib/constants";

export function GalleryPageContent({ locale }: { locale: Locale }) {
  const common = getCommon(locale);
  const copy = getPages(locale).gallery;
  return <main id="main-content">
    <PageSchema name={copy.schemaName} path={routeFor(locale, "gallery")} homeLabel={locale === "pt" ? "Início" : locale === "es" ? "Inicio" : "Home"} />
    <section className="gallery-header surface-linen"><div className="site-container"><div className="gallery-header__copy"><h1 className="display-xl">{copy.title}</h1><span className="brass-rule" /><p className="standfirst">{copy.standfirst}</p></div></div></section>
    <section className="gallery-room surface-void"><div className="site-container"><GalleryViewer items={localizeGallery(galleryItems, locale)} copy={copy} actions={common.actions} /></div></section>
    <section className="section-space surface-linen"><div className="site-container centered-cta"><h2 className="display-l">{copy.ctaTitle}</h2><ButtonLink href={BOOKING_URL} external>{common.actions.bookAppointment}</ButtonLink></div></section>
  </main>;
}
