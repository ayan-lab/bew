import {
  ArrowRight,
  Wrench,
  Hammer,
  Factory,
  Settings,
  ChevronLeft,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState, useCallback } from "react";
import { Carousel } from "bootstrap";
import "@/styles/slider-nav.css";
import { apiUrl } from "@/lib/api";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";
import { INSIGHTS } from "@/data/insights";

const HERO_VIDEO =
  "https://res.cloudinary.com/dqhnt5mus/video/upload/q_auto:best,f_auto,w_1280/v1777366937/download_lckhyt.mp4";

const HERO_SLIDES = [
  {
    title: "Industrial engineering that keeps plants running",
    description:
      "Utility systems, maintenance, PEB structures, and pipeline work — delivered on schedule across West Bengal since 2005.",
  },
  {
    title: "Fabrication & erection built for heavy industry",
    description:
      "From steel frames to process pipelines, we execute with certified welders, strict QA, and zero-compromise safety.",
  },
  {
    title: "Plant maintenance you can plan around",
    description:
      "Preventive programmes, emergency response, and shutdown support that minimise downtime for your operations.",
  },
  {
    title: "PEB & structural steel, end to end",
    description:
      "Design, fabrication, and erection of pre-engineered buildings for factories, warehouses, and process sheds.",
  },
  {
    title: "A partner for long-cycle industrial projects",
    description:
      "Clear scopes, disciplined project control, and craftsmen who understand the realities of Indian plant sites.",
  },
] as const;

const HERO_CAROUSEL_ID = "heroCarousel";

const INDUSTRIES = [
  "Manufacturing plants",
  "Chemical & process industries",
  "Warehousing & logistics",
  "Power & utilities",
  "Food & beverage facilities",
  "Commercial & industrial sheds",
];

const SERVICE_AREAS = [
  "Chikrand & Hooghly district",
  "Howrah industrial belt",
  "Kolkata & surrounding plants",
  "Warehouses across South Bengal",
  "Process units statewide (by project)",
];

const ENGAGEMENT_STEPS = [
  {
    step: "01",
    title: "Brief & site visit",
    text: "Share drawings or photos; we walk the site and confirm constraints, access, and safety rules.",
    panelLabel: "Site walk",
  },
  {
    step: "02",
    title: "Scope & programme",
    text: "We lock a written scope, material list, method notes, and a realistic delivery window.",
    panelLabel: "Written scope",
  },
  {
    step: "03",
    title: "Fabricate & execute",
    text: "Shop and site teams work to drawing with daily progress and QA checkpoints.",
    panelLabel: "On-site execution",
  },
  {
    step: "04",
    title: "Test & hand over",
    text: "Punch lists closed, tests witnessed where required, and as-builts shared for your records.",
    panelLabel: "Handover",
  },
] as const;

const WHY_POINTS = [
  {
    title: "Safety first",
    text: "Site protocols, PPE discipline, and method statements that protect crews and client assets.",
  },
  {
    title: "Precision engineering",
    text: "Fabrication and installation to drawing, with fit-up and QA checks before critical lifts.",
  },
  {
    title: "Timely delivery",
    text: "Realistic programmes, material tracking, and crew planning that respect shutdown windows.",
  },
  {
    title: "Experienced team",
    text: "Welders, fitters, and supervisors with decades of combined industrial site experience.",
  },
] as const;

const HOME_FAQS = [
  {
    question: "What does Baidya Engineering Works specialise in?",
    answer:
      "We specialise in industrial utility engineering, plant maintenance, PEB (pre-engineered building) works, pipeline fabrication & erection, and related steel / mechanical construction for factories and process plants in West Bengal.",
  },
  {
    question: "Where are you based and which areas do you cover?",
    answer:
      "We are headquartered in Chikrand, West Bengal (PIN 712304). We routinely serve plants across Hooghly, Howrah, Kolkata surrounds, and take on industrial projects statewide depending on scope.",
  },
  {
    question: "How quickly can I get a quote?",
    answer:
      "Share a brief scope, photos, or drawings via our contact form, email, or WhatsApp. We typically respond during business hours with clarification questions and an estimate timeline.",
  },
  {
    question: "Do you handle emergency plant breakdowns?",
    answer:
      "Yes — when capacity allows, our maintenance crews mobilise for urgent repairs. Call +91 987 475 1736 for time-sensitive needs.",
  },
];

type Service = {
  id: number;
  uuid: string;
  title: string;
  image: string;
  description: string;
};

export default function Home() {
  usePageMeta({
    title: "Industrial Contractors in West Bengal",
    description:
      "Baidya Engineering Works — industrial contractors in Chikrand, West Bengal since 2005. Utility engineering, plant maintenance, PEB works, pipeline fabrication & erection, and steel fabrication.",
    path: "/",
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const trustRef = useRef<HTMLDivElement | null>(null);
  const engageSectionRef = useRef<HTMLElement | null>(null);
  const engagePinRef = useRef<HTMLDivElement | null>(null);
  const engageCardsRef = useRef<HTMLDivElement | null>(null);
  const engagePanelRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const [items, setItems] = useState<Service[]>([]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [serveTab, setServeTab] = useState<"industries" | "coverage">("industries");

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  async function getServices() {
    const response = await fetch(apiUrl("/api/services"));
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    return response.json();
  }

  useEffect(() => {
    getServices()
      .then((services) => setItems(services))
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    const el = document.getElementById(HERO_CAROUSEL_ID);
    if (!el) return;
    const carousel = Carousel.getOrCreateInstance(el, {
      interval: 6000,
      ride: "carousel",
    });
    return () => carousel.dispose();
  }, []);

  // Hero caption entrance (first paint)
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from(".hero-animate", {
        opacity: 0,
        y: 32,
        duration: 0.85,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  // Trust stats count-up feel via fade
  useEffect(() => {
    const el = trustRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll("[data-stat]"), {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  // Engagement: pin viewport on all breakpoints; cards rise on desktop only
  useEffect(() => {
    const section = engageSectionRef.current;
    const pin = engagePinRef.current;
    const cardsRoot = engageCardsRef.current;
    if (!section || !pin) return;
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = ensureGsap();
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (!cardsRoot) return;
      const cards = Array.from(
        cardsRoot.querySelectorAll<HTMLElement>("[data-engage-card]"),
      );
      if (!cards.length) return;

      gsap.set(cards[0], { yPercent: 0, opacity: 1 });
      cards.slice(1).forEach((card) => {
        gsap.set(card, { yPercent: 115, opacity: 0 });
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${ENGAGEMENT_STEPS.length * window.innerHeight * 0.9}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const n = ENGAGEMENT_STEPS.length;
            const idx = Math.min(
              n - 1,
              Math.max(0, Math.floor(self.progress * n - 1e-6)),
            );
            setActiveStep((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      for (let i = 1; i < cards.length; i++) {
        tl.to(
          cards[i - 1],
          { yPercent: -60, opacity: 0.12, duration: 1 },
          i - 1,
        ).to(cards[i], { yPercent: 0, opacity: 1, duration: 1 }, i - 1);
      }

      return () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
    });

    // Mobile / tablet: pin + scrub progress only (left panel alone)
    mm.add("(max-width: 1023px)", () => {
      const st = ScrollTrigger.create({
        trigger: pin,
        start: "top top",
        end: () => `+=${ENGAGEMENT_STEPS.length * window.innerHeight * 0.75}`,
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const n = ENGAGEMENT_STEPS.length;
          const idx = Math.min(
            n - 1,
            Math.max(0, Math.floor(self.progress * n - 1e-6)),
          );
          setActiveStep((prev) => (prev === idx ? prev : idx));
        },
      });

      return () => st.kill();
    });

    return () => mm.revert();
  }, []);

  // Soft crossfade on left panel when active step changes
  useEffect(() => {
    const panel = engagePanelRef.current;
    if (!panel || prefersReducedMotion()) return;
    if (activeStep === 0 && panel.dataset.primed !== "1") {
      panel.dataset.primed = "1";
      return;
    }
    panel.dataset.primed = "1";
    const { gsap } = ensureGsap();
    gsap.fromTo(
      panel,
      { opacity: 0.35, y: 12 },
      { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
    );
  }, [activeStep]);

  useEffect(() => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.querySelector(".slide-card");
    if (!firstCard) return;
    const cardWidth = (firstCard as HTMLElement).offsetWidth;
    trackRef.current.style.transition = isAnimating
      ? "transform 500ms ease"
      : "none";
    trackRef.current.style.transform = `translateX(-${index * cardWidth}px)`;
  }, [index, isAnimating, items]);

  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    setIsAnimating(true);
    setIndex((prev) => prev + 1);
    setTimeout(() => {
      setItems((prev) => {
        const updated = [...prev];
        updated.push(updated.shift()!);
        return updated;
      });
      setIndex((prev) => prev - 1);
      setIsAnimating(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    const intervalId = window.setInterval(() => {
      nextSlide();
    }, 3000);
    return () => window.clearInterval(intervalId);
  }, [items.length, nextSlide]);

  const prevSlide = () => {
    if (isAnimating) return;
    setItems((prev) => {
      const updated = [...prev];
      updated.unshift(updated.pop()!);
      return updated;
    });

    setIndex(1);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsAnimating(true);
        setIndex(0);
      });
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className="overflow-hidden">
      <FaqJsonLd items={HOME_FAQS} />

      {/* HERO */}
      <section className="relative h-[88vh] min-h-[520px]">
        <div
          id={HERO_CAROUSEL_ID}
          className="carousel slide carousel-fade h-full w-full"
          data-bs-ride="carousel"
          data-bs-interval="6000"
        >
          <div className="carousel-indicators">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target={`#${HERO_CAROUSEL_ID}`}
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : undefined}
                aria-current={idx === 0 ? "true" : undefined}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="carousel-inner h-full">
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.title}
                className={`carousel-item relative h-full ${idx === 0 ? "active" : ""}`}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="d-block h-full min-h-[88vh] w-full object-cover"
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                </video>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/25" />
                <div className="carousel-caption !bottom-0 !left-0 !right-0 !top-0 !m-0 flex h-full w-full items-end pb-16 pt-24 text-start md:items-center md:pb-24">
                  <div className="container mx-auto px-6 md:px-12 lg:px-16">
                    <p className="hero-animate mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-primary md:text-sm">
                      Baidya Engineering Works
                    </p>
                    {idx === 0 ? (
                      <h1 className="hero-animate max-w-3xl text-3xl font-bold uppercase leading-tight text-hero-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                        {slide.title}
                      </h1>
                    ) : (
                      <h2 className="hero-animate max-w-3xl text-3xl font-bold uppercase leading-tight text-hero-foreground sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                        {slide.title}
                      </h2>
                    )}
                    <p className="hero-animate mt-4 max-w-xl text-base leading-relaxed text-hero-foreground/80 md:text-lg">
                      {slide.description}
                    </p>
                    <div className="hero-animate mt-8 flex flex-wrap gap-3">
                      <Link href="/contact">
                        <span className="inline-flex cursor-pointer items-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg transition-colors hover:scale-[1.02] hover:bg-primary/90">
                          Request a quote
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </Link>
                      <Link href="/projects">
                        <span className="inline-flex cursor-pointer items-center border border-hero-foreground/40 bg-hero-foreground/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-hero-foreground backdrop-blur-sm transition-colors hover:bg-hero-foreground/20">
                          View projects
                        </span>
                      </Link>
                    </div>
                    <p className="hero-animate mt-6 flex items-center gap-2 text-sm text-hero-foreground/70">
                      <MapPin className="h-4 w-4 text-primary" aria-hidden />
                      Based in Chikrand, West Bengal · Serving industry statewide
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target={`#${HERO_CAROUSEL_ID}`}
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target={`#${HERO_CAROUSEL_ID}`}
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div
          ref={trustRef}
          className="container mx-auto grid grid-cols-2 gap-6 px-6 py-10 md:grid-cols-4 md:px-12 lg:px-16"
        >
          {[
            { value: "20+", label: "Years on site" },
            { value: "500+", label: "Projects delivered" },
            { value: "2005", label: "Established" },
            { value: "WB", label: "West Bengal based" },
          ].map((stat) => (
            <div key={stat.label} data-stat className="text-center md:text-left">
              <div className="text-3xl font-bold text-primary md:text-4xl">{stat.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-8 py-8 md:px-12 lg:px-16">
          <Reveal className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2
                className="text-3xl font-bold normal-case text-foreground"
                style={{ fontFamily: "Roboto" }}
              >
                What we do
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                End-to-end industrial contracting — from utility installation and steel
                fabrication to planned maintenance and pipeline erection.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="slider-nav-btn flex h-7 w-7 items-center justify-center border border-border bg-card text-muted-foreground"
              >
                <ChevronLeft className="h-3 w-3" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="slider-nav-btn flex h-7 w-7 items-center justify-center border border-border bg-card text-muted-foreground"
              >
                <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </div>
          </Reveal>

          <div className="w-full overflow-hidden">
            <div ref={trackRef} className="flex">
              {items.map((service, idx) => (
                <div
                  key={`${service.uuid ?? service.id}-${idx}`}
                  className="slide-card h-full min-w-full p-2 sm:min-w-[50%] lg:min-w-[33.333%]"
                >
                  <div className="h-full overflow-hidden border bg-card">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-[400px] w-full object-cover"
                    />
                    <div className="p-5">
                      <h3 className="mb-1 text-xl font-bold">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/services">
              <span className="inline-flex cursor-pointer items-center text-sm font-bold uppercase tracking-wider text-primary hover:underline">
                Explore all services <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-muted py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold uppercase text-foreground">Our Expertise</h2>
            <div className="mx-auto mb-6 h-1 w-24" />
            <p className="text-lg text-muted-foreground">
              Four pillars of work that cover the full industrial project lifecycle — from
              greenfield sheds to brownfield plant upgrades.
            </p>
          </Reveal>

          <Reveal staggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <ServiceCard
              icon={<Hammer className="h-10 w-10" />}
              title="Construction"
              desc="Industrial and commercial structural works — managed for plant environments."
              href="/services"
            />
            <ServiceCard
              icon={<Factory className="h-10 w-10" />}
              title="Fabrication"
              desc="Custom steel fabrication, structural components, and shop-to-site welding to drawing and code."
              href="/services"
            />
            <ServiceCard
              icon={<Wrench className="h-10 w-10" />}
              title="Maintenance"
              desc="Preventive programmes, breakdown response, equipment overhauls, and shutdown execution."
              href="/services"
            />
            <ServiceCard
              icon={<Settings className="h-10 w-10" />}
              title="Mechanical"
              desc="Mechanical installs, utility tie-ins, and precision alignment for process and plant equipment."
              href="/services"
            />
          </Reveal>
        </div>
      </section>

      {/* How we engage — pinned scroll, steps rise one-by-one */}
      <section
        ref={engageSectionRef}
        className="bg-[#F2F7F4] dark:bg-muted"
      >
        <div
          ref={engagePinRef}
          className="flex min-h-screen flex-col justify-center py-20 lg:py-24"
        >
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            <div className="mb-10 max-w-2xl lg:mb-14">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#E4572E]">
                Engagement
              </p>
              <h2 className="text-3xl font-bold normal-case tracking-normal text-foreground md:text-4xl">
                How a typical engagement works
              </h2>
            </div>

            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <div
                ref={engagePanelRef}
                className="flex min-h-[320px] flex-col justify-between bg-card p-6 shadow-sm sm:min-h-[360px] sm:p-8 md:min-h-[380px] md:p-10"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    Step {ENGAGEMENT_STEPS[activeStep].step}
                  </p>
                  <p className="mt-6 font-['Oswald'] text-6xl font-bold leading-none text-[#E4572E] sm:mt-8 sm:text-7xl md:text-8xl">
                    {ENGAGEMENT_STEPS[activeStep].step}
                  </p>
                  <h3 className="mt-5 text-xl font-bold normal-case tracking-normal text-foreground sm:mt-6 sm:text-2xl">
                    {ENGAGEMENT_STEPS[activeStep].title}
                  </h3>
                  <div className="lg:hidden">
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {ENGAGEMENT_STEPS[activeStep].text}
                    </p>
                    <Link href="/contact">
                      <span className="mt-4 inline-block text-sm font-semibold text-[#E4572E] underline underline-offset-4">
                        Know More
                      </span>
                    </Link>
                  </div>
                </div>
                <p className="mt-8 text-center text-sm font-bold uppercase tracking-[0.18em] text-foreground sm:mt-10">
                  {ENGAGEMENT_STEPS[activeStep].panelLabel}
                </p>
              </div>

              <div
                ref={engageCardsRef}
                className="relative hidden h-[380px] overflow-hidden lg:block"
              >
                {ENGAGEMENT_STEPS.map((item, i) => (
                  <div
                    key={item.step}
                    data-engage-card
                    className="absolute inset-0 flex items-center p-5 md:p-6"
                    style={{ zIndex: i + 1 }}
                  >
                    <div>
                      <h3 className="mb-2 text-xl font-bold normal-case tracking-normal text-foreground md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                        {item.text}
                      </p>
                      <Link href="/contact">
                        <span className="mt-4 inline-block text-sm font-semibold text-[#E4572E] underline underline-offset-4">
                          Know More
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-2 lg:mt-12">
              {ENGAGEMENT_STEPS.map((item, i) => (
                <span
                  key={item.step}
                  className={`h-1 flex-1 transition-colors duration-300 ${
                    i === activeStep ? "bg-[#E4572E]" : "bg-foreground/15"
                  }`}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industries + coverage — centered tabs */}
      <section className="bg-[#F2F7F4] pb-24 pt-8 dark:bg-muted">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="mb-10 flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {(
              [
                { id: "industries" as const, label: "Industries we serve" },
                { id: "coverage" as const, label: "Service coverage" },
              ] as const
            ).map((tab) => {
              const active = serveTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setServeTab(tab.id)}
                  className={`relative pb-3 text-lg font-bold normal-case tracking-normal transition-colors md:text-2xl ${
                    active
                      ? "text-[#E4572E]"
                      : "text-muted-foreground/55 hover:text-muted-foreground"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] w-full transition-colors ${
                      active ? "bg-[#E4572E]" : "bg-transparent"
                    }`}
                  />
                </button>
              );
            })}
          </Reveal>

          <Reveal>
            {serveTab === "industries" ? (
              <div>
                <p className="mx-auto mb-10 max-w-2xl text-center text-muted-foreground">
                  We work alongside plant owners, project managers, and OEMs who need a
                  reliable local contractor for utility, structural, and maintenance scopes
                  in and around West Bengal.
                </p>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Show service coverage"
                    onClick={() => setServeTab("coverage")}
                    className="absolute -left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#E4572E] text-white md:-left-4 md:flex"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show service coverage"
                    onClick={() => setServeTab("coverage")}
                    className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#E4572E] text-white md:-right-4 md:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {INDUSTRIES.map((name) => (
                      <li
                        key={name}
                        className="flex min-h-[96px] items-center justify-center bg-card px-6 py-8 text-center text-sm font-semibold text-foreground shadow-sm"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="mx-auto max-w-3xl">
                <p className="mb-8 text-center leading-relaxed text-muted-foreground">
                  Based in{" "}
                  <strong className="font-semibold text-foreground">
                    Chikrand, West Bengal 712304
                  </strong>
                  , our crews routinely mobilise across the industrial belts of South Bengal —
                  with statewide coverage for larger fabrication and PEB packages.
                </p>
                <div className="relative">
                  <button
                    type="button"
                    aria-label="Show industries"
                    onClick={() => setServeTab("industries")}
                    className="absolute -left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#E4572E] text-white md:-left-4 md:flex"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    aria-label="Show industries"
                    onClick={() => setServeTab("industries")}
                    className="absolute -right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#E4572E] text-white md:-right-4 md:flex"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                  <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {SERVICE_AREAS.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-3 bg-card px-5 py-5 text-sm font-medium text-foreground shadow-sm"
                      >
                        <MapPin className="h-4 w-4 shrink-0 text-[#E4572E]" aria-hidden />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-8 text-center text-sm text-muted-foreground">
                  Not sure if we cover your site?{" "}
                  <Link
                    href="/contact"
                    className="font-semibold text-[#E4572E] underline underline-offset-4"
                  >
                    Know More
                  </Link>
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Why choose us — about-style composition */}
      <section className="bg-[#F2F7F4] py-24 dark:bg-card">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-[#E4572E]">
                Why choose us?
              </p>
              <h2 className="mb-6 text-3xl font-bold normal-case tracking-normal text-foreground md:text-4xl lg:text-[2.75rem] lg:leading-tight">
                Industrial work you can plan production around.
              </h2>
              <p className="mb-4 text-lg font-semibold leading-relaxed text-foreground">
                Combining disciplined site execution, fabrication quality, and crew
                experience to protect your uptime.
              </p>
              <p className="mb-8 max-w-xl leading-relaxed text-muted-foreground">
                Clients return to Baidya Engineering Works because we treat every weld,
                alignment, and handover as part of their production risk — not just a
                checklist item. Since 2005 we have delivered utility, PEB, pipeline, and
                maintenance scopes across West Bengal plants.
              </p>
              <Link href="/about">
                <span className="text-sm font-semibold text-[#E4572E] underline underline-offset-4">
                  Know More
                </span>
              </Link>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {WHY_POINTS.map((item) => (
                  <div key={item.title}>
                    <h3 className="mb-2 text-lg font-bold normal-case tracking-normal text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal className="grid grid-cols-2 gap-4 lg:col-span-5" delay={0.08}>
              <img
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000"
                alt="Industrial construction site with steel structure"
                className="col-span-2 h-56 w-full object-cover shadow-lg md:h-64"
              />
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
                alt="Engineers reviewing plant equipment"
                className="h-40 w-full object-cover shadow-lg md:h-48"
              />
              <img
                src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1000"
                alt="Plant technicians coordinating on the shop floor"
                className="mt-8 h-40 w-full object-cover shadow-lg md:h-48"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Insights teaser */}
      <section className="bg-card py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="mb-12 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-3 text-3xl font-bold uppercase text-foreground">
                Insights for plant owners
              </h2>
              <div className="mb-4 h-1 w-20" />
              <p className="max-w-xl text-muted-foreground">
                Guides on PEB, maintenance, pipelines, and utilities — written to help you
                award work with fewer surprises.
              </p>
            </div>
            <Link href="/insights">
              <span className="inline-flex cursor-pointer items-center text-sm font-bold uppercase tracking-wider text-primary hover:underline">
                View all insights <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
          </Reveal>

          <Reveal staggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {INSIGHTS.slice(0, 3).map((article) => (
              <Link key={article.slug} href={`/insights/${article.slug}`}>
                <article className="group h-full cursor-pointer border border-border bg-muted transition-shadow hover:shadow-lg">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={article.heroImage}
                      alt=""
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {article.category}
                    </p>
                    <h3 className="mb-2 text-base font-bold uppercase leading-snug text-foreground group-hover:text-primary">
                      {article.title}
                    </h3>
                    <p className="line-clamp-2 text-sm text-muted-foreground">{article.description}</p>
                  </div>
                </article>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted py-24">
        <div className="container mx-auto max-w-3xl px-8 md:px-12">
          <Reveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold uppercase text-foreground">
              Frequently asked questions
            </h2>
            <div className="mx-auto h-1 w-20" />
          </Reveal>
          <Reveal staggerChildren className="space-y-4">
            {HOME_FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group border border-border bg-card open:shadow-sm"
              >
                <summary className="cursor-pointer list-none px-6 py-4 text-left text-base font-bold uppercase text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-hero py-20 text-hero-foreground">
        <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 bg-primary/20 blur-3xl" />
        <Reveal className="container relative z-10 mx-auto px-8 text-center md:px-12">
          <h2 className="mb-4 text-3xl font-bold uppercase md:text-4xl">
            Planning a plant project?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-hero-foreground/70">
            Tell us about your scope — utilities, PEB, pipelines, or maintenance — and our
            team will respond with a clear next step and estimate timeline.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <span className="inline-flex cursor-pointer items-center bg-primary px-8 py-3.5 text-sm font-bold uppercase tracking-widest text-primary-foreground shadow-lg transition-colors hover:scale-[1.02] hover:bg-primary/90">
                Get a consultation
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
            <a
              href="tel:+919874751736"
              className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-primary hover:text-hero-foreground"
            >
              Or call +91 987 475 1736
            </a>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function ServiceCard({
  icon,
  title,
  desc,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="group cursor-pointer border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
        <div className="mb-6 flex h-16 w-16 items-center justify-center bg-primary/10 text-primary">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold uppercase text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="mb-6 leading-relaxed text-muted-foreground">{desc}</p>
        <div className="flex items-center text-sm font-bold uppercase tracking-wider text-primary transition-transform group-hover:translate-x-2">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </Link>
  );
}
