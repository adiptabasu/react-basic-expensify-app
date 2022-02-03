import { setTextFilter, sortByAmount, sortByDate, setEndDate, setStartDate } from '../../actions/filters';
import moment from 'moment';

test('should generate set start date action object', () => {
    const action = setStartDate({ startDate: moment(0) });
    expect(action).toEqual({
        type: 'SET_START_DATE',
        startDate: moment(0)
    });
});

test('should generate set end date action object', () => {
    const action = setEndDate({ endDate: moment(0) });
    expect(action).toEqual({
        type: 'SET_END_DATE',
        endDate: moment(0)
    })
});

test('should generate set text filter action object', () => {
    const textFilter = 'testfilter'
    const action = setTextFilter({ text: textFilter });
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: textFilter
    })
});

test('should generate set text filter action object as null', () => {
    const textFilter = ''
    const action = setTextFilter({ text: textFilter });
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: textFilter
    })
});

test('should generate sort by amount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    })
});

test('should generate sort by date action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    })
});