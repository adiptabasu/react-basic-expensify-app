import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filterReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to Amount', () => {
    const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to Date', () => {
    const currentState = {
        test: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };
    const action = { type: 'SORT_BY_DATE' };
    const state = filterReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const state = filterReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'filterText' });
    expect(state.text).toBe('filterText');
});

test('should set startDate filter', () => {
    const startDate = moment().startOf('month');
    const state = filterReducer(undefined, { type: 'SET_START_DATE', startDate });
    expect(state.startDate).toBe(startDate);
});

test('should set endDate filter', () => {
    const endDate = moment().endOf('month');
    const state = filterReducer(undefined, { type: 'SET_END_DATE', endDate });
    expect(state.endDate).toBe(endDate);
});