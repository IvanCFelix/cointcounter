// Pure budget logic, no imports so it can be checked with plain node (see budget.check.ts).

export type Group = 'necesidades' | 'deseos' | 'ahorro';
export type Frequency = 'semanal' | 'quincenal' | 'mensual';
export type Payment = 'efectivo' | 'debito' | 'credito';
export type SortMode = 'reciente' | 'antiguo' | 'mayor' | 'menor';
export type ModelName = '50/30/20' | '70/20/10' | '60/20/20' | '40/20/40';

export const CATEGORIES: Record<string, Group> = {
  Comida: 'necesidades',
  Despensa: 'necesidades',
  Gasolina: 'necesidades',
  'Mantenimiento vehículo': 'necesidades',
  'Pago de servicio': 'necesidades',
  Salud: 'necesidades',
  Escuela: 'necesidades',
  Tarea: 'necesidades',
  Ropa: 'deseos',
  Salida: 'deseos',
  Entretenimiento: 'deseos',
  Belleza: 'deseos',
  'Gastos varios': 'deseos',
  Ahorro: 'ahorro',
  Emergencia: 'ahorro',
};

// From the "Guía de distribución del sueldo" table. 70/20/10: needs+wants share 70%, savings gets 20+10.
export const MODELS: Record<ModelName, Record<Group, number>> = {
  '50/30/20': { necesidades: 0.5, deseos: 0.3, ahorro: 0.2 },
  '70/20/10': { necesidades: 0.7, deseos: 0.7, ahorro: 0.3 }, // necesidades+deseos pooled, see generateAllocations
  '60/20/20': { necesidades: 0.6, deseos: 0.2, ahorro: 0.2 },
  '40/20/40': { necesidades: 0.4, deseos: 0.2, ahorro: 0.4 },
};

export const allCategories = (custom: string[] = []) => [
  ...Object.keys(CATEGORIES),
  ...custom.filter((c) => !(c in CATEGORIES)),
];

const groupOf = (cat: string): Group => CATEGORIES[cat] ?? 'deseos';
const round2 = (n: number) => Math.round(n * 100) / 100;

export function generateAllocations(pool: number, model: ModelName, custom: string[] = []) {
  const cats = allCategories(custom);
  const pct = MODELS[model];
  const pooled = model === '70/20/10';
  const sizeOf = (g: Group) =>
    cats.filter((c) => (pooled && g !== 'ahorro' ? groupOf(c) !== 'ahorro' : groupOf(c) === g)).length;
  const out: Record<string, number> = {};
  for (const c of cats) {
    const g = groupOf(c);
    out[c] = round2((pool * pct[g]) / sizeOf(g));
  }
  return out;
}

export const FREQ_FACTOR: Record<Frequency, number> = { semanal: 4, quincenal: 2, mensual: 1 };
// shortcut: weekly = x4 (not 4.33), switch to a per-period cut if the user wants exact weeks.
export const monthlyPool = (amount: number, f: Frequency) => round2(amount * FREQ_FACTOR[f]);

export const monthKey = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;

export function sortExpenses<T extends { amount: number; date: Date }>(list: T[], mode: SortMode): T[] {
  const by: Record<SortMode, (a: T, b: T) => number> = {
    reciente: (a, b) => b.date.getTime() - a.date.getTime(),
    antiguo: (a, b) => a.date.getTime() - b.date.getTime(),
    mayor: (a, b) => b.amount - a.amount,
    menor: (a, b) => a.amount - b.amount,
  };
  return [...list].sort(by[mode]);
}

export const crossed = (before: number, after: number, limit: number, ratio: number) =>
  limit > 0 && before < limit * ratio && after >= limit * ratio;

export const sum = (xs: number[]) => round2(xs.reduce((a, b) => a + b, 0));

export function totalsByCategory(list: { category: string; amount: number }[]) {
  const out: Record<string, number> = {};
  for (const e of list) out[e.category] = round2((out[e.category] ?? 0) + e.amount);
  return out;
}
