import Link from "next/link";
import { Star, Tag } from "lucide-react";
import type { Product } from "@/data/products";
import { formatTHB, getBestOffer, getMaxDiscount } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  const best = getBestOffer(product);
  const maxDiscount = getMaxDiscount(product);

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white">
      <Link href={`/compare/${product.slug}`} className="relative block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={product.image} alt={product.name} width={600} height={400} loading="lazy" className="aspect-[3/2] w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-bold text-white">ราคาดีที่สุด</span>
        <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-2.5 py-1 text-xs font-bold text-white">ลดสูงสุด {maxDiscount}%</span>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs text-slate-500">{product.brand} • {product.category}</p>
        <h2 className="line-clamp-2 font-semibold leading-snug">
          <Link href={`/compare/${product.slug}`} className="hover:text-orange-600">{product.name}</Link>
        </h2>
        <p className="flex items-center gap-1 text-sm text-slate-600">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-medium">{product.rating}</span>
          <span>({product.reviewCount.toLocaleString("th-TH")} รีวิว)</span>
        </p>
        <div className="mt-auto pt-2">
          <p className="text-xs text-slate-500">ราคาถูกที่สุดที่ {best.platformName}</p>
          <p className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-700">{formatTHB(best.price)}</span>
            <span className="text-sm text-slate-400 line-through">{formatTHB(best.originalPrice)}</span>
          </p>
          <Link href={`/compare/${product.slug}`} className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-orange-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2">
            <Tag size={16} /> เปรียบเทียบราคา
          </Link>
        </div>
      </div>
    </article>
  );
}
