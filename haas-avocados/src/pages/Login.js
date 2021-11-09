/**
 * Login.js
 * Temp for landing
 */

import React from "react";
// import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {TextField} from '@material-ui/core';
import { Button } from "/Users/sampippen/Documents/GitHub/EE461L_Final_Project/haas-avocados/src/components/button.style.js";
import "/Users/sampippen/Documents/GitHub/EE461L_Final_Project/haas-avocados/src/styles/login.css";

function Login(){
    function clickHandler() {
        console.log("click")
    }

    return (
        <div>
            <h1>Login</h1>
            <div className='login-container'>
                <div className='login-input'>
                    <TextField className='textfield' variant="outlined" label="Username" focused/>
                </div>
                <div>
                    <TextField className='textfield' variant="outlined" label="Password" focused />
                </div>        
                <div className='forgot'>
                    <a href="/login">Forgot password</a>
                </div>
            </div>
          
            <div className='buttons-container'>
                <Button onclick="clickHandler()">
                    Log in
                </Button>
                <Button>
                    Register
                </Button>
            </div>    
        </div>
    )
}
 
export default Login;
