import { onAuthStateChanged, signInAnonymously } from 'firebase/auth';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  increment,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { type Frequency, type ModelName, type Payment, monthKey, monthlyPool } from './budget';
import { auth, db } from './firebase';

export type Expense = {
  id: string;
  title: string;
  amount: number;
  date: Date;
  monthKey: string;
  category: string;
  subconcept: string | null;
  payment: Payment;
  creditMonths: number | null; // 1 = una exhibición
};
export type Budget = { pool: number; frequency?: Frequency; model?: ModelName; allocations?: Record<string, number> };
export type Onboarding = { salary: number; frequency: Frequency; gasoline: number; fixedExpenses: string };
export type UserDoc = { onboarding?: Onboarding; customCategories?: string[] };

const uid = () => auth.currentUser!.uid; // screens only mount after the root layout has a user
const userRef = () => doc(db, 'users', uid());
const expensesCol = () => collection(db, 'users', uid(), 'expenses');
const budgetRef = (m: string) => doc(db, 'users', uid(), 'budgets', m);

export const currentMonth = () => monthKey(new Date());

export function useAuthUser() {
  const [user, setUser] = useState(auth.currentUser);
  const [error, setError] = useState<string | null>(null);
  useEffect(
    () =>
      onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (!u) signInAnonymously(auth).catch((e) => setError(String(e.message ?? e)));
      }),
    []
  );
  return { user, error };
}

export function useUserDoc() {
  const [state, setState] = useState<{ loading: boolean; data: UserDoc | null }>({ loading: true, data: null });
  useEffect(() => onSnapshot(userRef(), (s) => setState({ loading: false, data: (s.data() as UserDoc) ?? null })), []);
  return state;
}

/** month: 'YYYY-MM' for one cut, or 'past' for every cut before the current month. */
export function useExpenses(month: string | 'past') {
  const [list, setList] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // shortcut: 'past' reads every old expense and groups on the client; add a per-month summary doc if it grows.
    const q =
      month === 'past'
        ? query(expensesCol(), where('monthKey', '<', currentMonth()))
        : query(expensesCol(), where('monthKey', '==', month));
    return onSnapshot(q, (s) => {
      setList(s.docs.map((d) => ({ ...(d.data() as Omit<Expense, 'id' | 'date'>), id: d.id, date: d.data().date.toDate() })));
      setLoading(false);
    });
  }, [month]);
  return { list, loading };
}

export function useBudget(month: string) {
  const [budget, setBudget] = useState<Budget | null>(null); // null until the first snapshot
  useEffect(() => onSnapshot(budgetRef(month), (s) => setBudget({ ...(s.data() as Budget), pool: s.data()?.pool ?? 0 })), [month]);
  return budget;
}

export const saveOnboarding = (onboarding: Onboarding) => setDoc(userRef(), { onboarding }, { merge: true });

export const addCustomCategory = (name: string) =>
  setDoc(userRef(), { customCategories: arrayUnion(name) }, { merge: true });

export const addExpense = (e: Omit<Expense, 'id' | 'monthKey'>) =>
  addDoc(expensesCol(), { ...e, date: Timestamp.fromDate(e.date), monthKey: monthKey(e.date), createdAt: Timestamp.now() });

export const addFunds = (month: string, amount: number, frequency: Frequency) =>
  setDoc(budgetRef(month), { pool: increment(monthlyPool(amount, frequency)), frequency }, { merge: true });

// merge:true would deep-merge allocations and keep deleted keys, so allocations are written whole via a field set.
export const saveAllocations = (month: string, model: ModelName, allocations: Record<string, number>) =>
  setDoc(budgetRef(month), { model, allocations }, { mergeFields: ['model', 'allocations'] });
