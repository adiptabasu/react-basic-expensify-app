import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
// import history from 'history/browser';
import store from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import '../src/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// store.dispatch(addExpense({ description: 'water bill', amount: 4500 }));
// store.dispatch(addExpense({ description: 'gas bill' }));
// store.dispatch(setTextFilter({ text: 'bill' }));
// store.dispatch(addExpense({ description: 'water bill', amount: 19000, createdAt: 1000 }));
let state = store.getState();
// const visibleExpenses = getVisibleExpences(state.expenses, state.filters);
// console.log(visibleExpenses);

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
// ReactDOM.render(<p>Loading</p>, document.getElementById('app'));
ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));
// const setupData = startSetExpenses({});

// console.log('setupData', setupData);

// store.dispatch(startSetExpenses()).then(() => {
//     ReactDOM.render(jsx, document.getElementById('app'));
// });

let hasRendered = false;

const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
        });
        if (history.location.pathname == '/') {
            history.push('/dashboard');
        }
    }
    else {
        store.dispatch(logout());
        renderApp();
        history.push('/');
    }
});