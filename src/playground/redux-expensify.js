import { createStore, combineReducers } from 'redux';
import { v4 as uuid } from 'uuid';
// SampleObjectStruct
// const demoState = {
//     expenses: [{
//         id: '1234',
//         description: 'Buy something',
//         notes: 'Some note',
//         amount: 54500,//keeping it in paisa
//         createdAt: 0
//     }],
//     filters: {
//         text: 'some',
//         sortBy: 'date',//Date or Amount
//         startDate: undefined,
//         endDate: undefined
//     }
// };

//Action Generator
const addExpense = ({
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
}) => ({
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

const setTextFilter = ({ text = '' } = {}) => ({
    type: 'SET_TEXT_FILTER',
    text
});

const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT'
});
const sortByDate = () => ({
    type: 'SORT_BY_DATE'
});
const setStartDate = ({ startDate = undefined } = {}) => ({
    type: 'SET_START_DATE',
    startDate
});
const setEndDate = ({ endDate = undefined } = {}) => ({
    type: 'SET_END_DATE',
    endDate
});
//Expences Reducer
const expencesReducerDefaultState = [];
const expencesReducer = (state = expencesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE': {
            // console.log(action.expense)
            // return state.concat(action.expense);
            return [...state, action.expense];
            break;
        }
        case 'REMOVE_EXPENSE': {
            return state.filter((expense) => expense.id != action.id);
            break;
        }
        case 'EDIT_EXPENSE': {
            return state.map((expense) => {
                if (expense.id == action.id) {
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                else {
                    return expense;
                }
            })
            break;
        }
        default: {
            return state;
            break;
        }
    }
};

const filtersReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};
const filtersReducer = (state = filtersReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER': {
            return {
                ...state,
                text: action.text
            }
            break;
        }
        case 'SORT_BY_AMOUNT': {
            return {
                ...state,
                sortBy: 'amount'
            }
            break;
        }
        case 'SORT_BY_DATE': {
            return {
                ...state,
                sortBy: 'date'
            }
            break;
        }
        case 'SET_START_DATE': {
            return {
                ...state,
                startDate: action.startDate
            }
            break;
        }
        case 'SET_END_DATE': {
            return {
                ...state,
                endDate: action.endDate
            }
            break;
        }
        default: {
            return state;
            break;
        }
    }
};

const getVisibleExpences = (expenses, { text, sortBy, startDate, endDate }) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate != "number" || expense.createdAt >= startDate;
        const endDateMatch = typeof endDate != "number" || expense.createdAt <= endDate;
        const textMatch = text.trim().length <= 0 ? true : (expense.description.toLowerCase().includes(text.toLowerCase()));
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy == 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        }
        else if (sortBy == 'amount') {
            // console.log(a.amount - b.amount);
            return a.amount < b.amount ? 1 : -1;
        }
    });
}

const store = createStore(combineReducers({
    expenses: expencesReducer,
    filters: filtersReducer
}));

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getVisibleExpences(state.expenses, state.filters);
    console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({
    description: 'Rent',
    note: '',
    amount: 1000,
    createdAt: -1000
}));

const expenseTwo = store.dispatch(addExpense({
    description: 'Coffee',
    note: '',
    amount: 300,
    createdAt: 1000
}));

// store.dispatch(removeExpense({ id: expenseOne.expense.id }));

// store.dispatch(editExpense({
//     id: expenseTwo.expense.id,
//     updates: { amount: 700 }
// }));

// store.dispatch(setTextFilter({ text: 'fe' }));
// store.dispatch(setTextFilter());
store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
// store.dispatch(setStartDate({ startDate: 125 }));
// store.dispatch(setEndDate({ endDate: 10000 }));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());