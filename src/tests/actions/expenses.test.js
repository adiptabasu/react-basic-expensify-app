// import { test, expect } from 'jest';
import { expect, test, beforeEach } from '@jest/globals';
import { addExpense, editExpense, removeExpense, startAddExpense, setExpenses, startSetExpenses, startRomoveExpense, startEditExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db, { ref, onValue, set, get } from '../../firebase/firebase';
import { child } from 'firebase/database';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt };
    });
    set(ref(db, 'expenses'), expensesData).then(() => done());
});

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRomoveExpense({ id })).then(() => {
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        onValue(ref(db, `expenses/${id}`), (snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        }, { onlyOnce: true });
    });
});

test('should set up edit expense action object', () => {
    const action = editExpense({ id: '123abc', updates: { note: 'noteupdate' } });
    expect(action).toEqual({
        id: '123abc',
        type: 'EDIT_EXPENSE',
        updates: {
            note: "noteupdate",
        }
    });
});

test('should edit expenses from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = { amount: 2500, description: 'gum updated' };
    store.dispatch(startEditExpense({ id, updates })).then(() => {
        const action = store.getActions();
        // console.log(action);
        expect(action).toEqual([{
            type: 'EDIT_EXPENSE',
            id,
            updates
        }]);
        return get(child(ref(db), `expenses/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                expect(snapshot.val().amount).toBe(updates.amount);
                expect(snapshot.val().description).toBe(updates.description);
                done();
            }
        })

    });
});


test('should setup add expense action with provided values', () => {
    const expenseData = {
        description: 'Rent',
        amount: 127000,
        createdAt: 1000,
        note: 'This is note'
    };
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        // expense: {
        //     ...expenseData,
        //     id: expect.any(String)
        // }
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This is mouse note',
        createdAt: 1000
    }
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        onValue(ref(db, `expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        }, { onlyOnce: true });
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    }
    store.dispatch(startAddExpense(expenseDefaults)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        onValue(ref(db, `expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseDefaults);
            done();
        }, { onlyOnce: true });
    });
});

// test('should setup add expense action with default values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             amount: 0,
//             createdAt: 0,
//             description: '',
//             note: ''
//         }
//     })
// });

test('should set up set expenses action object with data', () => {
    const action = setExpenses(expenses);
    // console.log(action);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
});

// test('should fetch the expenses from firebase', async (done) => {
//     const store = createMockStore();
//     await store.dispatch(startSetExpenses());
//     // console.log(data());
//     await done();
// });

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore();
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        // console.log(actions);
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
    // done();
});