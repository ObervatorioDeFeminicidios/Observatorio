import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a text to the title case
 * @param s Text to be converted
 * @returns Text with the title format
 */
export const titleCase = (s: string) =>
  s
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase())
    .replace(/[-_]+(.)/g, (_, c) => ' ' + c.toUpperCase());

// Format a text to the capitalize case
const capitalize = (str: string) =>
  str
    .split(' ')
    .map(([first, ...rest]) => [first.toUpperCase(), ...rest].join(''))
    .join(' ');

/**
 * Capitalize each word of a text
 * @param text Text to be converted
 * @returns Text with the each word capitalized
 */
export const capitalizeEachWord = (text: string) => {
  const words = text.toLocaleLowerCase().split(' ');
  const wordsCapitalized = words.map((word) => capitalize(word));
  return wordsCapitalized.join(' ');
};
