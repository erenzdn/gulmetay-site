import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_NAME, SITE_URL } from "@/lib/seo.config";
import {
  SERVICES,
  getServiceBySlug,
  getAllServiceSlugs,
} from "@/lib/services";
import JsonLd from "@/components/JsonLd";
import HizmetDetailClient from "./HizmetDetailClient";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: `Hizmet Bulunamadı | ${SITE_NAME}`,
    };
  }

  return {
    title: `${service.title} | ${SITE_NAME}`,
    description: service.shortDescription,
    keywords: service.keywords,
    openGraph: {
      title: `${service.title} | ${SITE_NAME}`,
      description: service.shortDescription,
      url: `/hizmetlerimiz/${slug}`,
      type: "website",
    },
    alternates: {
      canonical: `/hizmetlerimiz/${slug}`,
    },
  };
}

export default async function HizmetDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/hizmetlerimiz/${slug}`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: "TR",
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <HizmetDetailClient service={service} allServices={SERVICES} />
    </>
  );
}
