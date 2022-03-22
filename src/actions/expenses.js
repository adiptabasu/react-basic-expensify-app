import { v4 as uuid } from 'uuid';
import db, { push, ref } from '../firebase/firebase';
const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        const expense = {
            description,
            note,
            amount,
            createdAt
        }
        return push(ref(db, 'expenses'), expense).then((ref) => {
            dispatch(addExpense({
                id: ref.key,
                ...expense
            }))
        });
    };
};

const removeExpense = ({ id = undefined } = {}) => ({
    type: 'REMOVE_EXPENSE',
    id
});

const editExpense = ({ id, updates }) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export { addExpense, removeExpense, editExpense };