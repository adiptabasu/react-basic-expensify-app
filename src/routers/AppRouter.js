import React from 'react';
import { BrowserRouter, Route, Routes, Router, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import Header from '../components/Header';
import HelpPage from '../components/HelpPage';
import LoginPage from '../components/LoginPage';
import NotFoundPage from '../components/NotFoundPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

let history = createBrowserHistory();
// let navigate = useNavigate();
// let history=His;

const AppRouter = () => (

    <HistoryRouter history={history}>
        {/* <div><Header /></div> */}
        <Routes>
            <Route
                path="/"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <ExpenseDashboardPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/create"
                element={
                    <PrivateRoute>
                        <AddExpensePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <PrivateRoute>
                        <EditExpensePage />
                    </PrivateRoute>
                }
            />
            {/* <Route
                path="/help"
                element={<HelpPage />}
            /> */}
            <Route
                path="*"
                element={<NotFoundPage />}
            />
        </Routes>
    </HistoryRouter>
);

export { AppRouter as default, history };