import { test, expect } from '@jest/globals';
import selectExpenseTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
    const res = selectExpenseTotal([]);
    expect(res).toBe(0);
});

test('should add up a single expense', () => {
    const res = selectExpenseTotal([expenses[0]]);
    expect(res).toBe(expenses[0].amount);
});

test('should add up a multiple expense', () => {
    const res = selectExpenseTotal(expenses);
    expect(res).toBe(24195);
});