import { motion } from "framer-motion";
import { ArrowRight, Wrench, Hammer, Factory, Settings, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";
import Typed from "typed.js";

// Components
import { Button } from "@/components/ui/button";



const texts = {
  "Precision Engineering": "Accuracy in every detail, excellence in every build.",
  "Robust Solutions": "Engineering durability that stands the test of time.",
  "Building tomorrow's industrial infrastructure": "Forging the future through expert craftsmanship and innovative engineering.",
  "Innovation at Scale": "Deploying cutting-edge technology to solve complex industrial challenges.",
  "Strategic Partnership": "Your trusted ally in navigating large-scale mechanical projects."
}



export default function Home() {

  const el = useRef(null);
  const [subText, setSubText] = useState(texts["Precision Engineering"]);


  useEffect(()=>{
    const keys = Object.keys(texts)
    const typed = new Typed(el.current,{
      strings: keys,
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      preStringTyped: (arrayPos: number) => {
        setSubText(texts[keys[arrayPos] as keyof typeof texts]);
      },
    });
    return () => {
      typed.destroy();
    }
  }, []);


  return (
    <div className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-[82vh] min-h-[400px] flex items-end justify-center pb-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070"
            className="w-full h-full object-cover"
          >
            <source
              src="https://res.cloudinary.com/dqhnt5mus/video/upload/q_auto:best,f_auto,w_1280/v1777366937/download_lckhyt.mp4"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
        </div>

        <div className="container relative z-10 px-6 pt-32 md:pt-44">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-5xl font-bold text-white mb-6 leading-tight uppercase font-display">
              <span className="text-transparent text-white" ref={el} />
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-xl font-light leading-relaxed">
              {subText}
            </p>

          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
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
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-800/50 skew-x-12 translate-x-32" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                {/* industrial structure image */}
                <img
                  src="https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=1000"
                  alt="Industrial structure"
                  className="rounded-lg shadow-2xl translate-y-8"
                />
                {/* engineer blueprint image */}
                <img
                  src="https://pixabay.com/get/g6209c8c541bb4c570a903741e5f44a2daa69489e2c11f1328cfc9348a3fa54bde52805cf60bb6c72ac51d783850ca163b33377782ad546e8f77179e6c0403dc5_1280.jpg"
                  alt="Engineering blueprints"
                  className="rounded-lg shadow-2xl translate-y-12 lg:translate-y-0"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold mb-6 uppercase">Why Choose Baidya?</h2>
              <div className="w-20 h-1 bg-primary-gradient mb-8" />

              <div className="space-y-8">
                {[
                  { title: "Safety First", text: "Zero-compromise approach to workplace safety and compliance." },
                  { title: "Precision Engineering", text: "State-of-the-art equipment ensuring micron-level accuracy." },
                  { title: "Timely Delivery", text: "Rigorous project management to meet strict industrial deadlines." },
                  { title: "Expert Team", text: "Certified engineers and welders with decades of combined experience." }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start group">
                    <div className="bg-slate-800 p-2 rounded mr-4 group-hover:bg-primary-gradient transition-[background-image] duration-200">
                      <CheckCircle2 className="w-6 h-6 text-primary group-hover:text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-primary-gradient relative">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 uppercase font-display">Ready to start your project?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">Get in touch with our engineering team for a comprehensive consultation and quote.</p>
          <Link href="/contact">
            <button className="bg-white text-primary hover:bg-slate-100 px-10 py-4 rounded-sm font-bold uppercase tracking-widest shadow-lg hover:scale-105 transition-transform text-lg">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-100 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group cursor-pointer hover:-translate-y-1">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-primary mb-6 group-hover:bg-primary-gradient group-hover:text-white transition-[background-image,color] duration-200">
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
