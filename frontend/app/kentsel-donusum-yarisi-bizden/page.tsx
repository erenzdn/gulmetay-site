import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import KentselDonusumClient from "./KentselDonusumClient";

export const metadata: Metadata = createMetadata({
  title: "Kentsel Dönüşüm Yarısı Bizden Kampanyası",
  description:
    "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Yarısı Bizden kampanyası ile evinizi Gülmetay İnşaat güvencesiyle yenileyin. 700 Bin TL Hibe, 700 Bin TL Kredi ve 100 Bin TL Taşınma Desteği.",
  openGraph: {
    url: "/kentsel-donusum-yarisi-bizden",
  },
  alternates: {
    canonical: "/kentsel-donusum-yarisi-bizden",
  },
});

export default function KentselDonusumPage() {
  return <KentselDonusumClient />;
}
