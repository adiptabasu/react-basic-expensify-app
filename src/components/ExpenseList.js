import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectedExpenses from '../selectors/expenses';

const ExpenseList = (props) => (
    <div>
        {props.expenses.length == 0 ? (
            <p>No expenses</p>
        ) : (
                props.expenses.map((expense) => (
                    <ExpenseListItem
                        key={expense.id}
                        {...expense} />
                ))
            )}
    </div>
);

const mapStateToProps = (state) => {
    return {
        // expenses: state.expenses,
        // filters: state.filters
        expenses: selectedExpenses(state.expenses, state.filters)
    }
}

const ConnectedExpenseList = connect(mapStateToProps)(ExpenseList);

export default ConnectedExpenseList;
export { ExpenseList };