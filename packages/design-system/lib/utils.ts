import { clsx } from 'clsx';
import type { ClassValue } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export const formatDate = (input: string): string => {
  const date = new Date(input);

  return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
  });
};

export const timeSince = (input: string): string => {
  const date = new Date(input);
  const now = new Date();

  const diff = now.getTime() - date.getTime();

  const diffInDays = diff / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) {
    return 'today'
  } else if (diffInDays < 2) {
    return 'yesterday'
  } else if (diffInDays < 7) {
    return `${Math.floor(diffInDays)} days ago`
  } else if (diffInDays < 14) {
    return 'last week'
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} weeks ago`
  } else if (diffInDays < 60) {
    return 'last month'
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} months ago`
  } else if (diffInDays < 730) {
    return 'last year'
  } else {
    return `${Math.floor(diffInDays / 365)} years ago`
  }
}  