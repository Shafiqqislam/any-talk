import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './features/firebase';
import "./Login.css"
import logo from "./logo.png";

const Login = () => {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch((error)=>alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__logo">
                <img src={logo} alt="" />
                <h1 className="logo__name">AnyTalk</h1>
            </div>
            <Button onClick={signIn}>Sign In</Button>
        </div>
    );
};

export default Login;