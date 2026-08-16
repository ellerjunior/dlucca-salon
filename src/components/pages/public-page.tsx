import { AestheticsPageContent } from "@/components/pages/aesthetics-page";
import { ContactPageContent } from "@/components/pages/contact-page";
import { FinancingPageContent } from "@/components/pages/financing-page";
import { GalleryPageContent } from "@/components/pages/gallery-page";
import { HairPageContent } from "@/components/pages/hair-page";
import { HomePageContent } from "@/components/pages/home-page";
import { StoryPageContent } from "@/components/pages/story-page";
import { WeddingsPageContent } from "@/components/pages/weddings-page";
import type { Locale, PageId } from "@/i18n/config";

export function PublicPage({ locale, page }: { locale: Locale; page: PageId }) {
  if (page === "home") return <HomePageContent locale={locale} />;
  if (page === "story") return <StoryPageContent locale={locale} />;
  if (page === "hair") return <HairPageContent locale={locale} />;
  if (page === "aesthetics") return <AestheticsPageContent locale={locale} />;
  if (page === "weddings") return <WeddingsPageContent locale={locale} />;
  if (page === "gallery") return <GalleryPageContent locale={locale} />;
  if (page === "financing") return <FinancingPageContent locale={locale} />;
  return <ContactPageContent locale={locale} />;
}
