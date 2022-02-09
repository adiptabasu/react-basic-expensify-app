import { v4 as uuid } from 'uuid';
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        amount,
        createdAt
    }
});

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