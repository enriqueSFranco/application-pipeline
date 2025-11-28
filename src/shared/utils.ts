import { twMerge, ClassNameValue } from 'tailwind-merge';
import clsx from 'clsx';

export const cn = (...inputs: ClassNameValue[]) => {
  return twMerge(clsx(inputs));
};

