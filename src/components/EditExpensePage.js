import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRomoveExpense } from '../actions/expenses';

const EditExpensePage = (props) => {
    let params = useParams();
    const navigate = useNavigate();
    const expenseSelected = props.expenses.find((exp) => (exp.id == params.id));
    console.log(expenseSelected);
    return (<div>
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title">Edit Expense</h1>
            </div>
        </div>
        <div className="content-container">
            <ExpenseForm
                expense={expenseSelected}
                onSubmit={(expense) => {
                    console.log('updated', expense);
                    props.dispatch(startEditExpense({ id: params.id, updates: expense }));
                    navigate('/');
                }}
            />
            <button
                onClick={() => {
                    props.dispatch(startRomoveExpense({ id: params.id }));
                    navigate('/');
                }}
                className="button button-secondary"
            >Remove</button>
        </div>
    </div>);
};

const mapStateToProps = (state) => {
    return ({
        expenses: state.expenses
    });
}

const ConnectedEditExpensePage = connect(mapStateToProps)(EditExpensePage);

export default ConnectedEditExpensePage;