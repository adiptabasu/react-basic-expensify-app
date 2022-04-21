import React from 'react';
import { connect } from 'react-redux';
import { startLogin } from '../actions/auth';
// import { useNavigate } from 'react-router-dom';
import { bindActionCreators } from 'redux';

const LoginPage = (props) => {
    // console.log(props);
    // const navigate = useNavigate();
    return (
        <div className="box-layout">
            <div className="box-layout__box">
                <h1 className="box-layout__title">Expensify</h1>
                <p>It's time to get your expenses under control</p>
                <button className="button" onClick={props.startLogin}>Login with Google</button>
            </div>
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