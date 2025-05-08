/**
 * Format a date to dd/mm/yyyy
 * @param date The date to format
 * @returns The formatted date string
 */
export function formatDate(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  
  return `${day}/${month}/${year}`;
}

/**
 * Format a date to a localized string with custom options
 * @param date The date to format
 * @param options The Intl.DateTimeFormatOptions to use
 * @returns The formatted date string
 */
export function formatDateLocalized(
  date: Date, 
  options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  }
): string {
  return new Intl.DateTimeFormat('en-GB', options).format(date);
}
