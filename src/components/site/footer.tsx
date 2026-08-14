import Image from "next/image";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { ADDRESS, EMAIL, EXTERNAL_PROPS, INSTAGRAM_URL, MAPS_URL, PHONE_DISPLAY, PHONE_HREF } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-brand">
          <Image src="/logo.svg" alt="Flaviano D'Lucca Hair & Beauty" width={1040} height={300} />
          <span className="footer-brand__rule" />
        </div>

        <div className="footer-columns">
          <section className="footer-column">
            <h2 className="label">Visit</h2>
            <address>{ADDRESS}</address>
            <a className="inline-link label" href={MAPS_URL} {...EXTERNAL_PROPS}>Get directions</a>
          </section>
          <section className="footer-column">
            <h2 className="label">Hours</h2>
            <p>Please call for current availability.</p>
            <a className="inline-link label" href={PHONE_HREF}>Call the house</a>
          </section>
          <section className="footer-column">
            <h2 className="label">Contact</h2>
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </section>
          <section className="footer-column">
            <h2 className="label">Follow</h2>
            <a className="inline-link label" href={INSTAGRAM_URL} {...EXTERNAL_PROPS}>@dluccahairbeauty</a>
          </section>
        </div>

        <div className="footer-newsletter">
          <div className="footer-newsletter__copy">
            <span className="label">News from the house.</span>
            <p>Openings, new treatments, and the occasional note from Flaviano.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="footer-legal label">
          <span>© 2026 Flaviano D’Lucca Hair & Beauty</span>
          <span>Chicago, Illinois</span>
        </div>
      </div>
    </footer>
  );
}
