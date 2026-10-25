import { format, parseISO, isValid } from 'date-fns';

export function formatDate(value: string | undefined, pattern = 'LLLL d, yyyy'): string {
  if (!value) return '';
  const parsed = parseISO(value);
  return isValid(parsed) ? format(parsed, pattern) : '';
}

export function formatYear(value: string | undefined): string {
  return formatDate(value, 'yyyy');
}
