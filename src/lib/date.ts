import { PRODUCT } from "./config";

/** Calendar date in product timezone (America/Vancouver). */
export function todayKey(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: PRODUCT.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}
