// Parses a 'YYYY-MM-DD' string as local time instead of UTC, so displayed
// month/year never shifts backward in timezones behind UTC.
export function parseLocalDate(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function formatMonthYear(dateStr: string): string {
  return parseLocalDate(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}
