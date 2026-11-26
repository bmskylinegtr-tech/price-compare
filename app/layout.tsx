import type { Metadata } from "next";
import Link from "next/link";
import { Noto_Sans_Thai } from "next/font/google";
import { BadgePercent } from "lucide-react";
import { SITE_URL } from "@/lib/utils";
import "./globals.css";

const font = Noto_Sans_Thai({ subsets: ["thai", "latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "DealCompare – เปรียบเทียบราคาสินค้า รวมดีลและโค้ดส่วนลด", template: "%s | DealCompare" },
  description: "เปรียบเทียบราคาสินค้าจาก Shopee, Lazada, TikTok Shop พร้อมโค้ดส่วนลดล่าสุด ช่วยให้คุณซื้อได้ถูกที่สุด",
  openGraph: { type: "website", locale: "th_TH", siteName: "DealCompare" },
  robots: { index: true, follow: true },
  verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className={font.className}>
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold">
              <BadgePercent className="text-orange-500" /> DealCompare
            </Link>
            <span className="hidden text-sm text-slate-500 sm:block">เปรียบเทียบราคา • โค้ดส่วนลด • ดีลเด็ด</span>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        <footer className="mt-10 border-t border-slate-200 bg-white">
          <p className="mx-auto max-w-6xl px-4 py-6 text-xs leading-relaxed text-slate-500">
            เปิดเผยข้อมูล: เว็บไซต์นี้มีลิงก์แอฟฟิลิเอต หากคุณซื้อสินค้าผ่านลิงก์ เราอาจได้รับค่าคอมมิชชันโดยไม่มีค่าใช้จ่ายเพิ่มสำหรับคุณ
            ราคาและโปรโมชันอาจเปลี่ยนแปลงได้ โปรดตรวจสอบราคาล่าสุดบนหน้าร้านค้าก่อนสั่งซื้อ
          </p>
        </footer>
      </body>
    </html>
  );
}
