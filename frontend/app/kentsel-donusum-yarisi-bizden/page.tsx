import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo.config";
import KentselDonusumClient from "./KentselDonusumClient";

export const metadata: Metadata = createMetadata({
  title: "Kentsel Dönüşüm Yarısı Bizden Kampanyası",
  description:
    "T.C. Çevre, Şehircilik ve İklim Değişikliği Bakanlığı Yarısı Bizden kampanyası ile evinizi Gülmetay İnşaat güvencesiyle yenileyin. 875 Bin TL Hibe, 875 Bin TL Kredi ve 125 Bin TL Taşınma Desteği ile toplam 1.875.000 TL finansman imkanı.",
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
