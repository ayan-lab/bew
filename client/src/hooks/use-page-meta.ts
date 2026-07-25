import { useEffect } from "react";

const SITE_NAME = "Baidya Engineering Works";
const DEFAULT_DESCRIPTION =
  "Baidya Engineering Works — industrial engineering contractors in West Bengal since 2005. Factory utility systems, plant maintenance, PEB works, pipeline fabrication, and steel fabrication for heavy industry.";

type PageMeta = {
  title: string;
  description?: string;
  path?: string;
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** Sets document title + description (and basic OG tags) per route. */
export function usePageMeta({ title, description = DEFAULT_DESCRIPTION, path = "/" }: PageMeta) {
  useEffect(() => {
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    document.title = fullTitle;

    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", description);

    const origin = typeof window !== "undefined" ? window.location.origin : "";
    if (origin) {
      upsertMeta("property", "og:url", `${origin}${path}`);
      upsertLink("canonical", `${origin}${path}`);
    }
  }, [title, description, path]);
}
