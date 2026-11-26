"use client";

import { useMemo, useState } from "react";
import { Search, Wallet } from "lucide-react";
import type { Product } from "@/data/products";
import { formatTHB, getBestOffer } from "@/lib/utils";
import ProductCard from "./ProductCard";

export default function HomeClient({ products, categories }: { products: Product[]; categories: string[] }) {
  const maxPrice = useMemo(() => Math.max(...products.map((p) => getBestOffer(p).price)), [products]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("ทั้งหมด");
  const [budget, setBudget] = useState(maxPrice);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchQuery = !q || `${p.name} ${p.brand} ${p.category}`.toLowerCase().includes(q);
      const matchCategory = category === "ทั้งหมด" || p.category === category;
      const matchBudget = getBestOffer(p).price <= budget;
      return matchQuery && matchCategory && matchBudget;
    });
  }, [products, query, category, budget]);

  return (
    <div>
      <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6">
        <label htmlFor="search" className="sr-only">ค้นหาสินค้า</label>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาสินค้า เช่น หูฟัง, เครื่องฟอกอากาศ, Sony"
            className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-200"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="กรองตามหมวดหมู่">
          {["ทั้งหมด", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                category === c ? "border-orange-500 bg-orange-500 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-orange-400"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-lg bg-slate-50 p-4">
          <label htmlFor="budget" className="flex items-center justify-between text-sm font-medium">
            <span className="flex items-center gap-2"><Wallet size={16} className="text-emerald-600" /> งบประมาณของคุณ</span>
            <span className="text-lg font-bold text-emerald-700">ไม่เกิน {formatTHB(budget)}</span>
          </label>
          <input
            id="budget"
            type="range"
            min={1000}
            max={maxPrice}
            step={500}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="mt-3 w-full accent-emerald-600"
          />
          <p className="mt-1 text-xs text-slate-500">เลื่อนเพื่อดูสินค้าที่ราคาถูกที่สุดอยู่ในงบของคุณ</p>
        </div>
      </section>

      <p className="mb-3 mt-6 text-sm text-slate-600" aria-live="polite">พบสินค้า {filtered.length} รายการ</p>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">
          ไม่พบสินค้าที่ตรงกับเงื่อนไข ลองเพิ่มงบประมาณหรือเปลี่ยนคำค้นหา
        </div>
      )}
    </div>
  );
}
