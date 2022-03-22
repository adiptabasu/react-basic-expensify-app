// import { test, expect } from 'jest';
import { expect, test } from '@jest/globals';
import { addExpense, editExpense, removeExpense, startAddExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import db, { ref, onValue } from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should set up remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
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