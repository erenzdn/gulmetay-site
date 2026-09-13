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
    slug: "statik-proje",
    number: "02",
    title: "Statik Proje",
    shortDescription:
      "Güvenli ve mevzuata uygun betonarme, çelik ve yığma yapı statik proje, hesap ve mühendislik hizmetleri.",
    heroTagline: "Yüksek mühendislik hassasiyeti, depreme dayanıklı yapılar",
    intro:
      "Statik proje hazırlama sürecinde güncel Türkiye Bina Deprem Yönetmeliği (TBDY 2018) ve TS500 gibi standartlara tam uyum sağlıyoruz. Yapınızın yük analizleri, sismik modellemesi ve donatı detaylandırmalarını en gelişmiş mühendislik yazılımları ile gerçekleştiriyoruz.",
    highlights: [
      "Betonarme ve çelik yapı statik projeleri",
      "TBDY 2018 uyumlu sismik ve dinamik analizler",
      "Mevcut bina taşıyıcı sistem ve performans analizi",
      "Belediye ve imar ruhsatı statik dosya hazırlığı",
    ],
    features: [
      {
        title: "İleri Sismik Analiz",
        description:
          "Binaların deprem yükleri altındaki davranışlarını 3D dinamik simülasyonlarla hesaplıyor ve maksimum güvenlik sağlıyoruz.",
      },
      {
        title: "Ekonomik & Güvenli Kesitler",
        description:
          "Yapı dayanımından ve emniyetten taviz vermeden optimum donatı ve kesit tasarımları ile yapım maliyetini dengeliyoruz.",
      },
      {
        title: "Ruhsat ve Uygulama Çizimleri",
        description:
          "Kalıp, donatı ve çelik birleşim detaylarını şantiyede hatasız uygulanabilecek netlikte hazırlıyoruz.",
      },
    ],
    process: [
      {
        step: "01",
        title: "Mimari Proje İncelemesi",
        description:
          "Mimari plan ve kesitler incelenerek taşıyıcı sistem kurgusu (kolon-perde aksları) oluşturulur.",
      },
      {
        step: "02",
        title: "Yük & Sismik Analiz",
        description:
          "Zemin etüt verileri doğrultusında düşey ve yanal yük hesapları ile 3D statik analizler yapılır.",
      },
      {
        step: "03",
        title: "Detay Çizimleri",
        description:
          "Kalıp planları, donatı açılımları, kiriş-kolon birleşim ve temel detayları hazırlanır.",
      },
      {
        step: "04",
        title: "Ruhsat & Teknik Destek",
        description:
          "Statik hesap raporları ruhsat onayına sunulur, şantiye sürecinde mühendislik desteği verilir.",
      },
    ],
    iconName: "PenTool",
    keywords: [
      "statik proje",
      "statik hesap",
      "deprem analizi",
      "inşaat mühendisliği",
      "betonarme proje",
    ],
    stats: [
      "1000+ Statik Proje",
      "100% TBDY 2018 Uyumu",
      "0 Hata Toleransı",
    ],
    faqs: [
      {
        question: "Statik proje nedir ve neden zorunludur?",
        answer:
          "Statik proje, yapının kendi ağırlığı, hareketli yükler ve deprem/rüzgar gibi dış etkilere karşı güvenle ayakta kalmasını sağlayan taşıyıcı sistem (temel, kolon, kiriş, perde) hesap ve çizimleridir. Yapı ruhsatı alınması ve can güvenliği için yasal zorunluluktur.",
      },
      {
        question: "Statik proje hazırlığı ne kadar sürer?",
        answer:
          "Yapının büyüklüğü, kat sayısı ve mimari detaylarına bağlı olarak statik hesap ve çizim süreci genellikle 1 ila 3 hafta arasında tamamlanmaktadır.",
      },
      {
        question: "Mevcut binalar için statik performans analizi ve güçlendirme projesi yapıyor musunuz?",
        answer:
          "Evet, mevcut binaların deprem risk analizlerini, karot ve demir donatı tespitlerini yaparak bina performans raporu ve gerekiyorsa statik güçlendirme projesi hazırlıyoruz.",
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
