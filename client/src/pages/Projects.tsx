import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Project } from "@/types/api";
import { apiUrl } from "@/lib/api";
import { Link } from "wouter";


async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(apiUrl("/api/projects"));
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    let cancelled = false;
    fetchProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch(() => {
        if (!cancelled) setProjects([]);
      });
    return () => {
      cancelled = true;
    };
    
  }, []);


  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Full-bleed under fixed navbar (same pattern as Home / Services) */}
      <section className="bg-zinc-950 text-white mb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center pt-20 pb-16">
          <h1 className="text-4xl font-bold uppercase mb-2">Our Portfolio</h1>
          <p className="text-slate-400">Showcasing excellence in engineering and construction.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <motion.p
          className="mb-8 flex items-center justify-center gap-2 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/50" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <motion.span
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          > We are building this website and more projects to be updated soon…
          </motion.span>
        </motion.p>

        {/* Gallery Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
            >
              <Link href={`/projects/${project.id}`}>
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-0" />
                  <img 
                    src={project.image[0]} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-6 border-b-4 border-transparent group-hover:border-primary transition-colors">
                  <h3 className="text-xl font-bold text-slate-900 uppercase mb-2">{project.title}</h3>
                  <p className="text-slate-500 text-sm">
                    Precision executed project delivering high-quality results on time and within budget.
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
