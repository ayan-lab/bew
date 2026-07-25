/** LocalBusiness structured data for Google rich results / local SEO. */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://baidyaengineeringworks.com/#business",
    name: "Baidya Engineering Works",
    description:
      "Industrial engineering contractors in West Bengal since 2005 — utility systems, plant maintenance, PEB works, pipeline fabrication & erection, and steel fabrication.",
    url: typeof window !== "undefined" ? window.location.origin : undefined,
    telephone: "+919874751736",
    email: "baidyaengineering@gmail.com",
    foundingDate: "2005",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Chikrand",
      addressLocality: "Chikrand",
      addressRegion: "West Bengal",
      postalCode: "712304",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.7193,
      longitude: 88.258,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "West Bengal, India",
    },
    priceRange: "$$",
    knowsAbout: [
      "Industrial utility engineering",
      "Plant maintenance",
      "Pre-engineered buildings",
      "Pipeline fabrication and erection",
      "Steel fabrication",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
