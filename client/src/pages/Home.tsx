import {
  ArrowRight,
  ArrowDown,
  Wrench,
  Hammer,
  Factory,
  Settings,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ArrowUpRightFromCircle,
  ArrowRightFromLine,
  ArrowRightLeft,
  ArrowRightSquare,
  MoveUpRight,
  Shield,
  Target,
  Clock,
  Users,
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

import CountUp from "@/components/CountUp";

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
  "Chemical & process",
  "Power & utilities",
  "Warehousing & logistics",
  "Food & beverage",
  "Commercial sheds",
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
    icon: Shield,
  },
  {
    title: "Precision engineering",
    text: "Fabrication and installation to drawing, with fit-up and QA checks before critical lifts.",
    icon: Target,
  },
  {
    title: "Timely delivery",
    text: "Realistic programmes, material tracking, and crew planning that respect shutdown windows.",
    icon: Clock,
  },
  {
    title: "Experienced team",
    text: "Welders, fitters, and supervisors with decades of combined industrial site experience.",
    icon: Users,
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
                          Discuss your requirement
                          <MoveUpRight className="ml-2 h-4 w-4" />
                        </span>
                      </Link>
                      <Link href="/projects">
                        <span className="inline-flex cursor-pointer items-center border border-hero-foreground/40 bg-hero-foreground/10 px-6 py-3 text-sm font-bold uppercase tracking-wider text-hero-foreground backdrop-blur-sm transition-colors hover:bg-hero-foreground/20">
                          View projects
                        </span>
                      </Link>
                    </div>
                 
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
            { value: "20", ad_on: "+", label: "Years on site" },
            { value: "500", ad_on: "+", label: "Projects delivered" },
            { value: "2005", ad_on: "", label: "Established" },
            { value: "01", ad_on: "", label: "Partner from scope to handover" },
          ].map((stat) => (
            <div key={stat.label} data-stat className="text-center md:text-left border-r border-border last:border-r-1">
              <div className="text-3xl font-bold md:text-4xl">
                {stat.value !== "2005" && stat.value !== "01" ? (
                  <CountUp
                    from={0}
                    to={Number(stat.value)}
                    direction="up"
                    duration={1.5}
                    className="count-up-text"
                    delay={0}
                  />
                ) : (
                  stat.value
                )}
                <span className="text-primary">{stat.ad_on}</span>
              </div>
                <div className="mt-1 text-[5px] md:text-xs font-semibold uppercase tracking-wider text-muted-foreground ">
                  {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A7A78]">
                <span className="h-[2px] w-8 bg-[#E4572E]" aria-hidden />
                What we do 
              </p>
              <h2
                className="text-4xl font-normal normal-case leading-[1.08] text-[#1A1A1A] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Industrial work,
                <span className="mt-1 block text-[#9A9A98]">done properly.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-[#6F6F6D] lg:justify-self-end">
              From a single maintenance package to an end-to-end industrial
              build, our team brings practical expertise, clear communication,
              and accountable execution.
            </p>
          </Reveal>
        </div>

        <div className="border-t border-black/10"><br/>
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            <div className="relative">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="slider-nav-btn absolute left-3 top-[200px] z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-black/15 bg-[#F3F1EC] text-[#6F6F6D]"
              >
                <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="slider-nav-btn absolute right-3 top-[200px] z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center border border-black/15 bg-[#F3F1EC] text-[#6F6F6D]"
              >
                <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>

              <div className="w-full overflow-hidden">
                <div ref={trackRef} className="flex">
                  {items.map((service, idx) => (
                    <div
                      key={`${service.uuid ?? service.id}-${idx}`}
                      className="slide-card h-full min-w-full sm:min-w-[50%] lg:min-w-[33.333%]"
                    >
                      <div className="h-full overflow-hidden border-r border-black/10 bg-transparent">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-[400px] w-full object-cover"
                        />
                        <div className="p-5">
                          <h3 className="mb-1 text-xl font-bold normal-case tracking-normal text-[#1A1A1A]">
                            {service.title}
                          </h3>
                          <p className="text-[#6F6F6D]">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <br/><div className="border-t border-black/20"><br/></div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="bg-white py-15">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A7A78]">
                <span className="h-[2px] w-8 bg-[#E4572E]" aria-hidden />
                Expertise
              </p>
              <h2
                className="text-4xl font-normal normal-case leading-[1.08] text-[#1A1A1A] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
                style={{  letterSpacing: "-0.02em" }}
              >
                Four pillars,
                <span className="mt-1 block text-[#9A9A98]">one contractor.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-[#6F6F6D] lg:justify-self-end">
              Construction, fabrication, maintenance, and mechanical work —
              covering the full industrial project lifecycle, from greenfield
              sheds to brownfield plant upgrades.
            </p>
          </Reveal>
        </div>

        <div>
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            <Reveal
              staggerChildren
              className="grid grid-cols-1 border-y border-black/10 md:grid-cols-2 lg:grid-cols-4"
            >
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
        </div>
        
  
      </section>

      {/* Industries we serve */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A7A78]">
                <span className="h-[2px] w-8 bg-[#E4572E]" aria-hidden />
                Where we work
              </p>
              <h2
                className="text-4xl font-normal normal-case leading-[1.08] text-[#1A1A1A] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
                style={{
                 
                  letterSpacing: "-0.02em",
                }}
              >
                Made for
                <span className="mt-1 block text-[#9A9A98]">industry.</span>
              </h2>
            </div>

            <ul className="grid grid-cols-1 border-y border-black/10 sm:grid-cols-2">
              {INDUSTRIES.map((name) => (
                <li
                  key={name}
                  className="border-black/10 px-6 py-4 text-sm text-[#6F6F6D] max-sm:border-b max-sm:last:border-b-0 sm:px-8 sm:py-5 sm:odd:border-r sm:[&:nth-child(n+3)]:border-t"
                >
                  {name}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      
      <br/><div className="border-t border-black/10 w-[75vw] mx-auto"><br/></div>

      {/* Why choose us */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <Reveal className="grid items-center gap-10 pb-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-5 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#7A7A78]">
                <span className="h-[2px] w-8 bg-[#E4572E]" aria-hidden />
                Why choose us
              </p>
              <h2
                className="text-4xl font-normal normal-case leading-[1.08] text-[#1A1A1A] sm:text-5xl md:text-6xl lg:text-[4.5rem]"
                style={{ letterSpacing: "-0.02em" }}
              >
                Industrial work,
                <span className="mt-1 block text-[#9A9A98]">you can plan around.</span>
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-[#6F6F6D] lg:justify-self-end">
              Combining disciplined site execution, fabrication quality, and crew
              experience to protect your uptime. Clients return because we treat
              every weld, alignment, and handover as part of their production risk.
            </p>
          </Reveal>
        </div>

        <div>
          <div className="container mx-auto px-8 md:px-12 lg:px-16">
            <Reveal
              staggerChildren
              className="grid grid-cols-1 border-y border-black/10 md:grid-cols-2 lg:grid-cols-4"
            >
              {WHY_POINTS.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.title}
                    className="border-black/10 max-md:border-b max-md:last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(n+3)]:border-t lg:border-r lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+3)]:border-t-0"
                  >
                    <div className="flex h-full flex-col p-8">
                      <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center bg-[#E4572E]/10 text-[#E4572E]">
                        <Icon className="h-10 w-10" />
                      </div>
                      <h3 className="mb-3 text-xl font-bold normal-case tracking-normal text-[#1A1A1A]">
                        {point.title}
                      </h3>
                      <p className="leading-relaxed text-[#6F6F6D]">{point.text}</p>
                    </div>
                  </div>
                );
              })}
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
      <section className="bg-[#E4572E] py-20 text-white md:py-28">
        <Reveal className="container mx-auto grid items-center gap-10 px-8 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <div>
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/80">
              Have a project in mind?
            </p>
            <h2
              className="text-5xl font-normal normal-case leading-none text-white sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              style={{ letterSpacing: "-0.02em" }}
            >
              Let's build
            </h2>
          </div>
          <div className="max-w-md">
            <p className="mb-8 text-[15px] leading-relaxed text-white/90 md:text-lg">
              Share your requirement, drawings, or site details.
              <br />
              We'll come back with the right next step.
            </p>
            <Link href="/contact">
              <span className="inline-flex cursor-pointer items-center bg-[#1A1A1A] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-black">
                Start a conversation
                <MoveUpRight className="ml-2 h-4 w-4" strokeWidth={1.75} />
              </span>
            </Link>
            <div className="mt-8 space-y-1 text-sm text-white/90">
              <a href="tel:+919874751736" className="block transition-colors hover:text-white">
                +91 987 475 1736
              </a>
              <a
                href="mailto:baidyaengineering@gmail.com"
                className="block transition-colors hover:text-white"
              >
                baidyaengineering@gmail.com
              </a>
            </div>
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
    <Link
      href={href}
      className="group block h-full border-black/10 transition-colors hover:bg-black/[0.04] max-md:border-b max-md:last:border-b-0 md:border-r md:[&:nth-child(2n)]:border-r-0 md:[&:nth-child(n+3)]:border-t lg:border-r lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(4n)]:border-r-0 lg:[&:nth-child(n+3)]:border-t-0"
    >
      <div className="flex h-full cursor-pointer flex-col p-8">
        <div className="mb-6 flex h-16 w-16 shrink-0 items-center justify-center bg-[#E4572E]/10 text-[#E4572E]">
          {icon}
        </div>
        <h3 className="mb-3 text-xl font-bold normal-case tracking-normal text-[#1A1A1A] transition-colors group-hover:text-[#E4572E]">
          {title}
        </h3>
        <p className="mb-6 flex-1 leading-relaxed text-[#6F6F6D]">{desc}</p>
        <div className="mt-auto flex items-center text-slate-600 text-xs font-bold uppercase tracking-wider transition-transform group-hover:translate-x-2 hover:text-[#E4572E]">
          Learn more <MoveUpRight className="ml-2 h-4 w-3 text-[#E4572E]" />
        </div>
      </div>
    </Link>
  );
}
