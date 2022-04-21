import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

const Header = (props) => (
    <div>
        <header className="header">
            <div className="content-container">
                <div className="header__content">
                    {/* <h1>Expensify</h1> */}
                    <Link
                        to="/dashboard"
                        className="header__title"
                    // activeClassName="is-active"
                    // className={(props) => ("nav-link " + (props.isActive ? "is-active" : undefined))}
                    ><h1>Expensify</h1></Link>
                    {/* <NavLink
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
            >Help</NavLink> */}
                    <button className="button button--link" onClick={props.startLogout}>
                        Logout
                </button>
                </div>
            </div>
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