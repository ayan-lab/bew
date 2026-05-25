import { Shield, Target, Users, Award } from "lucide-react";
import { useState, useEffect } from "react";
import { apiUrl } from "@/lib/api";
import { type Client } from "@/types/api";

export default function About() {
  const [clients, setClients] = useState<Client[]>([]);

  async function fetchClients(): Promise<Client[]> {
    const response = await fetch(apiUrl("/api/clients"));
    if (!response.ok) {
      throw new Error("Failed to fetch clients");
    }
    return response.json();
  }
  useEffect(() => {
    fetchClients().then(setClients);
  }, []);

  return (
    <div>
      <section className="bg-zinc-950 text-white mb-12 overflow-hidden">
        <div className="container mx-auto px-4 text-center py-16">
          <h1 className="text-4xl font-bold uppercase mb-2">
            Building Trust Through <span className="text-primary">Excellence</span>
          </h1>
          <p className="text-slate-400">
            Baidya Engineering Works has been a cornerstone of industrial progress since 2005. We combine traditional craftsmanship with modern engineering solutions.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            {/* Team/Office Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-lg -z-10 translate-x-4 translate-y-4" />
              <img
                src="https://images.pexels.com/photos/149387/pexels-photo-149387.jpeg"
                alt="Engineering Team"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold uppercase text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded with a vision to provide superior engineering services, Baidya Engineering Works has grown from a small workshop to a full-service industrial solutions provider.
            </p>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Our journey is marked by a relentless pursuit of quality. We believe that every weld, every beam, and every bolt contributes to the safety and longevity of the structures we build.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-slate-50 rounded border border-slate-100">
                <div className="text-4xl font-bold text-primary mb-2">18+</div>
                <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Years Experience</div>
              </div>
              <div className="text-center p-6 bg-slate-50 rounded border border-slate-100">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-16 border-zinc-800" />
        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold uppercase text-slate-900 mb-12 text-center">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={<Shield className="w-8 h-8" />}
              title="Safety"
              desc="We prioritize the safety of our team and clients above all else."
            />
            <ValueCard
              icon={<Target className="w-8 h-8" />}
              title="Precision"
              desc="Accuracy is not just a goal; it's our standard operating procedure."
            />
            <ValueCard
              icon={<Users className="w-8 h-8" />}
              title="Integrity"
              desc="We build honest relationships through transparent business practices."
            />
            <ValueCard
              icon={<Award className="w-8 h-8" />}
              title="Quality"
              desc="Delivering superior results that stand the test of time."
            />
          </div>
        </div>
        <hr className="my-16 border-zinc-800" />



        {/* our clien	ts */}
        <div className="mb-16 overflow-hidden">
          <h2 className="text-3xl font-bold uppercase text-slate-900 mb-12 text-center">
            We worked with
          </h2>

          {/* Wrapper to hide overflow */}
          <div className="relative flex overflow-hidden group">
            {/* The Animated Track */}
            <div className="flex w-max animate-scroll will-change-transform">
              {/* Render logos twice for seamless looping */}
              {[...clients, ...clients].map((client, index) => (
                <div
                  key={`${client.id}-${index}`}
                  className="flex-shrink-0 w-64 h-40 mx-4 bg-white p-8 rounded-lg shadow-sm border border-slate-100 flex items-center justify-center hover:shadow-lg transition-shadow"
                >
                  <img
                    src={client.image}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-zinc-950 text-white rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-zinc-800">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}


