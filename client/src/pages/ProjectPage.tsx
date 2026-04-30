import type { Project, Review, User } from "@shared/schema";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { apiUrl } from "@/lib/api";
import { ArrowUpRight, MapPin, Star } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";



async function fetchProject(id: string): Promise<Project> {
  const response = await fetch(apiUrl(`/api/projects/${id}`));
  if (!response.ok) {
    throw new Error("Failed to fetch project");
  }
  return response.json();
}

type ReviewWithUser = Review & {
  user: Pick<User, "id" | "firstName" | "lastName" | "profilePicture">;
};

async function fetchReviews(projectId: string): Promise<ReviewWithUser[]> {
  const response = await fetch(apiUrl(`/api/reviews/${projectId}`));
  if (!response.ok) {
    throw new Error("Failed to fetch reviews");
  }
  return response.json();
}

export default function ProjectPage() {
  const [, params] = useRoute("/projects/:id");
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [reviews, setReviews] = useState<ReviewWithUser[]>([]);


  useEffect(() => {
    if (!params?.id) {
      setIsLoading(false);
      setProject(null);
      setReviews([]);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    fetchProject(params.id)
      .then((data) => {
        if (!cancelled) {
          setProject(data);
          setActiveImageIndex(0);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setProject(null);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });
    

    fetchReviews((params.id))
    .then((data)=>{
        if(!cancelled){
            setReviews(data);
        }
    })
    .catch(()=>{
        if(!cancelled){
            setReviews([]);
        }
    })

    return () => {
      cancelled = true;
    };
  }, [params?.id]);

  if (isLoading) {
    return <div className="container mx-auto px-4 py-24">Loading project...</div>;
  }

  if (!project) {
    return <div className="container mx-auto px-4 py-24">Project not found.</div>;
  }

  return (
    <>
      {/* HERO SECTION */}
      <div className="overflow-hidden">
        <section className="relative h-[52vh] min-h-[300px] flex items-end justify-center pb-20">
          <div className="absolute inset-0 z-0">
            <img src={project.image[0]} alt={project.title} className="w-full h-full object-cover" />
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
                {project.title}
              </h1>
            </motion.div>
          </div>
        </section>
        {/* path */}
        <div className="border-y border-slate-200 bg-slate-100 text-black">
          <div className="container mx-auto px-4 py-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/projects">Projects</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{project.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* PROJECT DETAILS */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14 items-start"
            >
              {/* image gallery */}
              <div>
                <div className="overflow-hidden border border-slate-200 shadow-lg">
                  <img
                    src={project.image[activeImageIndex] ?? project.image[0]}
                    alt={project.title}
                    className="w-full h-[280px] md:h-[340px] lg:h-[390px] object-cover"
                  />
                </div>
                {project.image.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 md:grid-cols-5 gap-3">
                    {project.image.map((image, index) => {
                      const isActive = index === activeImageIndex;
                      return (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveImageIndex(index)}
                          className={`overflow-hidden border transition ${
                            isActive
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-slate-200 hover:border-slate-400"
                          }`}
                          aria-label={`Show image ${index + 1}`}
                        >
                          <img
                            src={image}
                            alt={`${project.title} thumbnail ${index + 1}`}
                            className="w-full h-16 object-cover"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* project details */}
              <div className="bg-white border border-slate-200 p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-slate-900 uppercase leading-tight">
                  {project.title}
                </h2>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1.5 text-xs font-semibold tracking-widest text-slate-700 uppercase">
                    <ArrowUpRight className="mr-1.5 h-3.5 w-3.5" />
                    {project.category}
                  </span>
                  <span className="inline-flex items-center text-sm text-slate-600">
                    <MapPin className="mr-1.5 h-4 w-4 text-red-500" />
                    {project.location}
                  </span>
                </div>

                <div className="mt-6 space-y-4 text-slate-700">
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-slate-900">Client :</span> {project.client}
                  </p>
                  <p className="text-sm leading-relaxed">
                    <span className="font-semibold text-slate-900">Scope :</span> {project.description}
                  </p>
                  <p className="text-sm leading-relaxed font-semibold text-slate-900">
                    Project Status: {project.status}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* reviews section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <button className="bg-slate-100 text-black px-4 py-2 rounded-lg" >
                <Link href={`/review/create_review/${project.id}`}>
                  <h4 className="text-2xl font-bold mb-4 text-slate-900 uppercase flex items-center gap-2">
                    Share Your Experience
                  </h4>
                </Link>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) =>{
                    return (    
                        <div key={review.id} className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={review.user.profilePicture ?? undefined} />
                                    <AvatarFallback>
                                    {`${review.user.firstName.charAt(0)}${review.user.lastName.charAt(0)}`}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <h3 className="text-base font-semibold text-slate-900 uppercase">{review.user.firstName} {review.user.lastName}</h3>
                                    <div className="mt-1 flex items-center gap-1" aria-label={`Rating: ${review.rating} out of 5`}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star
                                        key={i}
                                        className={`h-4 w-4 ${
                                            i < review.rating
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-slate-300"
                                        }`}
                                        />
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600 italic">{review.comment}</p>
                        </div>
                    )
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}