import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

type Category = "All" | "Construction" | "Fabrication" | "Mechanical";

const projects = [
  {
    id: 1,
    title: "Steel Warehouse Complex",
    category: "Construction",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
    status: "Completed"
  },
  {
    id: 2,
    title: "Heavy Machinery Assembly",
    category: "Mechanical",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000",
    status: "In Progress"
  },
  {
    id: 3,
    title: "Pipeline Infrastructure",
    category: "Fabrication",
    image: "https://images.unsplash.com/photo-1542013936693-884638332954?auto=format&fit=crop&q=80&w=1000",
    status: "Completed"
  },
  {
    id: 4,
    title: "Industrial Plant Extension",
    category: "Construction",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000",
    status: "Completed"
  },
  {
    id: 5,
    title: "Turbine Maintenance",
    category: "Mechanical",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    status: "In Progress"
  },
  {
    id: 6,
    title: "Custom Steel Beams",
    category: "Fabrication",
    image: "https://images.unsplash.com/photo-1535136894562-55025d57d598?auto=format&fit=crop&q=80&w=1000",
    status: "Completed"
  }
];

export default function Projects() {
  const [filter, setFilter] = useState<Category>("All");

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      <div className="bg-slate-900 py-16 text-white mb-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold uppercase mb-2">Our Portfolio</h1>
          <p className="text-slate-400">Showcasing excellence in engineering and construction.</p>
        </div>
      </div>

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
