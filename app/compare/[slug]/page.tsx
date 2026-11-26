import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Star, ThumbsDown, ThumbsUp, UserCheck } from "lucide-react";
import CopyButton from "@/components/CopyButton";
import { getProductBySlug, getProducts } from "@/lib/sheets";
import { SITE_URL, formatTHB, getBestOffer, sortOffers } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getProducts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const best = getBestOffer(product);
  const title = `${product.name} ราคาถูกสุด ${formatTHB(best.price)} เปรียบเทียบราคา`;
  const description = `เปรียบเทียบราคา ${product.name} จาก ${product.offers.map((o) => o.platformName).join(", ")} ราคาเริ่มต้น ${formatTHB(best.price)} ลดสูงสุด ${best.discountPercent}% พร้อมโค้ดส่วนลดและรีวิวสรุปข้อดีข้อเสีย`;
  const url = `/compare/${product.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: product.image }] },
  };
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const products = await getProducts();

  const offers = sortOffers(product.offers);
  const best = offers[0];
  const related = products.filter((p) => p.category === product.category);
  const specKeys = Object.keys(product.specs);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `${SITE_URL}${product.image}`,
    brand: { "@type": "Brand", name: product.brand },
    category: product.category,
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviewCount, bestRating: 5, worstRating: 1 },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "THB",
      lowPrice: offers[0].price,
      highPrice: offers[offers.length - 1].price,
      offerCount: offers.length,
      offers: offers.map((o) => ({
        "@type": "Offer",
        url: o.affiliateUrl,
        price: o.price,
        priceCurrency: "THB",
        availability: "https://schema.org/InStock",
        seller: { "@type": "Organization", name: o.platformName },
      })),
    },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />

      <Link href="/" className="mb-4 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-orange-600">
        <ArrowLeft size={16} /> กลับหน้าแรก
      </Link>

      <header className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-4 sm:grid-cols-2 sm:p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} width={600} height={400} className="w-full rounded-xl object-cover" />
        <div className="flex flex-col justify-center gap-3">
          <p className="text-sm text-slate-500">{product.brand} • {product.category}</p>
          <h1 className="text-2xl font-bold leading-snug">{product.name}</h1>
          <p className="flex items-center gap-1.5 text-sm text-slate-600">
            <Star size={16} className="fill-amber-400 text-amber-400" />
            <strong>{product.rating}</strong>/5 ({product.reviewCount.toLocaleString("th-TH")} รีวิว)
          </p>
          <div>
            <p className="text-sm text-slate-500">ราคาถูกที่สุดตอนนี้ที่ {best.platformName}</p>
            <p className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-700">{formatTHB(best.price)}</span>
              <span className="text-slate-400 line-through">{formatTHB(best.originalPrice)}</span>
              <span className="rounded bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-700">-{best.discountPercent}%</span>
            </p>
          </div>
        </div>
      </header>

      <section className="mt-6" aria-labelledby="price-table">
        <h2 id="price-table" className="mb-3 text-xl font-bold">เปรียบเทียบราคา {product.name}</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3">ร้านค้า</th>
                <th className="px-4 py-3">ราคา</th>
                <th className="px-4 py-3">ส่วนลด</th>
                <th className="px-4 py-3">โค้ดส่วนลด</th>
                <th className="px-4 py-3 text-right">ซื้อสินค้า</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((o, i) => (
                <tr key={o.platformName} className={`border-t border-slate-200 ${i === 0 ? "bg-emerald-50" : ""}`}>
                  <td className="px-4 py-4 font-semibold">
                    {o.platformName}
                    {i === 0 && <span className="ml-2 rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-bold text-white">ราคาดีที่สุด</span>}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-lg font-bold text-emerald-700">{formatTHB(o.price)}</div>
                    <div className="text-xs text-slate-400 line-through">{formatTHB(o.originalPrice)}</div>
                  </td>
                  <td className="px-4 py-4 font-medium text-orange-600">-{o.discountPercent}%</td>
                  <td className="px-4 py-4">{o.voucherCode ? <CopyButton code={o.voucherCode} /> : <span className="text-slate-400">ไม่มีโค้ด</span>}</td>
                  <td className="px-4 py-4 text-right">
                    <a
                      href={o.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2.5 font-bold text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    >
                      เช็คราคาล่าสุด / ซื้อเลย <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-500">ราคาอาจเปลี่ยนแปลงได้ตลอดเวลา กรุณาตรวจสอบราคาล่าสุดบนหน้าร้านค้า</p>
      </section>

      <section className="mt-8" aria-labelledby="analysis">
        <h2 id="analysis" className="mb-3 text-xl font-bold">สรุปความคุ้มค่า: ข้อดี ข้อเสีย และเหมาะกับใคร</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-emerald-200 bg-white p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-emerald-700"><ThumbsUp size={18} /> ข้อดี</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">{product.aiSummary.pros.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="rounded-xl border border-rose-200 bg-white p-4">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-rose-700"><ThumbsDown size={18} /> ข้อเสีย</h3>
            <ul className="list-disc space-y-1 pl-5 text-sm">{product.aiSummary.cons.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50 p-4">
          <h3 className="mb-1 flex items-center gap-2 font-semibold text-orange-700"><UserCheck size={18} /> สินค้านี้เหมาะกับใคร</h3>
          <p className="text-sm">{product.aiSummary.bestFor}</p>
        </div>
      </section>

      <section className="mt-8" aria-labelledby="specs">
        <h2 id="specs" className="mb-3 text-xl font-bold">เปรียบเทียบสเปกกับสินค้าในหมวด{product.category}</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="px-4 py-3">สเปก</th>
                {related.map((p) => (
                  <th key={p.id} className={`px-4 py-3 ${p.id === product.id ? "text-orange-700" : ""}`}>
                    {p.id === product.id ? p.brand : <Link href={`/compare/${p.slug}`} className="underline hover:text-orange-600">{p.brand}</Link>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">ราคาถูกที่สุด</td>
                {related.map((p) => <td key={p.id} className="px-4 py-3 font-bold text-emerald-700">{formatTHB(getBestOffer(p).price)}</td>)}
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">คะแนนรีวิว</td>
                {related.map((p) => <td key={p.id} className="px-4 py-3">{p.rating}/5</td>)}
              </tr>
              {specKeys.map((k) => (
                <tr key={k} className="border-t border-slate-200">
                  <td className="px-4 py-3 font-medium">{k}</td>
                  {related.map((p) => <td key={p.id} className="px-4 py-3">{p.specs[k] ?? "-"}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
