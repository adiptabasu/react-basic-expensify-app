import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
// import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const LoginPage = (props) => {
    // console.log(props);
    // const navigate = useNavigate();
    return (
        <div>
            <button onClick={props.startLogin}>Login</button>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    // startLogin,
    // dispatch
    startLogin: () => dispatch(startLogin())
});

const ConnectedLoginPage = connect(undefined, mapDispatchToProps)(LoginPage);

export { ConnectedLoginPage as default, LoginPage };