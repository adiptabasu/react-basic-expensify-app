import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRomoveExpense } from '../actions/expenses';
import moment from 'moment';
import numeral from 'numeral';

const ExpenseListItem = (props) => {
    let removeItem = () => {
        props.dispatch(startRomoveExpense({ id: props.id }));
    };
    return (
        <Link className="list-item" to={`/edit/${props.id}`}>
            <div>
                <h3 className="list-item__title">
                    {props.description}
                </h3>
                <span className="list-item__sub-title">{moment(props.createdAt).format('MMMM Do, YYYY')}</span>
            </div>
            <h3 className="list-item__data">{numeral(props.amount / 100).format('$0,0.00')}</h3>
            {/* <button onClick={removeItem}>Remove</button> */}
        </Link>
    );
};

const ConnectedExpenseListItem = connect()(ExpenseListItem);

export default ConnectedExpenseListItem;

export { ExpenseListItem };