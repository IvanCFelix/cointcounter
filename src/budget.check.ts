// Run: node src/budget.check.ts
import assert from 'node:assert/strict';
import {
  allCategories,
  crossed,
  generateAllocations,
  monthKey,
  monthlyPool,
  sortExpenses,
  sum,
  type ModelName,
} from './budget.ts';

for (const m of ['50/30/20', '70/20/10', '60/20/20', '40/20/40'] as ModelName[]) {
  const a = generateAllocations(10000, m, ['Mascotas']);
  assert.equal(Object.keys(a).length, allCategories(['Mascotas']).length);
  assert.ok(Math.abs(sum(Object.values(a)) - 10000) < 1, `${m} sums to pool`);
}
const a = generateAllocations(10000, '50/30/20');
assert.equal(sum(['Ahorro', 'Emergencia'].map((c) => a[c])), 2000);

assert.equal(monthlyPool(1000, 'quincenal'), 2000);
assert.equal(monthKey(new Date(2026, 0, 31)), '2026-01');

const list = [
  { amount: 5, date: new Date(2026, 0, 2) },
  { amount: 50, date: new Date(2026, 0, 1) },
  { amount: 20, date: new Date(2026, 0, 3) },
];
assert.deepEqual(sortExpenses(list, 'reciente').map((x) => x.amount), [20, 5, 50]);
assert.deepEqual(sortExpenses(list, 'antiguo').map((x) => x.amount), [50, 5, 20]);
assert.deepEqual(sortExpenses(list, 'mayor').map((x) => x.amount), [50, 20, 5]);
assert.deepEqual(sortExpenses(list, 'menor').map((x) => x.amount), [5, 20, 50]);

assert.equal(crossed(70, 85, 100, 0.8), true);
assert.equal(crossed(81, 90, 100, 0.8), false);
assert.equal(crossed(0, 90, 0, 0.8), false);

console.log('budget.check ok');
