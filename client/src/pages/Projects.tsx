import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin } from "lucide-react";
import { usePageMeta } from "@/hooks/use-page-meta";
import { useProjects } from "@/hooks/use-projects";

const COLUMNS = 3;

/** How many “Updating soon” cells to fill the last incomplete row (at least one row if empty). */
function comingSoonCount(projectCount: number) {
  if (projectCount === 0) return COLUMNS;
  const rem = projectCount % COLUMNS;
  return rem === 0 ? 0 : COLUMNS - rem;
}

export default function Projects() {
  usePageMeta({
    title: "Projects Portfolio",
    description:
      "Explore industrial projects by Baidya Engineering Works — PEB, pipeline, utility, and maintenance work across West Bengal.",
    path: "/projects",
  });

  const { data: projects = [], isLoading } = useProjects();
  const placeholders = comingSoonCount(projects.length);

  return (
    <div className="min-h-screen bg-muted">
      <section className="mb-12 overflow-hidden bg-hero text-hero-foreground">
        <div className="container mx-auto px-4 py-16 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-bold uppercase">Our Portfolio</h1>
          <p className="mx-auto max-w-2xl text-lg text-hero-foreground/65">
            Selected industrial projects — fabrication, erection, utilities, and plant works
            delivered for clients across West Bengal.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        {isLoading ? (
          <p className="py-16 text-center text-sm text-muted-foreground">Loading projects…</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link href={`/projects/${project.id}`} className="group block outline-none">
                  <article className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-card shadow-sm transition-shadow duration-500 ease-out group-hover:shadow-2xl group-hover:shadow-black/40">
                    <img
                      src={project.image[0]}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dark veil: always on mobile, hover-only on md+ */}
                    <div
                      className="absolute inset-0 z-[1] bg-black/55 transition-colors duration-500 ease-out md:bg-black/0 md:group-hover:bg-black/55"
                      aria-hidden
                    />

                    {/* Title + location: always visible on mobile, hover-only on md+ */}
                    <div className="absolute inset-x-0 bottom-0 z-[2] translate-y-0 p-5 !opacity-100 transition-all duration-500 ease-out md:translate-y-3 md:!opacity-0 md:group-hover:translate-y-0 md:group-hover:!opacity-100">
                      <h2 className="!text-white text-lg font-bold uppercase leading-snug drop-shadow-md md:text-xl">
                        {project.title}
                      </h2>
                      {project.location ? (
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide !text-white/90 drop-shadow">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                          {project.location}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}

            {Array.from({ length: placeholders }, (_, i) => (
              <motion.div
                key={`coming-soon-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: (projects.length + i) * 0.06 }}
              >
                <div
                  className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-dashed border-border bg-muted"
                  aria-label="Updating soon"
                >
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(135deg, transparent, transparent 12px, hsl(var(--foreground) / 0.08) 12px, hsl(var(--foreground) / 0.08) 24px)",
                    }}
                    aria-hidden
                  />
                  <span className="relative z-10 text-sm font-bold uppercase tracking-[0.2em] text-foreground/70">
                    Updating soon
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
