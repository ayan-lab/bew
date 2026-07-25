import { Link } from "wouter";
import { ArrowRight, Clock } from "lucide-react";
import { INSIGHTS } from "@/data/insights";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";

export default function Insights() {
  usePageMeta({
    title: "Industrial Insights & Guides",
    description:
      "Practical guides from Baidya Engineering Works on PEB buildings, plant maintenance, pipeline fabrication, and industrial utilities for West Bengal industry.",
    path: "/insights",
  });

  return (
    <div className="min-h-screen bg-muted">
      <section className="mb-12 overflow-hidden bg-hero text-hero-foreground">
        <div className="container mx-auto px-4 py-16 text-center md:px-8">
          <Reveal y={24}>
            <h1 className="mb-4 text-4xl font-bold uppercase">Insights</h1>
            <p className="mx-auto max-w-2xl text-lg text-hero-foreground/65">
              Practical guides for plant owners and project managers — PEB, maintenance,
              pipelines, and utilities — written from two decades of West Bengal site work.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-24">
        <Reveal staggerChildren className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {INSIGHTS.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`}>
              <article className="group flex h-full cursor-pointer flex-col overflow-hidden border border-border bg-card shadow-sm transition-shadow hover:shadow-xl">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 bg-hero/85 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-hero-foreground">
                    {article.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" aria-hidden />
                    {article.readMinutes} min read
                    <span aria-hidden>·</span>
                    <time dateTime={article.publishedAt}>
                      {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="mb-3 text-xl font-bold uppercase leading-snug text-foreground transition-colors group-hover:text-primary">
                    {article.title}
                  </h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {article.description}
                  </p>
                  <span className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary">
                    Read article <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
