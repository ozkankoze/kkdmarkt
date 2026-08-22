/**
 * Wix medya CDN'i URL üzerinden yeniden boyutlandırma yapar.
 * Böylece Vercel'in görsel optimizasyon kotasını harcamadan
 * doğru boyutta ve WebP formatında görsel çekilir.
 */
export function wixImage(url: string | undefined, w: number, h = w, q = 88) {
  if (!url) return undefined;
  if (!url.includes("static.wixstatic.com")) return url;
  const base = url.split("/v1/")[0];
  const ext = base.toLowerCase().endsWith(".jpg") || base.toLowerCase().endsWith(".jpeg")
    ? "jpg"
    : "png";
  return `${base}/v1/fit/w_${w},h_${h},q_${q}/file.${ext}`;
}

export function wixSrcSet(url: string | undefined, sizes: number[]) {
  if (!url) return undefined;
  return sizes.map((s) => `${wixImage(url, s)} ${s}w`).join(", ");
}
