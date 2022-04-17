import { v4 as uuid } from 'uuid';
import db, { push, ref, onValue, get } from '../firebase/firebase';
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

const setExpenses = (expenses) => ({
    type: 'SET_EXPENSES',
    expenses
});

const startSetExpenses = (expensesData = {}) => {
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

// const startSetExpenses = (dispatch) => {
//     return (dispatch) => {
//         const dbRef = ref(db)
//         return get(child(dbRef, 'expense')).then((snapshot) => {
//             if (snapshot.exists()) {
//                 const expenses = []
//                 snapshot.forEach((childSnapshot) => {
//                     expenses.push({
//                         id: childSnapshot.key,
//                         ...childSnapshot.val(),
//                     });
//                 });
//                 dispatch(setExpenses(expenses))
//             } else {
//                 console.log("No data available");
//             }
//         }).catch((error) => {
//             console.error(error);
//         });
//     }
// }

export { addExpense, removeExpense, editExpense, setExpenses, startSetExpenses };