import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import LoadingPage from './components/LoadingPage';
// import history from 'history/browser';
import store from './store/configureStore';
import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import '../src/firebase/firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

let state = store.getState();

const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);
ReactDOM.render(<LoadingPage />, document.getElementById('app'));

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