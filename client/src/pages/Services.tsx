import {
  Factory,
  Wrench,
  Settings,
  ArrowRight,
  ClipboardList,
  HardHat,
  Building2,
  CheckCircle2,
  Phone,
} from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";
import { FaqJsonLd } from "@/components/FaqJsonLd";

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

      <section className="bg-muted py-24">
        <div className="container mx-auto px-4">
          <Reveal className="mb-6 text-center">
            <h2 className="mb-4 text-3xl font-bold uppercase text-foreground">Our Process</h2>
            <div className="mx-auto mb-4 h-1 w-20 bg-primary" />
            <p className="mx-auto max-w-2xl text-muted-foreground">
              A straightforward path from first site visit to handover — so scopes stay clear
              and schedules stay honest.
            </p>
          </Reveal>

          <Reveal
            staggerChildren
            className="relative mx-auto mt-16 flex max-w-5xl flex-col items-stretch justify-between md:flex-row md:items-start"
          >
            <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-secondary md:block" />
            <ProcessStep
              number="01"
              title="Consultation"
              desc="Walk the site, clarify scope, constraints, and safety requirements."
              icon={<ClipboardList className="h-6 w-6" />}
            />
            <ProcessStep
              number="02"
              title="Planning"
              desc="Method statements, material lists, crew plan, and programme."
              icon={<Settings className="h-6 w-6" />}
            />
            <ProcessStep
              number="03"
              title="Execution"
              desc="Fabrication and site works with daily progress and QA checks."
              icon={<HardHat className="h-6 w-6" />}
            />
            <ProcessStep
              number="04"
              title="Delivery"
              desc="Testing, punch-list closeout, and documented handover."
              icon={<CheckCircle2 className="h-6 w-6" />}
            />
          </Reveal>
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
                Request a quote <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            </Link>
            <a
              href="tel:+919874751736"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-hero-foreground"
            >
              <Phone className="h-4 w-4" /> +91 987 475 1736
            </a>
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

function ProcessStep({
  number,
  title,
  desc,
  icon,
}: {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="z-10 my-4 flex w-full flex-col items-center border border-border bg-card p-6 text-center shadow-sm md:my-0 md:w-48">
      <div className="mb-4 flex h-12 w-12 items-center justify-center bg-hero text-lg font-bold text-hero-foreground shadow-lg shadow-black/25 ring-1 ring-border">
        {number}
      </div>
      <h3 className="text-sm font-bold uppercase">{title}</h3>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{desc}</p>
      <div className="mt-3 text-primary opacity-60">{icon}</div>
    </div>
  );
}
