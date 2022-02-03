import { test, expect } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';

test('should render expense form currently', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper).toMatchSnapshot();
});

test('should render the Expense for Correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]} />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />);
    // expect(wrapper).toMatchSnapshot();
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot();
});

test('should set description on input change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'New Description';
    wrapper.find('input').at(0).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('description')).toBe(value);
});

test('should set note on text area change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = 'New Updated Text Area';
    // console.log(wrapper.find('textarea'));
    wrapper.find('textarea').simulate('change', {
        target: { value }
    });
    expect(wrapper.state('note')).toBe(value);
});

test('should set the amount to valid amount', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "12.50";
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe(value);
});

test('should not set the amount to invalid amount', () => {
    const wrapper = shallow(<ExpenseForm />);
    const value = "12.501";
    wrapper.find('input').at(1).simulate('change', {
        target: { value }
    });
    expect(wrapper.state('amount')).toBe("");
});

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn();
    // onSubmitSpy('adipta', 'kolkata');
    // expect(onSubmitSpy).toHaveBeenCalledWith('adipta', 'kolkata');
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => { }
    });
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt,
        description: expenses[0].description,
        note: expenses[0].note
    });
});

test('should call onDateChange prop for valid date change', () => {
    const wrapper = shallow(<ExpenseForm />);
    const now = moment();
    // const onDateChange = jest.fn();
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should change the state on focus change', () => {
    const wrapper = shallow(<ExpenseForm />);
    expect(wrapper.state('calenderFocused')).not.toEqual(true);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused: true });
    expect(wrapper.state('calenderFocused')).toEqual(true);
});