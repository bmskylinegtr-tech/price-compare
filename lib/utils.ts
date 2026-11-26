import type { Offer, Product } from "@/data/products";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.example.com").replace(/\/$/, "");

export const formatTHB = (n: number) => `฿${n.toLocaleString("th-TH")}`;

export const sortOffers = (offers: Offer[]): Offer[] => [...offers].sort((a, b) => a.price - b.price);

export const getBestOffer = (p: Product): Offer => sortOffers(p.offers)[0];

export const getMaxDiscount = (p: Product): number => Math.max(...p.offers.map((o) => o.discountPercent));
