import { child } from 'firebase/database';
import { v4 as uuid } from 'uuid';
import db, { push, ref, onValue, remove, update, get } from '../firebase/firebase';
const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

export const startAddExpense = (expenseData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        // console.log('data->', uid);
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
        return push(ref(db, `users/${uid}/expenses`), expense).then((ref) => {
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

const startRomoveExpense = ({ id } = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return remove(ref(db, `users/${uid}/expenses/${id}`)).then(() => {
            dispatch(removeExpense({ id }));
        });
    };
};

const editExpense = ({ id, updates }) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

// const startEditExpense = ({ id, updates }) => {
//     return (dispatch) => {
//         return update(ref(db, `expenses/${id}`), updates).then(() => {
//             dispatch(editExpense(id, updates));
//         });
//     };
// }

const startEditExpense = ({ id, updates }) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        return update(ref(db, `users/${uid}/expenses/${id}`), updates).then(() => {
            dispatch(editExpense({ id, updates }));
        });
    };
};

const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

const startSetExpenses_old = (expensesData = {}) => {
    return (dispatch) => {
        return onValue(ref(db, 'expenses'), (snapshot) => {
            const expenses = [];
            snapshot.forEach((childSnap) => {
                expenses.push({
                    id: childSnap.key,
                    ...childSnap.val()
                })
            })
            dispatch(setExpenses(expenses));
            // const setStartExpensePromise = new Promise((resolve, reject) => {
            //     resolve(dispatch(setExpenses(expenses)));
            // });
            // console.log('promise', setStartExpensePromise);
            // return setStartExpensePromise;
        }, { onlyOnce: true }, (e) => {
            console.log('Error is ', e);
        });
    };
};

const startSetExpenses = (expensesData = {}) => {
    return (dispatch, getState) => {
        const uid = getState().auth.uid;
        let expenses = [];
        return get(child(ref(db), `users/${uid}/expenses`)).then((snapshot) => {
            if (snapshot.exists()) {
                snapshot.forEach((childSnap) => {
                    expenses.push({
                        id: childSnap.key,
                        ...childSnap.val()
                    })
                });
            }
            dispatch(setExpenses(expenses))
        });
    }
};

export { addExpense, removeExpense, editExpense, setExpenses, startSetExpenses, startRomoveExpense, startEditExpense };