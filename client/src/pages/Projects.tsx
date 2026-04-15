import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@shared/schema";
import { apiUrl } from "@/lib/api";

type Category = "All" | "Construction" | "Fabrication" | "Mechanical";

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(apiUrl("/api/projects"));
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<Category>("All");

  useEffect(() => {
    // let cancelled = false;
    // fetchProjects()
    //   .then((data) => {
    //     if (!cancelled) setProjects(data);
    //   })
    //   .catch(() => {
    //     if (!cancelled) setProjects([]);
    //   });
    // return () => {
    //   cancelled = true;
    // };
    
  }, []);

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Full-bleed under fixed navbar (same pattern as Home / Services) */}
      <section className="bg-slate-900 text-white mb-12 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center pt-20 pb-16">
          <h1 className="text-4xl font-bold uppercase mb-2">Our Portfolio</h1>
          <p className="text-slate-400">Showcasing excellence in engineering and construction.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["All", "Construction", "Fabrication", "Mechanical"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as Category)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                filter === cat
                  ? "bg-primary text-white shadow-lg shadow-orange-500/30 transform scale-105"
                  : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <div className="absolute top-4 left-4 z-10 bg-slate-900/90 text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider">
                    {project.category}
                  </div>
                  <div className={`absolute top-4 right-4 z-10 text-xs font-bold px-3 py-1 rounded uppercase tracking-wider ${
                    project.status === 'Completed' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white animate-pulse'
                  }`}>
                    {project.status}
                  </div>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors z-0" />
                  <img 
                    src={project.image} 
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
