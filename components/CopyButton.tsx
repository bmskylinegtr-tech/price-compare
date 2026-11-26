"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("คัดลอกโค้ดนี้", code);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`คัดลอกโค้ดส่วนลด ${code}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-orange-400 bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 hover:bg-orange-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "คัดลอกแล้ว" : code}
    </button>
  );
}
