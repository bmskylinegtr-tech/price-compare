// ข้อมูลตัวอย่าง (Mock Data) — ราคาและลิงก์เป็นตัวอย่างเท่านั้น ให้แทนที่ด้วยข้อมูลจริง/API ของคุณ
export type Offer = {
  platformName: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  voucherCode?: string;
  affiliateUrl: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  brand: string;
  image: string;
  rating: number;
  reviewCount: number;
  aiSummary: { pros: string[]; cons: string[]; bestFor: string };
  specs: Record<string, string>;
  offers: Offer[];
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 หูฟังไร้สายตัดเสียงรบกวน",
    category: "หูฟังไร้สาย",
    brand: "Sony",
    image: "/images/sony-wh-1000xm5.svg",
    rating: 4.7,
    reviewCount: 2814,
    aiSummary: {
      pros: ["ตัดเสียงรบกวนระดับท็อปของตลาด", "แบตอึด ใช้งานได้ต่อเนื่องยาว", "ไมค์คุยสายชัดเจน", "ใส่สบาย น้ำหนักเบา"],
      cons: ["ราคาสูงกว่าคู่แข่งบางรุ่น", "พับเก็บไม่ได้เหมือนรุ่นก่อน", "ไม่กันน้ำ"],
      bestFor: "คนทำงานที่ต้องการสมาธิ นักเดินทางบ่อย และคนที่ใช้โทรประชุมออนไลน์ทุกวัน",
    },
    specs: { "การตัดเสียงรบกวน": "ANC 8 ไมค์", "แบตเตอรี่": "สูงสุด 30 ชม.", "น้ำหนัก": "250 กรัม", "การเชื่อมต่อ": "Bluetooth 5.2 / มัลติพอยท์" },
    offers: [
      { platformName: "Shopee", price: 9990, originalPrice: 13990, discountPercent: 29, voucherCode: "SONYSHP500", affiliateUrl: "https://shopee.co.th/YOUR-AFFILIATE-LINK-SONY" },
      { platformName: "Lazada", price: 10490, originalPrice: 13990, discountPercent: 25, voucherCode: "LAZSONY300", affiliateUrl: "https://www.lazada.co.th/YOUR-AFFILIATE-LINK-SONY" },
      { platformName: "TikTok Shop", price: 10190, originalPrice: 13990, discountPercent: 27, affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-SONY" },
    ],
  },
  {
    id: "p2",
    slug: "bose-quietcomfort-ultra",
    name: "Bose QuietComfort Ultra Headphones",
    category: "หูฟังไร้สาย",
    brand: "Bose",
    image: "/images/bose-quietcomfort-ultra.svg",
    rating: 4.6,
    reviewCount: 1532,
    aiSummary: {
      pros: ["สวมใส่นุ่มสบายมากแม้ใช้นาน", "เสียงเต็ม มีมิติ รองรับ Spatial Audio", "ANC ประสิทธิภาพสูง"],
      cons: ["ราคาสูง", "แบตสั้นกว่า Sony เล็กน้อย", "ตัวเครื่องค่อนข้างใหญ่"],
      bestFor: "คนที่ใส่หูฟังนานหลายชั่วโมง และชอบเสียงอบอุ่นสไตล์ Bose",
    },
    specs: { "การตัดเสียงรบกวน": "ANC ระดับพรีเมียม", "แบตเตอรี่": "สูงสุด 24 ชม.", "น้ำหนัก": "250 กรัม", "การเชื่อมต่อ": "Bluetooth 5.3 / มัลติพอยท์" },
    offers: [
      { platformName: "Lazada", price: 11900, originalPrice: 15900, discountPercent: 25, voucherCode: "BOSE400", affiliateUrl: "https://www.lazada.co.th/YOUR-AFFILIATE-LINK-BOSE" },
      { platformName: "Shopee", price: 12400, originalPrice: 15900, discountPercent: 22, affiliateUrl: "https://shopee.co.th/YOUR-AFFILIATE-LINK-BOSE" },
      { platformName: "TikTok Shop", price: 12900, originalPrice: 15900, discountPercent: 19, voucherCode: "TTBOSE200", affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-BOSE" },
    ],
  },
  {
    id: "p3",
    slug: "xiaomi-smart-air-purifier-4-pro",
    name: "Xiaomi Smart Air Purifier 4 Pro เครื่องฟอกอากาศ",
    category: "เครื่องฟอกอากาศ",
    brand: "Xiaomi",
    image: "/images/xiaomi-smart-air-purifier-4-pro.svg",
    rating: 4.5,
    reviewCount: 3120,
    aiSummary: {
      pros: ["กรองฝุ่น PM2.5 ได้รวดเร็ว", "ครอบคลุมห้องขนาดใหญ่", "ควบคุมผ่านแอปและสั่งเสียงได้", "จอแสดงค่าฝุ่นอ่านง่าย"],
      cons: ["ไส้กรองต้องเปลี่ยนตามรอบ", "เสียงดังเมื่อเปิดโหมดแรงสุด"],
      bestFor: "คอนโดและบ้านในเมืองที่เจอปัญหาฝุ่น PM2.5 และต้องการเครื่องคุ้มราคา",
    },
    specs: { "พื้นที่ใช้งาน": "ประมาณ 60 ตร.ม.", "CADR": "500 ลบ.ม./ชม.", "ระดับเสียง": "32-64 dB", "การเชื่อมต่อ": "Wi-Fi / แอป Mi Home" },
    offers: [
      { platformName: "Shopee", price: 5890, originalPrice: 7990, discountPercent: 26, voucherCode: "AIR300", affiliateUrl: "https://shopee.co.th/YOUR-AFFILIATE-LINK-XIAOMI" },
      { platformName: "Lazada", price: 5990, originalPrice: 7990, discountPercent: 25, affiliateUrl: "https://www.lazada.co.th/YOUR-AFFILIATE-LINK-XIAOMI" },
      { platformName: "TikTok Shop", price: 6190, originalPrice: 7990, discountPercent: 23, voucherCode: "TTAIR150", affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-XIAOMI" },
    ],
  },
  {
    id: "p4",
    slug: "sharp-fp-j40ta-h",
    name: "Sharp FP-J40TA-H เครื่องฟอกอากาศ Plasmacluster",
    category: "เครื่องฟอกอากาศ",
    brand: "Sharp",
    image: "/images/sharp-fp-j40ta-h.svg",
    rating: 4.4,
    reviewCount: 940,
    aiSummary: {
      pros: ["ตัวเล็ก เหมาะกับห้องนอน", "เทคโนโลยี Plasmacluster ลดเชื้อโรคและกลิ่น", "ใช้พลังงานต่ำ", "เสียงเงียบในโหมดกลางคืน"],
      cons: ["ครอบคลุมพื้นที่น้อยกว่า", "ไม่มีระบบเชื่อมต่อแอป"],
      bestFor: "ห้องนอนหรือห้องเล็กไม่เกิน 30 ตร.ม. และคนที่ต้องการเครื่องเงียบ ใช้งานง่าย",
    },
    specs: { "พื้นที่ใช้งาน": "ประมาณ 26 ตร.ม.", "CADR": "200 ลบ.ม./ชม.", "ระดับเสียง": "23-47 dB", "การเชื่อมต่อ": "ไม่มี (ปุ่มควบคุมบนเครื่อง)" },
    offers: [
      { platformName: "Lazada", price: 3790, originalPrice: 5290, discountPercent: 28, voucherCode: "SHARP200", affiliateUrl: "https://www.lazada.co.th/YOUR-AFFILIATE-LINK-SHARP" },
      { platformName: "Shopee", price: 3990, originalPrice: 5290, discountPercent: 25, affiliateUrl: "https://shopee.co.th/YOUR-AFFILIATE-LINK-SHARP" },
      { platformName: "TikTok Shop", price: 3890, originalPrice: 5290, discountPercent: 26, affiliateUrl: "https://shop.tiktok.com/YOUR-AFFILIATE-LINK-SHARP" },
    ],
  },
];

export const categories = Array.from(new Set(products.map((p) => p.category)));
export const getProductBySlug = (slug: string) => products.find((p) => p.slug === slug);
