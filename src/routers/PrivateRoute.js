import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../components/Header';

const PrivateRoute = (props) => {
    const renderData = props.isAuthenticated ? (
        <div>
            <div><Header /></div>
            {props.children}
        </div>
    ) :
        (<Navigate to='/' />);
    return (renderData);
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

const ConnectedPrivateRoute = connect(mapStateToProps)(PrivateRoute);

export { ConnectedPrivateRoute as default, PrivateRoute };