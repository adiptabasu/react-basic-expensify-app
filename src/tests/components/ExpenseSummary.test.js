import { test, expect } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';
import expenses from '../fixtures/expenses';

test('should correctly render Expense Summary with one expense', () => {
    const wrapper = shallow(<ExpenseSummary
        expenseCount={1}
        expensesTotal={235}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should correctly render Expense Summary with multiple expenses', () => {
    const wrapper = shallow(<ExpenseSummary
        expenseCount={2}
        expensesTotal={735}
    />);
    expect(wrapper).toMatchSnapshot();
});