import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { getInsight, INSIGHTS } from "@/data/insights";
import { usePageMeta } from "@/hooks/use-page-meta";
import { Reveal } from "@/components/Reveal";
import { useEffect } from "react";
import { ensureGsap, prefersReducedMotion } from "@/lib/gsap";

function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  image: string;
}) {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: {
      "@type": "Organization",
      name: "Baidya Engineering Works",
    },
    publisher: {
      "@type": "Organization",
      name: "Baidya Engineering Works",
    },
    mainEntityOfPage: origin ? `${origin}/insights/${slug}` : undefined,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default function InsightArticle() {
  const [, params] = useRoute("/insights/:slug");
  const article = params?.slug ? getInsight(params.slug) : undefined;

  usePageMeta({
    title: article?.title ?? "Insight",
    description:
      article?.description ??
      "Industrial engineering insights from Baidya Engineering Works.",
    path: article ? `/insights/${article.slug}` : "/insights",
  });

  useEffect(() => {
    if (!article || prefersReducedMotion()) return;
    const { gsap } = ensureGsap();
    const ctx = gsap.context(() => {
      gsap.from(".insight-hero-content > *", {
        opacity: 0,
        y: 28,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
      });
    });
    return () => ctx.revert();
  }, [article]);

  if (!article) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-bold uppercase">Article not found</h1>
        <Link href="/insights" className="text-primary hover:underline">
          Back to insights
        </Link>
      </div>
    );
  }

  const related = INSIGHTS.filter((a) => a.slug !== article.slug).slice(0, 2);

  return (
    <article className="bg-card">
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        slug={article.slug}
        publishedAt={article.publishedAt}
        image={article.heroImage}
      />

      <header className="relative overflow-hidden bg-hero text-hero-foreground">
        <div className="absolute inset-0">
          <img
            src={article.heroImage}
            alt=""
            className="h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/50" />
        </div>
        <div className="insight-hero-content container relative z-10 mx-auto max-w-3xl px-4 py-20 md:px-8">
          <Link
            href="/insights"
            className="mb-6 inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary hover:text-hero-foreground"
          >
            <ArrowLeft className="mr-2 h-3.5 w-3.5" /> All insights
          </Link>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {article.category}
          </p>
          <h1 className="mb-4 text-3xl font-bold uppercase leading-tight md:text-4xl">
            {article.title}
          </h1>
          <p className="mb-6 text-lg text-hero-foreground/70">{article.description}</p>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {article.readMinutes} min read
            </span>
            <span aria-hidden>·</span>
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-3xl px-4 py-16 md:px-8">
        {article.sections.map((section, i) => (
          <Reveal key={section.heading} delay={i * 0.05} className="mb-12">
            <h2 className="mb-4 text-2xl font-bold uppercase text-foreground">
              {section.heading}
            </h2>
            {section.paragraphs.map((p) => (
              <p key={p.slice(0, 40)} className="mb-4 text-base leading-relaxed text-muted-foreground">
                {p}
              </p>
            ))}
          </Reveal>
        ))}

        <Reveal className="mt-8 border border-border bg-muted p-8">
          <h2 className="mb-3 text-xl font-bold uppercase text-foreground">
            Need help on a live project?
          </h2>
          <p className="mb-6 text-muted-foreground">
            Baidya Engineering Works supports industrial scopes across West Bengal — from PEB
            and utilities to pipelines and plant maintenance.
          </p>
          <Link href="/contact">
            <span className="inline-flex cursor-pointer items-center bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
              Request a consultation <ArrowRight className="ml-2 h-4 w-4" />
            </span>
          </Link>
        </Reveal>

        {related.length > 0 && (
          <div className="mt-16 border-t border-border pt-12">
            <h2 className="mb-6 text-xl font-bold uppercase text-foreground">Related reading</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} href={`/insights/${r.slug}`}>
                  <span className="block cursor-pointer border border-border p-5 transition-colors hover:border-primary/40 hover:bg-muted">
                    <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-primary">
                      {r.category}
                    </span>
                    <span className="text-sm font-bold uppercase text-foreground">{r.title}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
