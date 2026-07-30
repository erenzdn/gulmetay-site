export type ServiceIconName =
  | "HardHat"
  | "PenTool"
  | "Building"
  | "BriefcaseBusiness";

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  heroTagline: string;
  intro: string;
  highlights: string[];
  features: ServiceFeature[];
  process: { step: string; title: string; description: string }[];
  iconName: ServiceIconName;
  keywords: string[];
  stats: string[];
  faqs: { question: string; answer: string }[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: "insaat-taahhut",
    number: "01",
    title: "İnşaat & Taahhüt",
    shortDescription:
      "Anahtar teslim projeler ve profesyonel inşaat hizmetleri ile hayalinizdeki yapıları inşa ediyoruz.",
    heroTagline: "Sağlam yapılar, zamanında teslim",
    intro:
      "Gülmetay İnşaat olarak konut, ticari ve endüstriyel yapılarda anahtar teslim taahhüt hizmeti sunuyoruz. Sahadaki disiplinimiz, malzeme kalitesi ve şantiye yönetimiyle projenizi planlandığı gibi hayata geçiriyoruz.",
    highlights: [
      "Anahtar teslim konut ve ticari yapılar",
      "Endüstriyel tesis ve fabrika inşaatı",
      "Güçlendirme ve renovasyon uygulamaları",
      "İş güvenliği ve kalite standartlarına uyum",
    ],
    features: [
      {
        title: "Anahtar Teslim Uygulama",
        description:
          "Temelden teslimata kadar tüm inşaat süreçlerini tek elden yönetiyor, koordinasyon yükünü sizden alıyoruz.",
      },
      {
        title: "Kaliteli Malzeme & İşçilik",
        description:
          "Onaylı tedarikçiler and deneyimli ekiplerle uzun ömürlü, dayanıklı yapılar üretiyoruz.",
      },
      {
        title: "Şantiye Disiplini",
        description:
          "Günlük saha takibi, iş programı ve güvenlik kontrolleriyle şantiyeyi şeffaf ve düzenli yürütüyoruz.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Keşif & Teklif",
        description:
          "Saha incelemesi, ihtiyaç analizi ve net maliyet/ süre teklifi hazırlanır.",
      },
      {
        step: "02",
        title: "Planlama",
        description:
          "İş programı, malzeme tedariki ve ekip organizasyonu oluşturulur.",
      },
      {
        step: "03",
        title: "Uygulama",
        description:
          "İnşaat aşamaları kalite ve güvenlik kontrolleriyle ilerletilir.",
      },
      {
        step: "04",
        title: "Teslim",
        description:
          "Son kontroller tamamlanır, yapı eksiksiz ve kullanıma hazır teslim edilir.",
      },
    ],
    iconName: "HardHat",
    keywords: [
      "inşaat taahhüt",
      "anahtar teslim inşaat",
      "şantiye yönetimi",
      "Gülmetay İnşaat",
    ],
    stats: [
      "120.000m²+ Tamamlanan Alan",
      "100% Zamanında Teslimat",
      "Sıfır İş Kazası Oranı",
    ],
    faqs: [
      {
        question: "Anahtar teslim inşaat süreci ne kadar sürer?",
        answer:
          "Projenin büyüklüğüne, arsa durumuna ve imar izinlerine bağlı olarak genellikle 8 ila 18 ay arasında değişmektedir. Detaylı iş programı sözleşme öncesinde sizinle paylaşılır.",
      },
      {
        question: "Şantiyede iş güvenliği ve denetimleri nasıl sağlıyorsunuz?",
        answer:
          "Şantiyelerimizde tam zamanlı İSG uzmanları görev yapmaktadır. Ayrıca tüm iş süreçlerimiz bağımsız denetim kuruluşları ve kendi iç denetim ekiplerimizce düzenli olarak kontrol edilir.",
      },
      {
        question: "Malzeme seçimlerini ve kalite kontrolünü nasıl yapıyorsunuz?",
        answer:
          "Yalnızca TSE, CE ve uluslararası standartlara sahip onaylı markalarla çalışıyoruz. Malzemelerin şantiyeye girişinden uygulama sonrasına kadar tüm aşamalarda laboratuvar testleri ve kalite kontrolleri gerçekleştirilir.",
      },
    ],
  },
  {
    slug: "mimari-tasarim",
    number: "02",
    title: "Mimari Tasarım",
    shortDescription:
      "Modern ve estetik mimari çizimler, 3D modelleme ve profesyonel proje danışmanlığı hizmetleri.",
    heroTagline: "Estetik, işlev ve mühendislik bir arada",
    intro:
      "Mimari tasarım sürecinde yaşam alışkanlıklarınızı, arsa koşullarını ve yönetmelikleri birlikte ele alıyoruz. Konseptten uygulama projesine kadar her aşamada net, uygulanabilir ve estetik çözümler üretiyoruz.",
    highlights: [
      "Konsept ve ön proje çalışmaları",
      "Uygulama projeleri ve detay çizimleri",
      "3D modelleme ve görselleştirme",
      "Ruhsat ve mevzuat danışmanlığı",
    ],
    features: [
      {
        title: "Konsept Tasarım",
        description:
          "İhtiyaç programınıza uygun, güçlü bir mimari dil ve mekân kurgusu oluşturuyoruz.",
      },
      {
        title: "3D Modelleme",
        description:
          "Projeyi inşa öncesi üç boyutlu olarak görmenizi sağlayarak karar sürecini netleştiriyoruz.",
      },
      {
        title: "Uygulanabilirlik",
        description:
          "Çizimleri saha gerçekleriyle uyumlu hazırlayarak uygulama aşamasında sürprizleri azaltıyoruz.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Brief & Analiz",
        description:
          "İhtiyaçlar, arsa verileri ve yasal çerçeve birlikte değerlendirilir.",
      },
      {
        step: "02",
        title: "Konsept",
        description:
          "Kütle, cephe ve plan alternatifleri üzerinden tasarım dili belirlenir.",
      },
      {
        step: "03",
        title: "Projelendirme",
        description:
          "Uygulama projeleri, detaylar ve görseller tamamlanır.",
      },
      {
        step: "04",
        title: "Onay & Destek",
        description:
          "Ruhsat süreçlerinde ve uygulama sırasında teknik destek sağlanır.",
      },
    ],
    iconName: "PenTool",
    keywords: [
      "mimari tasarım",
      "3D modelleme",
      "uygulama projesi",
      "mimarlık danışmanlığı",
    ],
    stats: [
      "60+ Özgün Proje",
      "12+ Tasarım Ödülü",
      "100% Gerçekçi 3D Model",
    ],
    faqs: [
      {
        question: "Tasarım süreci nasıl ilerliyor ve adımları nelerdir?",
        answer:
          "Süreç; ihtiyaç analizi (brief), konsept geliştirme, 3D modelleme/görselleştirme, ruhsat projesi hazırlığı ve son olarak detaylı uygulama projelerinin çizimi olmak üzere temel aşamalardan oluşur.",
      },
      {
        question: "3D görselleştirme ve sanal tur hizmeti sunuyor musunuz?",
        answer:
          "Evet, projelerimizi hayata geçmeden önce bilgisayar ortamında gerçeğe en yakın şekilde modelliyoruz. İsteğe bağlı olarak projenin içinde 3D sanal tur deneyimi de hazırlamaktayız.",
      },
      {
        question: "Tasarım aşamasında revizyon hakkımız bulunuyor mu?",
        answer:
          "Konsept aşamasında sizinle tam mutabık kalana kadar makul ölçüde revizyonlar gerçekleştiriyoruz. Uygulama projesine geçildikten sonra ise teknik detay düzenlemelerini yapıyoruz.",
      },
    ],
  },
  {
    slug: "kentsel-donusum",
    number: "03",
    title: "Kentsel Dönüşüm",
    shortDescription:
      "Eski yapıları yenileyerek değer katıyor, güvenli ve modern yaşam alanları oluşturuyoruz.",
    heroTagline: "Güvenli yapılar, değerli yaşam alanları",
    intro:
      "Riskli yapıların yenilenmesinde hak sahipleriyle şeffaf iletişim kuruyor, mevzuata uygun süreç yönetimi ve modern mimariyle hem güvenliği hem yaşam kalitesini yükseltiyoruz.",
    highlights: [
      "Riskli yapı tespiti ve süreç danışmanlığı",
      "Hak sahipleri ile şeffaf iletişim",
      "Modern, depreme dayanıklı yapılar",
      "Değer artışı odaklı planlama",
    ],
    features: [
      {
        title: "Süreç Yönetimi",
        description:
          "Başvurudan yıkım ve yeniden inşaya kadar tüm adımları koordine ediyoruz.",
      },
      {
        title: "Hak Sahipliği Dengesi",
        description:
          "Kat karşılığı ve hak dağılımında adil, anlaşılır çözümler üretiyoruz.",
      },
      {
        title: "Güvenli Yenileme",
        description:
          "Güncel deprem yönetmeliğine uygun, dayanıklı yapılar inşa ediyoruz.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Değerlendirme",
        description:
          "Yapı durumu, arsa potansiyeli ve yasal uygunluk incelenir.",
      },
      {
        step: "02",
        title: "Anlaşma",
        description:
          "Hak sahipleriyle model ve paylaşımlar netleştirilir.",
      },
      {
        step: "03",
        title: "Yıkım & İnşa",
        description:
          "Güvenli yıkım sonrası yeni yapı uygulama programıyla yükseltilir.",
      },
      {
        step: "04",
        title: "Teslim",
        description:
          "Bağımsız bölümler tamamlanır, hak sahiplerine teslim edilir.",
      },
    ],
    iconName: "Building",
    keywords: [
      "kentsel dönüşüm",
      "riskli yapı",
      "kat karşılığı",
      "deprem güçlendirme",
    ],
    stats: [
      "850+ Yenilenen Konut",
      "30+ Yenilenen Blok/Bina",
      "100% Deprem Yönetmeliği Uyumu",
    ],
    faqs: [
      {
        question: "Binamızın riskli olduğunu nasıl tespit edebiliriz?",
        answer:
          "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı lisanslı ortak kuruluşlarımız aracılığıyla binanızdan karot örneği alınarak Deprem Risk Raporu hazırlanır ve süreç resmen başlatılır.",
      },
      {
        question: "Devlet destekleri ve kira yardımı süreçleri nasıl işliyor?",
        answer:
          "Riskli yapı onaylandıktan sonra hak sahiplerine sunulan kira yardımı, taşınma desteği ve kentsel dönüşüm kredisi faiz desteği gibi tüm yasal teşvikler için başvuru danışmanlığını ekibimiz üstlenmektedir.",
      },
      {
        question: "Kat karşılığı anlaşmalarda hak dağılımı nasıl belirlenir?",
        answer:
          "Arsanızın mevcut imar durumu, emsal değeri ve yönetmeliklerin izin verdiği maksimum inşaat alanı hesaplanarak, hak sahipleri arasında adil ve şeffaf bir paylaşım protokolü oluşturulur.",
      },
    ],
  },
  {
    slug: "proje-yonetimi",
    number: "04",
    title: "Proje Yönetimi",
    shortDescription:
      "Baştan sona profesyonel proje takibi, maliyet kontrolü ve zamanında teslim garantisi.",
    heroTagline: "Kontrol, şeffaflık ve zamanında sonuç",
    intro:
      "Proje yönetiminde bütçe, süre ve kalite üçgenini dengede tutuyoruz. Paydaşlar arası koordinasyonu güçlendirerek riskleri erken görüyor, raporlama ile süreci sizin için görünür kılıyoruz.",
    highlights: [
      "İş programı ve kritik yol yönetimi",
      "Maliyet kontrolü ve bütçe takibi",
      "Tedarikçi ve alt yüklenici koordinasyonu",
      "Düzenli ilerleme raporlaması",
    ],
    features: [
      {
        title: "Maliyet Kontrolü",
        description:
          "Bütçe sapmalarını erken yakalayıp alternatiflerle süreci dengede tutuyoruz.",
      },
      {
        title: "Zaman Yönetimi",
        description:
          "Gerçekçi iş programları ve saha takibiyle teslim tarihlerini koruyoruz.",
      },
      {
        title: "Şeffaf Raporlama",
        description:
          "İlerleme, risk ve karar noktalarını düzenli olarak sizinle paylaşıyoruz.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Kapsam Tanımı",
        description:
          "Hedefler, kısıtlar ve başarı kriterleri birlikte belirlenir.",
      },
      {
        step: "02",
        title: "Plan & Kaynak",
        description:
          "Takvim, bütçe ve kaynak dağılımı oluşturulur.",
      },
      {
        step: "03",
        title: "İzleme",
        description:
          "Saha ve ofis verileriyle ilerleme sürekli kontrol edilir.",
      },
      {
        step: "04",
        title: "Kapanış",
        description:
          "Teslim, evrak ve değerlendirme süreçleriyle proje tamamlanır.",
      },
    ],
    iconName: "BriefcaseBusiness",
    keywords: [
      "proje yönetimi",
      "maliyet kontrolü",
      "iş programı",
      "inşaat proje takibi",
    ],
    stats: [
      "40+ Yönetilen Proje",
      "15% Bütçe Optimizasyonu",
      "100% Şeffaf Raporlama",
    ],
    faqs: [
      {
        question: "Proje yönetimi hizmeti bize ne tür bir tasarruf sağlar?",
        answer:
          "Doğru planlama, etkin malzeme tedariki ve doğru taşeron seçimi sayesinde projelerde ortalama %15 ila %20 arasında bütçe tasarrufu ve zaman sapmalarının önüne geçilmesini sağlıyoruz.",
      },
      {
        question: "Proje ilerlemesini nasıl takip edebiliyoruz?",
        answer:
          "Haftalık ve aylık periyotlarda hazırladığımız detaylı faaliyet raporları, bütçe-maliyet analizleri ve iş programı güncellemeleriyle sürecin her anını şeffafça izleyebilirsiniz.",
      },
      {
        question: "Zamanında teslim edilmeyen işler için ne gibi önlemleriniz var?",
        answer:
          "Tüm sözleşmelerimizde alt yüklenicilere yönelik cezai şartlar ve teslim garantileri yer alır. Kritik yol analizleriyle gecikme risklerini önceden tespit edip ek kaynak planlaması yapıyoruz.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((service) => service.slug);
}
