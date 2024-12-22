import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Utility function for merging Tailwind classes
export function cn(...inputs: string[]) {
  return twMerge(clsx(inputs));
}
