import "./globals.css"; // Eğer globals.css dosyan yoksa bu satırı silebilirsin.
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Gülmetay İnşaat",
  description: "Modern inşaat ve konut projeleri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        
        {/* Üst Menü */}
        <Navbar />

        {/* Sayfa İçerikleri */}
        <main style={{ minHeight: "80vh" }}>
          {children}
        </main>

        {/* Alt Bilgi */}
        <Footer />
        
      </body>
    </html>
  );
}