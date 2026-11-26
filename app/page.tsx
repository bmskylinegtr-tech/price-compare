import HomeClient from "@/components/HomeClient";
import { getCategories, getProducts } from "@/lib/sheets";

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  return (
    <>
      <section className="mb-6">
        <h1 className="text-2xl font-bold sm:text-3xl">เปรียบเทียบราคาสินค้า ซื้อที่ไหนถูกที่สุด</h1>
        <p className="mt-2 text-slate-600">รวมราคาจาก Shopee, Lazada และ TikTok Shop พร้อมโค้ดส่วนลดล่าสุดในที่เดียว</p>
      </section>
      <HomeClient products={products} categories={categories} />
    </>
  );
}
