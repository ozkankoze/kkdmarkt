export const site = {
  name: "KKDMARKT",
  domain: "kkdmarkt.com",
  url: "https://www.kkdmarkt.com",
  slogan: "Güvenlik bir seçenek değil, zorunluluktur.",
  tagline: "İş güvenliği ekipmanlarında kaliteli, güvenilir ve profesyonel çözümler.",
  description:
    "KKDMARKT, iş sağlığı ve güvenliği alanında kaliteli ve güvenilir ürünleri bir araya getirerek profesyonel çözümler sunan bir tedarik platformudur.",
  logo: "https://static.wixstatic.com/media/5ea3ff_3153c39996fc4b82997695e4aa79a22b~mv2.png",
  hero: "https://static.wixstatic.com/media/5ea3ff_d54145e0565b4f7b961e4107c26ef3e7~mv2.png",
  contact: {
    phone: "0551 942 6212",
    phoneHref: "tel:+905519426212",
    whatsapp: "905519426212",
    email: "info@kkdmarkt.com",
    address: "Esatpaşa Mahallesi, Bingök Sokak No:1 Daire:1",
    city: "Ataşehir / İstanbul",
  },
} as const;

export const about = {
  short:
    "KKDMARKT, iş sağlığı ve güvenliği alanında kaliteli ve güvenilir ürünleri bir araya getirerek profesyonel çözümler sunan bir tedarik platformudur. Farklı sektörlerin ihtiyaçlarına yönelik geniş ürün yelpazesi ile çalışan güvenliğini ön planda tutar ve kullanıcılarına pratik, hızlı ve güvenilir alışveriş deneyimi sağlar.",
};

export const highlights = [
  {
    title: "Yüksek Standart",
    text: "Tüm ürünler ilgili EN standartlarına uygun ve sertifikalıdır.",
  },
  {
    title: "Kaliteli Ürünler",
    text: "Dünyanın önde gelen KKD markalarıyla çalışıyoruz.",
  },
  {
    title: "Hızlı Tedarik",
    text: "Geniş stok ve hızlı sevkiyat ile işiniz aksamaz.",
  },
];

export type Brand = { name: string; logo: string; slug?: string };

export const brands: Brand[] = [
  {
    name: "Locksan Safety",
    slug: "locksan-safety",
    logo: "https://static.wixstatic.com/media/5ea3ff_d1f27767540548fd88ef19ae828cbda1~mv2.png",
  },
  {
    name: "Starline",
    slug: "starline",
    logo: "https://static.wixstatic.com/media/5ea3ff_6029c631977d402991deb3bf7ccf18d7~mv2.png",
  },
  {
    name: "Coverguard",
    slug: "coverguard",
    logo: "https://static.wixstatic.com/media/5ea3ff_27e4012fb1fa4c339a947987a00fe092~mv2.png",
  },
  {
    name: "Activehand",
    slug: "activehand",
    logo: "https://static.wixstatic.com/media/5ea3ff_af04756618ee4e9a9adc0343ccc86a62~mv2.png",
  },
  {
    name: "Base",
    slug: "base",
    logo: "https://static.wixstatic.com/media/5ea3ff_3011362088bd4c97bf6627c4a5110f0d~mv2.png",
  },
  {
    name: "Cofra",
    slug: "cofra",
    logo: "https://static.wixstatic.com/media/5ea3ff_895cc63cbf774186b7d19dfc54d08ccf~mv2.png",
  },
  {
    name: "EKS-EKSED",
    logo: "https://static.wixstatic.com/media/5ea3ff_e340341cc68a4c30bd15c952bfb0cfa5~mv2.png",
  },
  {
    name: "Delta Plus",
    logo: "https://static.wixstatic.com/media/5ea3ff_48bcdb8a654e4152ba657259d510cdd3~mv2.png",
  },
  {
    name: "OMD",
    logo: "https://static.wixstatic.com/media/5ea3ff_7b74c3fd7d534bb0957f136fd0c882b9~mv2.png",
  },
  {
    name: "Ansell",
    slug: "ansell",
    logo: "https://static.wixstatic.com/media/5ea3ff_4a878dbc004746a3bfbedf893c72f830~mv2.png",
  },
  {
    name: "Honeywell",
    logo: "https://static.wixstatic.com/media/5ea3ff_a800bcbbcec64210b7a472896b87f8c6~mv2.png",
  },
  {
    name: "Gripper",
    logo: "https://static.wixstatic.com/media/5ea3ff_5d7b272b47bc4fdcbc4b48abf0f33842~mv2.png",
  },
  {
    name: "Haspet",
    logo: "https://static.wixstatic.com/media/5ea3ff_7c7b23ceb17e4fd1884d39d8302499ba~mv2.png",
  },
  {
    name: "Handy",
    logo: "https://static.wixstatic.com/media/5ea3ff_9815d9e54067445e9b1272d4ecd6077d~mv2.png",
  },
  {
    name: "Swolx",
    logo: "https://static.wixstatic.com/media/5ea3ff_6745e2f450264e18b9b3d13eccaa5984~mv2.png",
  },
  {
    name: "Tabanex",
    logo: "https://static.wixstatic.com/media/5ea3ff_1ed2cf803a6146c3b950f4a77b0e0e0d~mv2.png",
  },
  {
    name: "Baymax",
    logo: "https://static.wixstatic.com/media/5ea3ff_9e5d6126823d4e55a9d26535601dfb8d~mv2.png",
  },
  {
    name: "GVS Elipse",
    logo: "https://static.wixstatic.com/media/5ea3ff_e96184afd6054ef99284ff15dbbefee0~mv2.png",
  },
  {
    name: "3M",
    logo: "https://static.wixstatic.com/media/5ea3ff_e8e1fe34dc244142810c9354f9057161~mv2.png",
  },
  {
    name: "Segura",
    logo: "https://static.wixstatic.com/media/5ea3ff_b00019dc00e2404db4f5154237767576~mv2.png",
  },
  {
    name: "Upower",
    logo: "https://static.wixstatic.com/media/5ea3ff_4d266d33b9c0450d9e659ceb47c5bf93~mv2.png",
  },
  {
    name: "Mekap",
    logo: "https://static.wixstatic.com/media/5ea3ff_911fb0f4d5424adfb619bdd29710e0c9~mv2.png",
  },
  {
    name: "Uvex",
    logo: "https://static.wixstatic.com/media/5ea3ff_c7bb912c43f04be7a7aee06c007daa46~mv2.png",
  },
  {
    name: "Univet",
    logo: "https://static.wixstatic.com/media/5ea3ff_32fc1b3abb6848468c1cc0fb7817dba8~mv2.png",
  },
];

/** Footer'daki EN standardı rehber sayfaları — eski Wix slug'ları korundu. */
export const standards = [
  { slug: "en-iso-374-1-2016-standardi-yeni", title: "EN ISO 374-1:2016 Standardı (Yeni)" },
  { slug: "gurultuden-koruyucular-icin-en-standarti", title: "Gürültüden Koruyucular İçin EN Standartları" },
  { slug: "solunum-koruyuclar-icin-en-standarti", title: "Solunum Koruyucular İçin EN Standartları ve Teknik Bilgi" },
  { slug: "vucut-koruyucu-giysiler-icin-en-standartlari", title: "Vücut Koruyucu Giysiler İçin EN Standartları" },
  { slug: "kafa-koruyucular-icin-en-standartlari", title: "Kafa Koruyucular İçin EN Standartları" },
  { slug: "goz-ve-yuz-koruyucular-icin-en-standartlari", title: "Göz ve Yüz Koruyucular İçin EN Standartları" },
  { slug: "yuksekte-calisma-ekipmanlari-icin-en-standartlari", title: "Yüksekte Çalışma Ekipmanları İçin EN Standartları" },
  { slug: "ayak-koruyucular-icin-en-standartlari", title: "Ayak Koruyucular İçin EN Standartları" },
];
