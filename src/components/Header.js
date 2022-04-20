import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const Header = (props) => (
    <div>
        <header>
            <h1>Expensify</h1>
            <NavLink
                to="/"
                // activeClassName="is-active"
                className={(props) => ("nav-link " + (props.isActive ? "is-active" : undefined))}
            >Home</NavLink>
            <NavLink
                to="/create"
                // activeClassName="is-active"
                className={(props) => ("nav-link " + (props.isActive ? "is-active" : undefined))}
            >Create Expense</NavLink>
            <NavLink
                to="/edit"
                // activeClassName="is-active"
                className={(props) => ("nav-link " + (props.isActive ? "is-active" : undefined))}
            >Edit</NavLink>
            <NavLink
                to="/help"
                // activeClassName="is-active"
                className={(props) => ("nav-link " + (props.isActive ? "is-active" : undefined))}
            >Help</NavLink>
            <button onClick={props.startLogout}>
                Logout
            </button>
        </header>
    </div>
);

const mapDispatchToProps = (dispatch) => ({
    // startLogout,
    // dispatch
    startLogout: () => dispatch(startLogout())
});

const ConnectedHeader = connect(undefined, mapDispatchToProps)(Header);

export { ConnectedHeader as default, Header };