import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import HizmetlerClient from "./HizmetlerClient";

export const metadata: Metadata = createMetadata({
  title: "Hizmetlerimiz",
  description:
    "İnşaat & taahhüt, mimari tasarım, kentsel dönüşüm ve proje yönetimi — Gülmetay İnşaat'ın kapsamlı hizmetleri.",
  keywords: [
    "Gülmetay İnşaat hizmetleri",
    "inşaat taahhüt",
    "mimari tasarım",
    "kentsel dönüşüm",
    "proje yönetimi",
  ],
  openGraph: {
    url: "/hizmetlerimiz",
  },
  alternates: {
    canonical: "/hizmetlerimiz",
  },
});

export default function HizmetlerPage() {
  return <HizmetlerClient />;
}
