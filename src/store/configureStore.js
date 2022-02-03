import { createStore, combineReducers } from 'redux';
import expencesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

const store = createStore(combineReducers({
    expenses: expencesReducer,
    filters: filtersReducer
}),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;