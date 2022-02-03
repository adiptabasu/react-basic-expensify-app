import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';

const ExpenseListItem = (props) => {
    let removeItem = () => {
        props.dispatch(removeExpense({ id: props.id }));
    };
    return (
        <div>
            <Link to={`/edit/${props.id}`}>
                <h3>
                    {props.description}
                </h3>
            </Link>
            <p>
                {props.amount}-{props.createdAt}
            </p>
            <button onClick={removeItem}>Remove</button>
        </div>
    );
};

const ConnectedExpenseListItem = connect()(ExpenseListItem);

export default ConnectedExpenseListItem;

export { ExpenseListItem };