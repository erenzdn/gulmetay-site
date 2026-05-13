import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import HomeClient from "./HomeClient";

export const metadata: Metadata = createMetadata({
  title: "Ana Sayfa",
  description:
    "Gülmetay İnşaat — 1994'ten beri endüstriyel yapı, iskele sistemleri ve mühendislik çözümleri. İstanbul merkezli güvenilir inşaat firması.",
  openGraph: {
    url: "/",
  },
  alternates: {
    canonical: "/",
  },
});

export default function HomePage() {
  return <HomeClient />;
}
