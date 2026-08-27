import Image from "next/image";
import { BrandWordmark } from "@/components/site/brand-wordmark";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { getCommon } from "@/i18n/common";
import type { Locale } from "@/i18n/config";
import { ADDRESS, EMAIL, EXTERNAL_PROPS, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

export function Footer({ locale }: { locale: Locale }) {
  const copy = getCommon(locale);
  return (
    <footer id="site-footer" className="site-footer">
      <span className="footer-observer" aria-hidden="true" />
      <div className="site-container">
        <div className="footer-brand"><BrandWordmark tone="white" alt="Flaviano D'Lucca Hair & Beauty" sizes="(max-width: 767px) calc(100vw - 3rem), 28rem" /><span className="footer-brand__rule" /></div>
        <div className="footer-columns">
          <section className="footer-column"><h2 className="label">{copy.footer.visit}</h2><address>{ADDRESS}</address><a className="inline-link label" href={MAPS_URL} {...EXTERNAL_PROPS}>{copy.actions.getDirections}</a></section>
          <section className="footer-column"><h2 className="label">{copy.footer.hours}</h2><p>{copy.footer.availability}</p><a className="inline-link label" href={PHONE_HREF}>{copy.footer.callHouse}</a></section>
          <section className="footer-column"><h2 className="label">{copy.footer.contact}</h2><a href={PHONE_HREF}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></section>
          <section className="footer-column"><h2 className="label">{copy.footer.follow}</h2><a className="inline-link label" href={INSTAGRAM_URL} {...EXTERNAL_PROPS}>@dluccahairbeauty</a></section>
        </div>
        <div className="footer-newsletter">
          <div className="footer-newsletter__copy"><span className="label">{copy.footer.newsTitle}</span><p>{copy.footer.newsCopy}</p></div>
          <NewsletterForm copy={copy.newsletter} />
        </div>
        <div className="footer-signature">
          <a href="https://linktr.ee/EllerBarboza" {...EXTERNAL_PROPS} aria-label={copy.footer.credit}>
            <Image src="/credits/eller-jr-signature.png" alt={copy.footer.credit} width={1193} height={167} sizes="(max-width: 1023px) 11.5rem, 12.4rem" />
          </a>
        </div>
        <div className="footer-legal label"><span>© 2026 Flaviano D’Lucca Hair & Beauty</span><span>{copy.footer.city}</span></div>
      </div>
    </footer>
  );
}
