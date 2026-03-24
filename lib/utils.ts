// utils.ts
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ClassValue = string | undefined | null | false; // Allow falsy values

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs.filter(Boolean))); // Filter out falsy values before merging
}