import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = (props) => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Add Expense</h1>
            <ExpenseForm
                onSubmit={(expense) => {
                    // console.log('Inside AddExpensePage');
                    // props.dispatch(addExpense(expense));
                    props.onSubmit(expense);
                    navigate('/');
                }}
            />
        </div>
    );
};

const mapDispatchToProps = (dispatch) => (({ onSubmit: (expense => dispatch(addExpense(expense))) }))

const ConnectedAddExpensePage = connect(undefined, mapDispatchToProps)(AddExpensePage);

export default ConnectedAddExpensePage;