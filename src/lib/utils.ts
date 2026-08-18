import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function parseFabricSpecs(fabricDetails: string): Record<string, string> {
  const specs: Record<string, string> = {};
  const parts = fabricDetails.split("|").map((p) => p.trim());

  for (const part of parts) {
    const colonIndex = part.indexOf(":");
    if (colonIndex > -1) {
      const key = part.slice(0, colonIndex).trim();
      const value = part.slice(colonIndex + 1).trim();
      specs[key] = value;
    }
  }

  return specs;
}
