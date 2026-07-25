import { Shield, Target, Users, Award, MapPin, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "wouter";
import { apiUrl } from "@/lib/api";
import { type Client } from "@/types/api";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";

export default function About() {
  usePageMeta({
    title: "About Us — Industrial Contractors Since 2005",
    description:
      "Learn about Baidya Engineering Works — industrial contractors based in Chikrand, West Bengal since 2005. 20+ years of utility, PEB, pipeline, and plant maintenance work.",
    path: "/about",
  });

  const [clients, setClients] = useState<Client[]>([]);

  async function fetchClients(): Promise<Client[]> {
    const response = await fetch(apiUrl("/api/clients"));
    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }
    return response.json();
  }

  useEffect(() => {
    fetchClients()
      .then(setClients)
      .catch(() => setClients([]));
  }, []);

  return (
    <div>
      <section className="mb-12 overflow-hidden bg-hero text-hero-foreground">
        <div className="container mx-auto px-4 py-16 text-center md:px-8">
          <Reveal y={24}>
            <h1 className="mb-4 text-4xl font-bold uppercase">
              Building Trust Through <span className="text-primary">Excellence</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-hero-foreground/65">
              Baidya Engineering Works has supported industrial progress in West Bengal since
              2005 — combining disciplined craftsmanship with practical engineering on live
              plant sites.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="-z-10 absolute -inset-4 translate-x-4 translate-y-4 bg-primary/20" />
              <img
                src="https://images.pexels.com/photos/149387/pexels-photo-149387.jpeg"
                alt="Baidya Engineering Works team on an industrial project"
                className="w-full shadow-xl"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mb-6 text-3xl font-bold uppercase text-foreground">Our Story</h2>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              Founded in 2005 in Chikrand, West Bengal, Baidya Engineering Works began as a
              focused fabrication and site crew serving local industry. Over two decades we
              have grown into a full-service industrial contractor trusted for utility
              systems, plant maintenance, PEB structures, and pipeline packages.
            </p>
            <p className="mb-5 leading-relaxed text-muted-foreground">
              Our reputation rests on how we show up on site: clear method statements,
              welders who understand code and fit-up, and supervisors who protect both
              schedule and safety. We believe every joint, beam, and bolt contributes to the
              longevity of the facilities our clients depend on.
            </p>
            <p className="mb-8 flex items-start gap-2 text-muted-foreground">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
              <span>
                Headquartered in{" "}
                <strong className="font-semibold text-foreground">
                  Chikrand, West Bengal 712304
                </strong>{" "}
                — serving manufacturing and process plants across the region.
              </span>
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              <div className="border border-border bg-muted p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">20+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Years Experience
                </div>
              </div>
              <div className="border border-border bg-muted p-6 text-center">
                <div className="mb-2 text-4xl font-bold text-primary">500+</div>
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Projects Completed
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="mb-24 border border-border bg-muted p-8 md:p-12">
          <h2 className="mb-4 text-3xl font-bold uppercase text-foreground">What we stand for</h2>
          <div className="mb-6 h-1 w-20 bg-primary" />
          <p className="mb-8 max-w-3xl leading-relaxed text-muted-foreground">
            We are not a trading house or a paper contractor. Our crews fabricate, erect,
            maintain, and hand over works that must perform under real industrial conditions —
            heat, vibration, humidity, and production pressure.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Industrial utility installation",
              "Preventive & breakdown maintenance",
              "PEB & structural steel packages",
              "Pipeline fabrication & erection",
              "Shutdown & turnaround support",
              "On-site mechanical fitting",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
              >
                <span className="h-1.5 w-1.5 shrink-0 bg-primary" />
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <hr className="my-16 border-border" />

        <div className="mb-16">
          <Reveal className="mb-4 text-center">
            <h2 className="text-3xl font-bold uppercase text-foreground">Core Values</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              The standards we apply on every site visit, fabrication job, and handover.
            </p>
          </Reveal>
          <Reveal
            staggerChildren
            className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          >
            <ValueCard
              icon={<Shield className="h-8 w-8" />}
              title="Safety"
              desc="Method statements, PPE discipline, and a zero-compromise stance on site hazards."
            />
            <ValueCard
              icon={<Target className="h-8 w-8" />}
              title="Precision"
              desc="Fit-up, alignment, and welding that match drawings — not approximations."
            />
            <ValueCard
              icon={<Users className="h-8 w-8" />}
              title="Integrity"
              desc="Honest scopes, transparent progress, and commitments we intend to keep."
            />
            <ValueCard
              icon={<Award className="h-8 w-8" />}
              title="Quality"
              desc="Handovers that stand up to inspection, production load, and time."
            />
          </Reveal>
        </div>

        <hr className="my-16 border-border" />

        <div className="mb-16 overflow-hidden">
          <Reveal className="mb-4 text-center">
            <h2 className="text-3xl font-bold uppercase text-foreground">
              Clients we have worked with
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Trusted by industrial organisations that need dependable local execution.
            </p>
          </Reveal>

          {clients.length > 0 ? (
            <div className="group relative mt-12 flex overflow-hidden">
              <div className="flex w-max animate-scroll will-change-transform">
                {[...clients, ...clients].map((client, index) => (
                  <div
                    key={`${client.id}-${index}`}
                    className="mx-4 flex h-40 w-64 flex-shrink-0 items-center justify-center border border-border bg-white p-8 shadow-sm transition-shadow hover:shadow-lg"
                  >
                    <img
                      src={client.image}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-8 text-center text-sm text-muted-foreground">Client logos loading…</p>
          )}
        </div>

        <Reveal className="bg-hero px-8 py-12 text-center text-hero-foreground">
          <h2 className="mb-3 text-2xl font-bold uppercase">Ready to work with us?</h2>
          <p className="mx-auto mb-6 max-w-lg text-hero-foreground/65">
            Share your project scope and we will respond with the right next step.
          </p>
          <Link href="/contact">
            <span className="inline-flex cursor-pointer items-center bg-primary px-7 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
              Contact our team <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="border border-border bg-card p-8 text-center shadow-sm transition-shadow hover:shadow-lg">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-hero text-hero-foreground ring-1 ring-border">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-bold uppercase text-foreground">{title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground">{desc}</p>
    </div>
  );
}
