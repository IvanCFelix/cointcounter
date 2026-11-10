const money = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' });
export const formatMoney = (n: number) => money.format(n);
export const formatDate = (d: Date) => d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
export const formatMonth = (key: string) => {
  const [y, m] = key.split('-').map(Number);
  const s = new Date(y, m - 1, 1).toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
  return s[0].toUpperCase() + s.slice(1);
};
/** Accepts "1,234.50" or "1234,5"; returns NaN when not a number. */
export const parseAmount = (s: string) => Number(s.replace(/,(?=\d{3}\b)/g, '').replace(',', '.'));
