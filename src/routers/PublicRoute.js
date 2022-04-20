import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = (props) => {
    const renderData = !props.isAuthenticated ? (
        <div>
            {props.children}
        </div>
    ) :
        (<Navigate to='/dashboard' />);
    return (renderData);
};

const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

const ConnectedPublicRoute = connect(mapStateToProps)(PublicRoute);

export { ConnectedPublicRoute as default, PublicRoute };