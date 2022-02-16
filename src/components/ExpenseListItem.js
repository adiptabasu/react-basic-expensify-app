import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeExpense } from '../actions/expenses';
import moment from 'moment';
import numeral from 'numeral';

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
                {numeral(props.amount / 100).format('$0,0.00')}
                {/* {props.amount} */}
                -
                {moment(props.createdAt).format('MMMM Do, YYYY')}
            </p>
            <button onClick={removeItem}>Remove</button>
        </div>
    );
};

const ConnectedExpenseListItem = connect()(ExpenseListItem);

export default ConnectedExpenseListItem;

export { ExpenseListItem };