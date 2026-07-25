import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function NotFound() {
  usePageMeta({
    title: "Page Not Found",
    description: "The page you requested could not be found on Baidya Engineering Works.",
    path: "/",
  });

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-muted px-4">
      <div className="max-w-md text-center">
        <AlertCircle className="mx-auto mb-4 h-12 w-12 text-primary" aria-hidden />
        <h1 className="mb-3 text-3xl font-bold uppercase text-foreground">Page not found</h1>
        <p className="mb-8 text-muted-foreground">
          This page does not exist or may have moved. Return home or browse our services and
          projects.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link href="/">
            <span className="inline-flex cursor-pointer items-center bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back home
            </span>
          </Link>
          <Link href="/contact">
            <span className="inline-flex cursor-pointer text-sm font-semibold uppercase tracking-wider text-primary hover:underline">
              Contact us
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
