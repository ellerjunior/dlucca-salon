import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return <main id="main-content" className="section-space surface-linen not-found-page"><div className="site-container centered-cta"><span className="label">404 — The room is closed</span><h1 className="display-l">This page isn’t in the house.</h1><ButtonLink href="/">Return home</ButtonLink></div></main>;
}
