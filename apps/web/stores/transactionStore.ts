import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, TransactionFilters, TransactionType } from '@dashboard/types';
import { mockTransactions } from '../lib/mockData';

interface TransactionState {
    transactions: Transaction[];
    filters: TransactionFilters;
    setFilters: (filters: Partial<TransactionFilters>) => void;
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    deleteTransaction: (id: string) => void;
    getFilteredTransactions: () => Transaction[];
}

export const useTransactionStore = create<TransactionState>()(
    persist(
        (set, get) => ({
            transactions: mockTransactions,
            filters: {
                search: '',
                startDate: null,
                endDate: null,
                category: null,
                type: 'all',
            },

            setFilters: (newFilters) => {
                set((state) => ({
                    filters: { ...state.filters, ...newFilters },
                }));
            },

            addTransaction: (transaction) => {
                const newTransaction: Transaction = {
                    ...transaction,
                    id: Date.now().toString(),
                };
                set((state) => ({
                    transactions: [newTransaction, ...state.transactions],
                }));
            },

            deleteTransaction: (id) => {
                set((state) => ({
                    transactions: state.transactions.filter((t) => t.id !== id),
                }));
            },

            getFilteredTransactions: () => {
                const { transactions, filters } = get();
                return transactions.filter((transaction) => {
                    // Search filter
                    if (filters.search && !transaction.description.toLowerCase().includes(filters.search.toLowerCase())) {
                        return false;
                    }

                    // Type filter
                    if (filters.type !== 'all' && transaction.type !== filters.type) {
                        return false;
                    }

                    // Category filter
                    if (filters.category && transaction.category !== filters.category) {
                        return false;
                    }

                    // Date range filter
                    if (filters.startDate && new Date(transaction.date) < new Date(filters.startDate)) {
                        return false;
                    }
                    if (filters.endDate && new Date(transaction.date) > new Date(filters.endDate)) {
                        return false;
                    }

                    return true;
                });
            },
        }),
        {
            name: 'transaction-storage',
        }
    )
);
