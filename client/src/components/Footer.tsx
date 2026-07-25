import { Link } from "wouter";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-primary bg-hero pb-8 pt-16 text-hero-foreground/70">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <h3 className="mb-4 text-2xl font-bold uppercase tracking-wider text-hero-foreground">
              Baidya<span className="text-primary"> Engineering Works</span>
            </h3>
            <p className="text-sm leading-relaxed text-hero-foreground/65">
              Industrial engineering contractors in West Bengal since 2005. Utility systems,
              plant maintenance, PEB works, pipeline fabrication, and steel construction for
              heavy industry.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-hero-foreground">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/services", label: "Services" },
                { href: "/projects", label: "Projects" },
                { href: "/insights", label: "Insights" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-center text-sm transition-colors hover:text-primary"
                  >
                    <ArrowRight
                      size={14}
                      className="-ml-4 mr-2 text-primary opacity-0 transition-all duration-300 group-hover:ml-0 group-hover:opacity-100"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-hero-foreground">
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  Industrial Utility Engineering
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  Plant Maintenance
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  PEB Works
                </Link>
              </li>
              <li>
                <Link href="/services" className="transition-colors hover:text-primary">
                  Pipeline Fabrication &amp; Erection
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-hero-foreground">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 mt-1 h-5 w-5 shrink-0 text-primary" />
                <span className="text-sm">
                  Chikrand,
                  <br />
                  West Bengal 712304
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 shrink-0 text-primary" />
                <a href="tel:+919874751736" className="text-sm transition-colors hover:text-primary">
                  +91 987 475 1736
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 shrink-0 text-primary" />
                <a
                  href="mailto:baidyaengineering@gmail.com"
                  className="break-all text-sm transition-colors hover:text-primary"
                >
                  baidyaengineering@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-hero-foreground/15 pt-8 text-xs text-hero-foreground/50 md:flex-row">
          <p>&copy; {year} Baidya Engineering Works. All rights reserved.</p>
          <p className="mt-3 md:mt-0">Industrial contractors · West Bengal, India</p>
        </div>
      </div>
    </footer>
  );
}
