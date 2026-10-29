import Image from "next/image";
import { BrandWordmark } from "@/components/site/brand-wordmark";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { getCommon } from "@/i18n/common";
import type { Locale } from "@/i18n/config";
import { ADDRESS, EMAIL, EXTERNAL_PROPS, FACEBOOK_URL, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

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
          <section className="footer-column"><h2 className="label">{copy.footer.follow}</h2><div className="footer-social"><a className="footer-social__link" href={INSTAGRAM_URL} aria-label="Instagram" {...EXTERNAL_PROPS}><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" /></svg></a><a className="footer-social__link" href={FACEBOOK_URL} aria-label="Facebook" {...EXTERNAL_PROPS}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.3H7.9v3h2.6V21" /></svg></a></div></section>
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
