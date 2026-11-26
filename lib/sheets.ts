import type { Offer, Product } from "@/data/products";

function parseCSV(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cell += c;
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(cell); cell = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else {
      cell += c;
    }
  }
  if (cell !== "" || row.length) { row.push(cell); rows.push(row); }
  const clean = rows.filter((r) => r.some((x) => x.trim() !== ""));
  const [header, ...body] = clean;
  if (!header) return [];
  return body.map((r) => Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? "").trim()])));
}

async function fetchRows(url: string) {
  const res = await fetch(url, { cache: process.env.NODE_ENV === "production" ? "force-cache" : "no-store" });
  if (!res.ok) throw new Error(`โหลด Google Sheets ไม่สำเร็จ (${res.status}): ${url}`);
  return parseCSV(await res.text());
}

const num = (v: string) => Number((v ?? "").replace(/[^0-9.]/g, "")) || 0;
const list = (v: string) => (v ?? "").split("|").map((s) => s.trim()).filter(Boolean);

async function load(): Promise<Product[]> {
  const pUrl = process.env.SHEET_PRODUCTS_CSV_URL;
  const oUrl = process.env.SHEET_OFFERS_CSV_URL;
  if (!pUrl || !oUrl) throw new Error("ยังไม่ได้ตั้งค่า SHEET_PRODUCTS_CSV_URL และ SHEET_OFFERS_CSV_URL");
  const [pRows, oRows] = await Promise.all([fetchRows(pUrl), fetchRows(oUrl)]);

  return pRows
    .filter((r) => r.slug)
    .map((r, i): Product => {
      const offers: Offer[] = oRows
        .filter((o) => o.slug === r.slug && o.affiliateUrl)
        .map((o) => ({
          platformName: o.platformName,
          price: num(o.price),
          originalPrice: num(o.originalPrice),
          discountPercent: num(o.discountPercent),
          voucherCode: o.voucherCode || undefined,
          affiliateUrl: o.affiliateUrl,
        }));
      return {
        id: String(i + 1),
        slug: r.slug,
        name: r.name,
        category: r.category,
        brand: r.brand,
        image: r.image,
        rating: num(r.rating),
        reviewCount: num(r.reviewCount),
        aiSummary: { pros: list(r.pros), cons: list(r.cons), bestFor: r.bestFor },
        specs: Object.fromEntries(
          list(r.specs).map((s) => {
            const [k, ...v] = s.split("=");
            return [k.trim(), v.join("=").trim()];
          })
        ),
        offers,
      };
    })
    .filter((p) => p.offers.length > 0);
}

let cache: Promise<Product[]> | null = null;
export function getProducts(): Promise<Product[]> {
  if (!cache) cache = load();
  return cache;
}
export async function getProductBySlug(slug: string) {
  return (await getProducts()).find((p) => p.slug === slug);
}
export async function getCategories() {
  return Array.from(new Set((await getProducts()).map((p) => p.category)));
}
