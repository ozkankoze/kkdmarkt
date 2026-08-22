# KKDMARKT — Next.js Katalog Sitesi

Wix'teki kkdmarkt.com sitesinin Next.js ile yeniden yazılmış, Vercel'e hazır sürümü.
Kurumsal kimlik (kırmızı/beyaz, Wix Madefor tipografisi) korundu; düzen modernize edildi.

## Hızlı başlangıç

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # üretim derlemesi
```

## Ürün verisini içe aktarma (Wix → site)

1. Wix panelinde **Katalog → Ürünler → ⋮ → Ürünleri Dışa Aktar** ile CSV indirin.
2. Şunu çalıştırın:

```bash
npm run import:wix -- ~/Downloads/urunler.csv
```

Script `src/data/products.json` dosyasını yeniden yazar ve konsola özet basar:
kaç ürün geldiği, kategorisiz/görselsiz kalanlar ve **eşleşmeyen koleksiyon adları**.
Eşleşmeyen bir koleksiyon varsa `src/data/categories.ts` içine ekleyin ve tekrar çalıştırın.

Demo veriye dönmek için: `npm run seed:demo`

## Klasör yapısı

```
src/
  app/
    page.tsx                     anasayfa
    [slug]/page.tsx              kategori + alt kategori + standart sayfaları
    product-page/[slug]/         ürün detay  (Wix ile aynı URL)
    category/[slug]/             eski Wix mağaza adresleri → kalıcı yönlendirme
    arama/  teklif-al/  hakkimizda/  markalarimiz/  iletisim/
    sitemap.ts  robots.ts
  components/                    Header, Footer, ProductCard, SearchBox, QuoteForm…
  data/
    categories.ts                menü ağacı (Wix ile birebir)
    products.json                ürün verisi  ← import script'i buraya yazar
    site.ts                      iletişim bilgileri, markalar, standart listesi
    standards.ts                 EN standardı rehber sayfalarının metinleri
scripts/
  import-wix-csv.mjs             Wix CSV → products.json
  build-search-index.mjs         public/search-index.json (arama için)
  seed-demo.mjs                  geçici demo verisi
```

## Vercel'e yayınlama

1. Bu klasörü bir GitHub reposuna yükleyin:

```bash
git init && git add -A && git commit -m "KKDMARKT sitesi"
git branch -M main
git remote add origin https://github.com/<kullanici>/kkdmarkt.git
git push -u origin main
```

2. [vercel.com/new](https://vercel.com/new) → repoyu seçin → **Deploy**.
   Ayar gerekmez; Next.js otomatik algılanır.
3. Vercel → Settings → Domains → `kkdmarkt.com` ve `www.kkdmarkt.com` ekleyin,
   alan adı sağlayıcınızda DNS kayıtlarını Vercel'in verdiği değerlerle güncelleyin.

> **Önemli:** Alan adını Vercel'e yönlendirmeden önce Wix sitesini kapatmayın;
> yeni siteyi önce `xxx.vercel.app` adresinde kontrol edin.

## Görseller hakkında

Ürün ve marka görselleri şu an Wix'in CDN'inden (`static.wixstatic.com`)
çekiliyor — hızlıdır ve ek maliyeti yoktur. Wix aboneliğini tamamen
kapatmayı planlıyorsanız görselleri `public/` altına indirip
`products.json` içindeki adresleri güncellemek gerekir.

## Teklif formu

Form şu an **WhatsApp** ve **e-posta** üzerinden gönderim yapıyor (sunucu gerekmez).
Formu doğrudan e-posta olarak almak isterseniz Resend/Formspree gibi bir servis
`src/components/QuoteForm.tsx` içine kolayca eklenebilir.

## Korunan URL'ler (SEO)

| Wix | Yeni site |
| --- | --- |
| `/product-page/<slug>` | aynı |
| `/deri-is-eldivenleri` vb. 47 alt kategori | aynı |
| `/el-koruma-urunleri`, `/ayak-koruma` vb. 9 ana kategori | aynı |
| `/hakkimizda`, `/markalarimiz`, EN standardı sayfaları | aynı |
| `/category/<wix-koleksiyon>` | ilgili kategoriye 301 yönlendirme |
