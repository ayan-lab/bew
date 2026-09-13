import {
  Factory,
  Wrench,
  Settings,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Phone,
  MoveUpRight,
} from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";
import { FaqJsonLd } from "@/components/FaqJsonLd";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Understand",
    desc: "Site walk, drawings, constraints, and a clear scope of work.",
  },
  {
    number: "02",
    title: "Engineer",
    desc: "Method statements, material planning, and a practical delivery programme.",
  },
  {
    number: "03",
    title: "Execute",
    desc: "Disciplined fabrication, installation, testing, and safe handover.",
  },
] as const;

const SERVICE_FAQS = [
  {
    question: "Where does Baidya Engineering Works operate?",
    answer:
      "We are based in Chikrand, West Bengal (PIN 712304) and take on industrial projects across the state — manufacturing plants, warehouses, and process facilities.",
  },
  {
    question: "What types of projects do you take on?",
    answer:
      "Utility installations, plant maintenance and shutdowns, PEB / steel building packages, pipeline fabrication & erection, and related mechanical construction scopes.",
  },
  {
    question: "Can you support emergency plant breakdowns?",
    answer:
      "Yes. Our maintenance teams respond to urgent repair calls and can mobilise for unplanned downtime when capacity allows. Call +91 987 475 1736 for urgent needs.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Share drawings, photos, or a brief scope via our contact form, email, or WhatsApp. We review the requirement and revert with clarification questions and an estimate timeline.",
  },
];

export default function Services() {
  usePageMeta({
    title: "Industrial Engineering Services",
    description:
      "Industrial utility engineering, plant maintenance, PEB works, and pipeline fabrication & erection from Baidya Engineering Works in West Bengal.",
    path: "/services",
  });

  return (
    <div>
      <FaqJsonLd items={SERVICE_FAQS} />

      <section className="mb-12 overflow-hidden bg-hero text-hero-foreground">
        <div className="container mx-auto px-4 py-16 text-center md:px-8">
          <Reveal y={24}>
            <h1 className="mb-4 text-4xl font-bold uppercase">Our Services</h1>
            <p className="mx-auto max-w-2xl text-lg text-hero-foreground/65">
              Full-scope industrial contracting for factories and process plants across West
              Bengal — utilities, maintenance, PEB structures, and pipeline packages.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24">
        <Reveal
          staggerChildren
          stagger={0.12}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12"
        >
          <ServiceDetailCard
            icon={<Factory className="h-12 w-12" />}
            title="Industrial Utility Engineering"
            description="Design, installation, and commissioning of factory utility systems that keep production lines supplied with power, water, air, and climate control. We coordinate with plant engineers so tie-ins and shutdowns stay controlled."
            features={[
              "Electrical distribution & lighting",
              "Industrial plumbing & process water",
              "HVAC for plant and office areas",
              "Compressed air & utility piping",
            ]}
            image="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000"
          />

          <ServiceDetailCard
            icon={<Wrench className="h-12 w-12" />}
            title="Plant Maintenance"
            description="Scheduled and emergency maintenance that protects uptime. From routine lubrication and inspections to full equipment overhauls and shutdown campaigns, our crews work to your production calendar."
            features={[
              "Preventive maintenance programmes",
              "Emergency breakdown response",
              "Equipment overhauls & realignment",
              "Shutdown & turnaround support",
            ]}
            image="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
          />

          <ServiceDetailCard
            icon={<Building2 className="h-12 w-12" />}
            title="PEB Works"
            description="Pre-engineered building packages for factories, warehouses, and process sheds. We handle structural steel, cladding, and erection so you get a weather-tight envelope ready for fit-out."
            features={[
              "Pre-engineered steel buildings",
              "Primary & secondary framing",
              "Roof & wall panel systems",
              "Custom design & shop fabrication",
            ]}
            image="https://plus.unsplash.com/premium_photo-1663088543643-2a1ebfc830b6?w=900&auto=format&fit=crop&q=60"
          />

          <ServiceDetailCard
            icon={<Settings className="h-12 w-12" />}
            title="Industrial Pipeline Fabrication & Erection"
            description="Shop fabrication and site erection of industrial pipelines for process, utility, and utility-adjacent services. Fit-up, welding, supports, and testing executed to agreed procedures."
            features={[
              "Carbon & alloy pipeline fabrication",
              "Site erection & alignment",
              "Supports, hangers & insulation prep",
              "Hydro / leak testing support",
            ]}
            image="https://images.unsplash.com/photo-1673423707246-e8b78e272125?w=900&auto=format&fit=crop&q=60"
          />
        </Reveal>
      </div>

      <section className="bg-hero py-24 text-hero-foreground md:py-32">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-hero-foreground/50">
                <span className="h-[2px] w-8 bg-primary" aria-hidden />
                How we work
              </p>
              <h2
                className="mb-6 text-4xl font-normal normal-case leading-[1.08] text-hero-foreground sm:text-5xl md:text-6xl lg:text-[4.5rem]"
                style={{
                  letterSpacing: "-0.02em",
                }}
              >
                Clear thinking.
                <span className="mt-1 block">
                  <span className="italic text-primary font-bold" style={{ fontFamily: "'Instrument Serif', Georgia, serif", letterSpacing: "0.04em" }}>Solid</span> execution.
                </span>
              </h2>
              <p className="mb-10 max-w-md text-[15px] leading-relaxed text-hero-foreground/55">
                Industrial projects do not need more noise. They need a partner who
                understands the site, owns the details, and keeps the work moving safely.
              </p>
              <Link href="/contact">
                <span className="inline-flex cursor-pointer items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-hero-foreground/50 transition-colors hover:text-primary">
                  Work with our team
                  <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                </span>
              </Link>
            </Reveal>

            <Reveal staggerChildren stagger={0.1}>
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="grid grid-cols-[2.75rem_1fr] gap-4 border-t border-hero-foreground/15 py-8 last:border-b md:grid-cols-[3.5rem_1fr] md:gap-6 md:py-9"
                >
                  <span className="pt-1 text-[11px] font-semibold tracking-[0.14em] text-primary">
                    {step.number}
                  </span>
                  <div>
                    <h3
                      className="mb-2 text-xl font-medium normal-case tracking-normal text-hero-foreground md:text-[1.35rem]"
                      style={{ fontFamily: "'Roboto', sans-serif", letterSpacing: "0" }}
                    >
                      {step.title}
                    </h3>
                    <p className="max-w-sm text-[15px] leading-relaxed text-hero-foreground/55">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-card py-24">
        <div className="container mx-auto max-w-3xl px-4">
          <Reveal className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold uppercase text-foreground">
              Frequently asked questions
            </h2>
            <div className="mx-auto h-1 w-20 bg-primary" />
          </Reveal>
          <Reveal staggerChildren className="space-y-6">
            {SERVICE_FAQS.map((faq) => (
              <div key={faq.question} className="border border-border bg-muted px-6 py-5">
                <h3 className="mb-2 text-lg font-bold uppercase text-foreground">
                  {faq.question}
                </h3>
                <p className="leading-relaxed text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="bg-hero py-16 text-hero-foreground">
        <Reveal className="container mx-auto px-4 text-center">
          <h2 className="mb-3 text-2xl font-bold uppercase md:text-3xl">
            Need a contractor for your next scope?
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-hero-foreground/65">
            Send your requirement and we will confirm feasibility, timeline, and next steps.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <span className="inline-flex cursor-pointer items-center bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
                start a conversation <MoveUpRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
           
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function ServiceDetailCard({
  icon,
  title,
  description,
  features,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  image: string;
}) {
  return (
    <div className="group overflow-hidden border border-border bg-card shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-hero/25 transition-colors group-hover:bg-transparent" />
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="p-8">
        <div className="mb-6 flex items-center">
          <div className="mr-4 bg-primary/10 p-3 text-primary">{icon}</div>
          <h2 className="text-2xl font-bold uppercase text-foreground">{title}</h2>
        </div>
        <p className="mb-8 leading-relaxed text-muted-foreground">{description}</p>
        <ul className="space-y-3">
          {features.map((feat) => (
            <li key={feat} className="flex items-center text-sm font-medium text-foreground/80">
              <div className="mr-3 h-1.5 w-1.5 bg-primary" />
              {feat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

