import { ArrowRight, Wrench, Hammer, Factory, Settings, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState, useCallback } from "react";
import { Carousel } from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/slider-nav.css";

import { Button } from "@/components/ui/button";
import { apiUrl } from "@/lib/api";

const HERO_VIDEO =
  "https://res.cloudinary.com/dqhnt5mus/video/upload/q_auto:best,f_auto,w_1280/v1777366937/download_lckhyt.mp4";

const HERO_SLIDES = [
  {
    title: "Precision Engineering",
    description: "Accuracy in every detail, excellence in every build.",
  },
  {
    title: "Robust Solutions",
    description: "Engineering durability that stands the test of time.",
  },
  {
    title: "Building tomorrow's industrial infrastructure",
    description:
      "Forging the future through expert craftsmanship and innovative engineering.",
  },
  {
    title: "Innovation at Scale",
    description:
      "Deploying cutting-edge technology to solve complex industrial challenges.",
  },
  {
    title: "Strategic Partnership",
    description:
      "Your trusted ally in navigating large-scale mechanical projects.",
  },
] as const;

const HERO_CAROUSEL_ID = "heroCarousel";

type Service = {
  id: number;
  uuid: string;
  title: string;
  image: string;
  description: string;
}


export default function Home() {

  const trackRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const [items, setItems] = useState<Service[]>([]);
  const [index, setIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    isAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  async function getServices(){
    const response = await fetch(apiUrl("/api/services"));
    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }
    return response.json();
  }

  useEffect(() => {
    getServices().then((services) => {
      setItems(services);
    });
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

  useEffect(() => {
    if (!trackRef.current) return;
    const firstCard =
      trackRef.current.querySelector(".slide-card");
    if (!firstCard) return;
    const cardWidth =
      (firstCard as HTMLElement).offsetWidth;
    trackRef.current.style.transition =
      isAnimating
        ? "transform 500ms ease"
        : "none";
    trackRef.current.style.transform =
      `translateX(-${index * cardWidth}px)`;
  }, [index, isAnimating, items]);
  
  const nextSlide = useCallback(() => {
    if (isAnimatingRef.current) return;
    setIsAnimating(true);
    setIndex(prev => prev + 1);
    setTimeout(() => {
      setItems(prev => {
        const updated = [...prev];
        updated.push(updated.shift()!);
        return updated;
      });
      setIndex(prev => prev - 1);
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
    setItems(prev => {
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
      {/* HERO SECTION — Bootstrap carousel: one id, fade + autoplay + captions */}
      <section className="relative h-[82vh] min-h-[400px]">
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
                  className="d-block h-full min-h-[82vh] w-full object-cover"
                >
                  <source src={HERO_VIDEO} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent pointer-events-none" />
                <div className="carousel-caption d-none d-md-block pb-20 text-start">
                  <h5 className="text-2xl font-bold uppercase tracking-wide">
                    {slide.title}
                  </h5>
                  <p className="mt-2 max-w-xl text-slate-200">{slide.description}</p>
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

      {/* what we do */}
      <section className="py-24  bg-white">
        <div className="container mx-auto px-8 md:px-12 lg:px-16 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-[#303843] normal-case" style={{ fontFamily: 'Roboto' }}>
              What we do 
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous slide"
                className="slider-nav-btn flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
              >
                <ChevronLeft className="h-3 w-3" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next slide"
                className="slider-nav-btn flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600"
              >
                <ChevronRight className="h-3 w-3" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* SLIDER */}
          <div
            className="overflow-hidden w-full"
          >
            <div
              ref={trackRef}
              className="flex"
            >
              {items.map((service, idx) => {
                return (
                  <div
                    key={idx}
                    className="
                      slide-card
                      min-w-full
                      sm:min-w-[50%]
                      lg:min-w-[33.333%]
                      p-2
                      h-[600px]
                    "
                  >
                    <div className="
                      h-full
                      overflow-hidden
                      border-1
                      bg-white
                    ">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="
                          w-full
                          h-[400px]
                          object-cover
                        "
                      />
                      <div className="p-5">
                        <h5 className="text-xl font-bold mb-2">
                          {service.title}
                        </h5>
                        <p className="text-slate-600">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>


      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-8 md:px-12 lg:px-16">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-slate-900 uppercase">Our Expertise</h2>
            <div className="w-24 h-1 bg-primary-gradient mx-auto mb-6" />
            <p className="text-slate-600 text-lg">
              We deliver comprehensive engineering solutions tailored to the unique demands of heavy industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard
              icon={<Hammer className="w-10 h-10" />}
              title="Construction"
              desc="Full-scale industrial and commercial structural development."
            />
            <ServiceCard
              icon={<Factory className="w-10 h-10" />}
              title="Fabrication"
              desc="Custom steel fabrication, welding, and structural components."
            />
            <ServiceCard
              icon={<Wrench className="w-10 h-10" />}
              title="Maintenance"
              desc="Preventive maintenance and rapid repair for plant machinery."
            />
            <ServiceCard
              icon={<Settings className="w-10 h-10" />}
              title="Mechanical"
              desc="Specialized mechanical installations and precision engineering."
            />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 text-slate-50 relative overflow-hidden  bg-[#E8EAEF] ">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full skew-x-12 translate-x-32  " />

        <div className="container mx-auto px-8 md:px-12 lg:px-16 relative z-10 text-[#303843]  ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {/* industrial structure image */}
                <img
                  src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=1000"
                  alt="Industrial structure"
                  className="shadow-2xl translate-y-8"
                />
                {/* engineer blueprint image */}
                <img
                  src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=1000"
                  alt="Engineering blueprints"
                  className="shadow-2xl translate-y-12 lg:translate-y-0"
                />
              </div>
            </div>

            <div className="order-1">
              <h2 className="text-4xl font-bold mb-6 uppercase">Why Choose us?</h2>
              <div className="w-20 h-1 bg-slate-700 mb-8" />

              <div className="space-y-8">
                {[
                  { title: "Safety First", text: "Zero-compromise approach to workplace safety and compliance." },
                  { title: "Precision Engineering", text: "State-of-the-art equipment ensuring micron-level accuracy." },
                  { title: "Timely Delivery", text: "Rigorous project management to meet strict industrial deadlines." },
                  { title: "Experienced Team", text: "Experienced workers and welders with decades of combined experience." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="bg-slate-200 p-2 mr-4 group-hover:bg-slate-700 transition-[background-image] duration-200">
                      <CheckCircle2 className="w-6 h-6 text-slate-700 group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-slate-700 transition-colors">{item.title}</h3>
                      <p className="text-slate-700">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      {/* <section className="py-20 bg-slate-100 relative">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase font-display">Ready to start your project?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Get in touch with our engineering team for a comprehensive consultation and quote.</p>
          <Link href="/contact">
            <button className="bg-white text-primary hover:bg-slate-100 px-10 py-4 rounded-sm font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform text-lg">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section> */}
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary-gradient group-hover:text-white transition-[background-image,color] duration-200">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 uppercase text-slate-800 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-slate-500 leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wider group-hover:translate-x-2 transition-transform">
        Learn More <ArrowRight className="ml-2 w-4 h-4" />
      </div>
    </div>
  );
}
