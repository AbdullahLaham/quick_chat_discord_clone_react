import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// This function merges and combines Tailwind classes dynamically.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
