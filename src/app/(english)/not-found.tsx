import { ButtonLink } from "@/components/ui/button";
import { getCommon } from "@/i18n/common";
const copy = getCommon("en").notFound;
export default function NotFound() { return <main id="main-content" className="section-space surface-linen not-found-page"><div className="site-container centered-cta"><span className="label">{copy.label}</span><h1 className="display-l">{copy.title}</h1><ButtonLink href="/">{copy.action}</ButtonLink></div></main>; }
