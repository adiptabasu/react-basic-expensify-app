import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';
import { useNavigate } from 'react-router-dom';

const AddExpensePage = (props) => {
    const navigate = useNavigate();
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className="page-header__title">Add Expense</h1>
                </div>
            </div>
            <div className="content-container">
                <ExpenseForm
                    onSubmit={(expense) => {
                        // console.log('Inside AddExpensePage');
                        // props.dispatch(addExpense(expense));
                        props.onSubmit(expense);
                        navigate('/');
                    }}
                />
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => (({ onSubmit: (expense => dispatch(startAddExpense(expense))) }))

const ConnectedAddExpensePage = connect(undefined, mapDispatchToProps)(AddExpensePage);

export default ConnectedAddExpensePage;