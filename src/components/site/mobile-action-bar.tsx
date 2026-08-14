import { BOOKING_URL, EXTERNAL_PROPS, PHONE_HREF } from "@/lib/constants";

export function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick actions">
      <a href={PHONE_HREF}>Call</a>
      <a href={BOOKING_URL} {...EXTERNAL_PROPS}>Book</a>
    </nav>
  );
}
