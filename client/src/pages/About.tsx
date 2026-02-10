import { Shield, Target, Users, Award } from "lucide-react";

export default function About() {
  return (
    <div className="pt-20">
      <div className="relative py-24 bg-slate-900 text-white overflow-hidden">
        {/* Abstract background */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-primary/5 -skew-x-12" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold uppercase mb-6 leading-tight">
              Building Trust Through <span className="text-primary">Excellence</span>
            </h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Baidya Engineering Works has been a cornerstone of industrial progress since 2005. We combine traditional craftsmanship with modern engineering solutions.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            {/* Team/Office Image */}
            <div className="relative">
              <div className="absolute -inset-4 bg-primary/20 rounded-lg -z-10 translate-x-4 translate-y-4" />
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Engineering Team" 
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold uppercase text-slate-900 mb-6">Our Story</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              Founded with a vision to provide superior engineering services, Baidya Engineering Works has grown from a small fabrication shop to a full-service industrial solutions provider.
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
      </div>
    </div>
  );
}

function ValueCard({ icon, title, desc }: any) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-100 text-center hover:shadow-lg transition-shadow">
      <div className="w-16 h-16 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold uppercase mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
