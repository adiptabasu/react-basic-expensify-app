import React from 'react';
import { NavLink } from 'react-router-dom'

const Header = () => (
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
        </header>
    </div>
);

export default Header;