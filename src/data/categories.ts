export type SubCategory = {
  slug: string;
  name: string;
};

export type CategoryGroup = {
  slug: string;
  name: string;
  children: SubCategory[];
};

/**
 * Wix sitesindeki menü ağacının birebir karşılığı.
 * slug değerleri eski Wix URL'leriyle aynı tutuldu ki SEO kaybı olmasın.
 */
export const categoryGroups: CategoryGroup[] = [
  {
    slug: "el-koruma-urunleri",
    name: "El Koruma",
    children: [
      { slug: "deri-is-eldivenleri", name: "Deri İş Eldivenleri" },
      { slug: "nitril-is-eldivenleri", name: "Nitril İş Eldivenleri" },
      { slug: "isi-eldivenleri", name: "Isı Eldivenleri" },
      { slug: "mekanik-is-eldivenleri", name: "Mekanik İş Eldivenleri" },
      { slug: "kaynak-eldivenleri", name: "Kaynak Eldivenleri" },
      {
        slug: "muayene-tek-kullanimlik-is-eldivenleri",
        name: "Muayene - Tek Kullanımlık İş Eldivenleri",
      },
      { slug: "metal-orgu-eldivenler", name: "Metal Örgü Eldivenler" },
    ],
  },
  {
    slug: "ayak-koruma",
    name: "Ayak Koruma",
    children: [
      { slug: "tabanliklar", name: "Tabanlıklar" },
      { slug: "is-ayakkabilari", name: "İş Ayakkabıları" },
      { slug: "is-botlari", name: "İş Botları" },
      { slug: "izole-elektrikci-ayakkabilari", name: "İzole Elektrikçi Ayakkabıları" },
      { slug: "carik-celik-burunluk", name: "Çarık - Çelik Burunluk" },
      { slug: "cizmeler", name: "Çizmeler" },
      { slug: "yazlik-is-ayakkabilari", name: "Yazlık İş Ayakkabıları" },
      { slug: "ortopedik-is-ayakkabilari", name: "Ortopedik İş Ayakkabıları" },
    ],
  },
  {
    slug: "solunum-koruma",
    name: "Solunum Koruma",
    children: [
      { slug: "yarim-yuz-maskesi", name: "Yarım Yüz Maskesi" },
      { slug: "tam-yuz-maskesi", name: "Tam Yüz Maskesi" },
      { slug: "yuz-maskesi-filtresi", name: "Yüz Maskesi Filtresi" },
      { slug: "toz-maskesi", name: "Toz Maskesi" },
    ],
  },
  {
    slug: "goz-koruma",
    name: "Göz Koruma",
    children: [
      { slug: "koruyucu-gozlukler", name: "Koruyucu Gözlükler" },
      { slug: "vucut-ve-goz-dusu", name: "Vücut ve Göz Duşu" },
      { slug: "goz-dusu-solusyonu", name: "Göz Duşu Solüsyonu" },
    ],
  },
  {
    slug: "is-elbiseleri",
    name: "İş Elbiseleri",
    children: [
      { slug: "is-onlukleri", name: "İş Önlükleri" },
      { slug: "is-montu-ve-parkalar", name: "İş Montu ve Parkalar" },
      { slug: "yelekler", name: "Yelekler" },
      { slug: "sweatshirtler", name: "Sweatshirtler" },
      { slug: "gomlekler", name: "Gömlekler" },
      { slug: "takim-kiyafetler", name: "Takım Kıyafetler" },
      { slug: "ceketler", name: "Ceketler" },
      { slug: "termal-iclik-ve-giyim", name: "Termal İçlik ve Giyim" },
      { slug: "antistatik-kiyafetler", name: "Antistatik Kıyafetler" },
      { slug: "alev-almaz-kiyafetler", name: "Alev Almaz Kıyafetler" },
      { slug: "aluminize-elbiseler", name: "Alüminize Elbiseler" },
      { slug: "itfaiyeci-elbiseleri", name: "İtfaiyeci Elbiseleri" },
    ],
  },
  {
    slug: "kafa-koruma",
    name: "Kafa Koruma",
    children: [
      { slug: "darbe-emici-sapkalar", name: "Darbe Emici Şapkalar" },
      { slug: "aluminize-baslik", name: "Alüminize Başlık" },
      { slug: "is-guvenligi-baretleri", name: "İş Güvenliği Baretleri" },
      { slug: "baret-aksesuarlari", name: "Baret Aksesuarları" },
    ],
  },
  {
    slug: "kulak-koruma",
    name: "Kulak Koruma",
    children: [
      { slug: "kulak-koruyucu-donanimlar", name: "Kulak Koruyucu Donanımlar" },
    ],
  },
  {
    slug: "yuksekte-calisma",
    name: "Yüksekte Çalışma",
    children: [
      { slug: "ip-ve-perlon", name: "İp ve Perlon" },
      { slug: "ise-konumlanma-ekipmani", name: "İşe Konumlanma Ekipmanı" },
      { slug: "karabina", name: "Karabina" },
      { slug: "makara", name: "Makara" },
      { slug: "emniyet-kemeri", name: "Emniyet Kemeri" },
      { slug: "inis-ve-emniyet-alma", name: "İniş ve Emniyet Alma" },
      { slug: "tirmanis-malzemeleri", name: "Tırmanış Malzemeleri" },
      { slug: "kurtarma-ekipmanlari", name: "Kurtarma Ekipmanları" },
      { slug: "kask", name: "Kask" },
    ],
  },
  {
    slug: "eked-urunleri",
    name: "Eked Ürünleri",
    children: [
      { slug: "emniyet-asma-kilitler", name: "Emniyet Asma Kilitler" },
      { slug: "salter-kilitleme-ekipmanlari", name: "Şalter Kilitleme Ekipmanları" },
      { slug: "kablo-kilitleme-ekipmanlari", name: "Kablo Kilitleme Ekipmanları" },
      { slug: "vana-kilitleme-ekipmanlari", name: "Vana Kilitleme Ekipmanları" },
      { slug: "coklandiricilar", name: "Çoklandırıcılar" },
      { slug: "eked-uyari-etiketleri", name: "Eked Uyarı Etiketleri" },
      { slug: "eked-istasyon-modelleri", name: "Eked İstasyon Modelleri" },
      {
        slug: "grup-kilitleme-kutulari-ve-eked-cantalar",
        name: "Grup Kilitleme Kutuları ve Eked Çantalar",
      },
      {
        slug: "pnomatik-baglanti-kilitleme-ekipmanlari",
        name: "Pnömatik Bağlantı Kilitleme Ekipmanları",
      },
    ],
  },
];

export const allSubCategories: (SubCategory & { groupSlug: string; groupName: string })[] =
  categoryGroups.flatMap((g) =>
    g.children.map((c) => ({ ...c, groupSlug: g.slug, groupName: g.name })),
  );

export function findSubCategory(slug: string) {
  return allSubCategories.find((c) => c.slug === slug);
}

export function findGroup(slug: string) {
  return categoryGroups.find((g) => g.slug === slug);
}
