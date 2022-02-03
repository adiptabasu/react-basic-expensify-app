import { test, expect } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListItem } from '../../components/ExpenseListItem';
import expenses from '../fixtures/expenses';

test('should render the expense list item with expenses', () => {
    const singleExpense = expenses[1];
    const wrapper = shallow(<ExpenseListItem
        key={singleExpense.id}
        {...singleExpense}
    />);
    expect(wrapper).toMatchSnapshot();
});