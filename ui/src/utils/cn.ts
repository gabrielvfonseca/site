
// This file is a utility function that merges classnames together. 
// It is used to merge Tailwind classes together.

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
};