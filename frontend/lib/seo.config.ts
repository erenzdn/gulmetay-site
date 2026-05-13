import type { Metadata } from "next";

export const SITE_NAME = "Gülmetay İnşaat";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://gulmetay.com.tr";
export const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "";

export const SITE_DESCRIPTION =
  "1994'ten beri endüstriyel yapı, iskele sistemleri ve mühendislik çözümleri sunan Gülmetay İnşaat. İstanbul merkezli güvenilir inşaat firması.";

export const DEFAULT_KEYWORDS = [
  "Gülmetay İnşaat",
  "endüstriyel yapı",
  "iskele sistemleri",
  "mühendislik çözümleri",
  "inşaat firması",
  "İstanbul inşaat",
  "konut projeleri",
  "yapı mühendisliği",
  "kentsel dönüşüm",
  "anahtar teslim inşaat",
];

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gülmetay İnşaat",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.svg`,
  foundingDate: "1994",
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "Bahçeşehir 2. Kısım Mah. 12. Cadde, Cihan Doğa Sitesi, Villa No: 8/A",
    addressLocality: "Başakşehir",
    addressRegion: "İstanbul",
    addressCountry: "TR",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+90-212-418-09-09",
      contactType: "customer service",
      availableLanguage: "Turkish",
    },
    {
      "@type": "ContactPoint",
      telephone: "+90-535-819-77-64",
      contactType: "customer service",
      availableLanguage: "Turkish",
    },
  ],
  email: "bilgi@gulmetay.com.tr",
  sameAs: [],
};

export function createMetadata(overrides: Metadata): Metadata {
  const title = overrides.title
    ? `${overrides.title} | ${SITE_NAME}`
    : SITE_NAME;
  const description =
    (overrides.description as string) || SITE_DESCRIPTION;

  return {
    title,
    description,
    keywords: overrides.keywords ?? DEFAULT_KEYWORDS,
    authors: [{ name: SITE_NAME }],
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630 }],
      ...overrides.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
      ...overrides.twitter,
    },
    ...overrides,
  };
}
