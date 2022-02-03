import expencesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set the default state', () => {
    const state = expencesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    }
    const state = expencesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense by id, if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    }
    const state = expencesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should edit an expense if id is found', () => {
    const updatedText = 'thisIsUpdated'
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            text: updatedText
        }
    };
    const state = expencesReducer(expenses, action);
    state.map(expense => {
        if (expense.id == expenses[1].id)
            expect(expense.text).toBe(updatedText);
    });
});

test('should not update an expense if it is not found', () => {
    const updatedText = 'thisIsUpdated'
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            text: updatedText
        }
    };
    const state = expencesReducer(expenses, action);
    expect(state).toEqual(expenses);
})
