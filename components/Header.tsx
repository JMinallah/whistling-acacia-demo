"use client";

import { type CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import { nav, property, whatsappHref } from "@/data/property";
import { IconWhatsapp } from "./icons";
import { Logo } from "./Logo";

const LEFT = nav.slice(0, 2);
const RIGHT = nav.slice(2);
const MENU_MS = 600;

// Morphing menu icon: three bars fold into a cross when `open`.
function Burger({ open }: { open: boolean }) {
  return (
    <span className={`burger ${open ? "is-open" : ""}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

function NavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      aria-current={active ? "location" : undefined}
      className={`nav-link text-sm font-medium ${active ? "is-active" : ""}`}
    >
      {label}
    </a>
  );
}

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: whichever section crosses the middle band of the screen is
  // "current". The hero is watched too, so scrolling back up clears it.
  useEffect(() => {
    const ids = ["top", ...nav.map((item) => item.href.slice(1))];
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id === "top" ? null : `#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

  const openMenu = () => {
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = "hidden";
    // Next frame, so the circle-reveal transition runs from closed.
    requestAnimationFrame(() => setMenuOpen(true));
  };

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    window.setTimeout(() => {
      dialogRef.current?.close();
      document.documentElement.style.overflow = "";
      burgerRef.current?.focus();
    }, MENU_MS);
  }, []);

  const tone = condensed ? "text-ink" : "text-ink-on-bark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${tone} ${
        condensed
          ? "bg-paper/95 shadow-[0_10px_24px_-18px_rgba(42,31,24,0.6)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 transition-[padding] duration-500 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] ${
          condensed ? "py-2.5" : "py-4 lg:py-5"
        }`}
      >
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {LEFT.map((item) => (
            <NavLink key={item.href} {...item} active={active === item.href} />
          ))}
        </nav>

        <a href="#top" aria-label={`${property.name}, back to top`} className="lg:justify-self-center">
          <span className="lg:hidden">
            <Logo layout="row" />
          </span>
          <span className="hidden lg:block">
            <Logo layout="crest" compact={condensed} />
          </span>
        </a>

        <div className="hidden items-center justify-end gap-8 lg:flex">
          <nav className="flex items-center gap-8" aria-label="Primary, continued">
            {RIGHT.map((item) => (
              <NavLink key={item.href} {...item} active={active === item.href} />
            ))}
          </nav>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-patch btn-patch--sm"
          >
            <IconWhatsapp className="h-4 w-4" />
            Enquire
          </a>
        </div>

        <button
          ref={burgerRef}
          type="button"
          onClick={openMenu}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
        >
          <Burger open={false} />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className={`mobile-menu text-ink-on-bark lg:hidden ${menuOpen ? "is-open" : ""}`}
        onCancel={(e) => {
          e.preventDefault();
          closeMenu();
        }}
      >
        <div className="flex h-full flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 sm:px-8">
          <div className="flex items-center justify-between">
            <Logo layout="row" />
            <button
              type="button"
              onClick={closeMenu}
              className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full"
            >
              <Burger open={menuOpen} />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav className="mt-14 flex flex-col gap-2" aria-label="Menu">
            {nav.map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                style={{ transitionDelay: menuOpen ? `${180 + i * 60}ms` : "0ms" }}
                className="menu-item font-display text-4xl font-medium leading-tight"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="menu-item mt-auto flex flex-col gap-3" style={{ transitionDelay: menuOpen ? "460ms" : "0ms" }}>
            <div className="stitch mb-3" style={{ "--stitch-color": "var(--ink-on-bark-soft)" } as CSSProperties} />
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="btn-patch w-full text-base"
            >
              <IconWhatsapp className="h-5 w-5" />
              Enquire on WhatsApp
            </a>
            <a href={property.phoneHref} className="text-center text-sm text-ink-on-bark-soft">
              or call {property.phoneDisplay}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  );
}
