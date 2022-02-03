import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Info</h1>
        <p>The info is {props.info} </p>
    </div>
);

const withAdminWarning = (WrappedComponent) => {
    return (props) => {
        return (<div>
            {props.isAuthenticated && <p>This is private info, please dont share</p>}
            <WrappedComponent {...props} />
        </div>);
    };
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (<div>
        {props.isAuthenticated ? <WrappedComponent {...props} /> : <p>Please log in</p>}
    </div>);
};

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info='Thers are the details' />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={true} info='Thers are the details' />, document.getElementById('app'));