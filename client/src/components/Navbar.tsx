import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

/** Opens WhatsApp chat (same number as Contact / Footer). */
const WHATSAPP_CHAT_URL =
  "https://wa.me/919874751736?text=" +
  encodeURIComponent("Hi, I'd like to inquire about Baidya Engineering Works.");

/** PNG + preserve alpha so the bar/video shows through non-logo pixels (not flattened to white). */
const LOGO_URL =
  "https://res.cloudinary.com/dqhnt5mus/image/upload/f_png,q_auto,fl_preserve_transparency/v1777807947/logo_1_y0ki0y.png";
  // "https://res.cloudinary.com/dqhnt5mus/image/upload/v1777788291/logo_gdyzwx.png"

function WhatsAppCta({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={WHATSAPP_CHAT_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      onClick={onClick}
      className={cn(
        "relative isolate inline-flex items-center overflow-hidden bg-whatsapp-cta px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-md shadow-emerald-950/25 transition-[transform,box-shadow] duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-900/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 z-0 skew-x-[-16deg] animate-whatsapp-shine bg-gradient-to-r from-transparent via-white/40 to-transparent"
        aria-hidden
      />
      <span className="relative z-10 inline-flex items-center gap-2 drop-shadow-sm">
        <FaWhatsapp className="h-4 w-4 shrink-0 text-white" aria-hidden />
        <span className="hidden leading-none min-[380px]:inline">WhatsApp</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-300",
        scrolled && "shadow-md shadow-foreground/10",
      )}
    >
      <div className="bg-hero text-hero-foreground/75">
        <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-[7px] lg:px-8 ">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em]">
            Baidya Engineering Works
          </p>
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] sm:block">
            West Bengal · India
          </p>
        </div>
      </div>

      <div className="border-b border-border/70 bg-white dark:bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-3.5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <Link
              href="/"
              className="group flex shrink-0 items-center justify-self-start bg-transparent"
            >
              <img
                src={LOGO_URL}
                alt="Baidya Engineering Works"
                className="block h-auto max-h-9 w-[min(62vw,11rem)] shrink-0 bg-transparent object-contain object-left shadow-none ring-0 transition-transform duration-200 group-hover:scale-[1.02] dark:brightness-110 sm:max-h-10 sm:w-[13rem] lg:max-h-11 lg:w-[15rem]"
                width={240}
                height={72}
                decoding="async"
              />
           
            </Link>

            <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    location === link.href || location.startsWith(`${link.href}/`)
                      ? "page"
                      : undefined
                  }
                  className={cn(
                    "text-[15px] font-medium tracking-normal transition-colors hover:text-foreground",
                    location === link.href || location.startsWith(`${link.href}/`)
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden justify-self-end lg:block">
              <WhatsAppCta />
            </div>

            <div className="flex items-center justify-end gap-2 lg:hidden">
              <WhatsAppCta className="px-3 py-2" />
              <button
                type="button"
                className="p-1.5 text-foreground"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                onClick={() => setIsOpen((open) => !open)}
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 top-full animate-in border-b border-border bg-[#F6F3EE] shadow-xl slide-in-from-top-5 dark:bg-background lg:hidden">
          <nav className="flex flex-col space-y-1 p-3" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={
                  location === link.href || location.startsWith(`${link.href}/`)
                    ? "page"
                    : undefined
                }
                className={cn(
                  "px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted hover:text-foreground",
                  location === link.href || location.startsWith(`${link.href}/`)
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
