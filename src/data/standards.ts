import { standards } from "./site";

export type StandardPage = {
  slug: string;
  title: string;
  intro: string;
  /** Düz metin gövde — Wix'teki içerik buraya aktarılacak */
  body: string;
};

/**
 * Wix'teki EN standardı rehber sayfalarının içerikleri.
 * `content` boş bırakılan sayfalar için genel bir açıklama gösterilir;
 * metinler Wix'ten aktarıldıkça buraya eklenir.
 */
const content: Record<string, { intro?: string; body?: string }> = {
  "en-iso-374-1-2016-standardi-yeni": {
    intro:
      "Kimyasallara ve mikroorganizmalara karşı koruyucu eldivenlerde kullanılan güncel EN ISO 374-1:2016 standardının açıklaması.",
  },
  "gurultuden-koruyucular-icin-en-standarti": {
    intro:
      "Kulak koruyucularda aranan EN 352 serisi standartları ve SNR değerlerinin ne anlama geldiği.",
  },
  "solunum-koruyuclar-icin-en-standarti": {
    intro:
      "Toz maskeleri, yarım ve tam yüz maskeleri ile filtrelerde geçerli EN 149, EN 140, EN 136 ve EN 14387 standartları.",
  },
  "vucut-koruyucu-giysiler-icin-en-standartlari": {
    intro:
      "Koruyucu iş giysilerinde kullanılan EN ISO 20471, EN ISO 11612, EN 1149 ve EN 13034 standartları.",
  },
  "kafa-koruyucular-icin-en-standartlari": {
    intro: "Baret ve darbe emici şapkalarda geçerli EN 397, EN 12492 ve EN 812 standartları.",
  },
  "goz-ve-yuz-koruyucular-icin-en-standartlari": {
    intro: "Koruyucu gözlük ve yüz siperlerinde geçerli EN 166 ve ilgili standartlar.",
  },
  "yuksekte-calisma-ekipmanlari-icin-en-standartlari": {
    intro:
      "Emniyet kemeri, karabina, halat ve düşüş durdurucularda geçerli EN 361, EN 362, EN 355 ve EN 353 standartları.",
  },
  "ayak-koruyucular-icin-en-standartlari": {
    intro:
      "İş ayakkabısı ve botlarında geçerli EN ISO 20345 standardı ile S1, S2, S3, SRC gibi kısaltmaların anlamı.",
  },
};

const DEFAULT_BODY = `Bu sayfadaki teknik içerik hazırlanmaktadır.

Ürün seçimi, standart uygunluğu ve sertifika belgeleri hakkında bilgi almak için bizimle iletişime geçebilirsiniz. Uzman ekibimiz iş kolunuza uygun kişisel koruyucu donanımın belirlenmesinde size yardımcı olur.`;

export const standardPages: StandardPage[] = standards.map((s) => ({
  slug: s.slug,
  title: s.title,
  intro: content[s.slug]?.intro ?? "",
  body: content[s.slug]?.body ?? DEFAULT_BODY,
}));

export function getStandard(slug: string) {
  return standardPages.find((s) => s.slug === slug);
}
