import { nav, property, whatsappHref } from "@/data/property";
import { IconMail, IconPhone, IconWhatsapp } from "./icons";
import { Logo } from "./Logo";

const contacts = [
  { label: "WhatsApp", href: whatsappHref(), icon: IconWhatsapp, external: true },
  { label: `Call ${property.phoneDisplay}`, href: property.phoneHref, icon: IconPhone, external: false },
  { label: `Email ${property.email}`, href: `mailto:${property.email}`, icon: IconMail, external: false },
];

// One slim row on desktop: brand, section links, contact icons. The booking
// section right above already spells the contact details out in full.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-ink-on-bark">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 px-5 py-7 sm:px-8 lg:flex-row lg:justify-between lg:gap-8 lg:py-6">
        <a href="#top" aria-label={`${property.name}, back to top`}>
          <Logo layout="row" />
        </a>

        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-ink-on-bark-soft">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {contacts.map(({ label, href, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink-on-bark/20 text-ink-on-bark-soft transition-colors hover:border-accent hover:text-accent"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <p className="border-t border-dashed border-ink-on-bark/15 px-5 py-4 text-center text-xs text-ink-on-bark-soft/70">
        © {year} {property.name}. Fictional demo property; photos are placeholder stock from Unsplash.
      </p>
    </footer>
  );
}
