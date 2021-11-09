/**
 * Login.js
 * Temp for landing
 */

<<<<<<< Updated upstream
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
=======
 import React from "react";
 import {useState} from 'react';
 import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 import {TextField} from '@material-ui/core';
 import Typography from "@mui/material/Typography";
 import "/Users/sampippen/Documents/GitHub/EE461L_Final_Project/haas-avocados/src/styles/login.css";

 function Login(){
     return (
       <div className="login-container">
          <h1>Login</h1>
          <div className='login-sub-container'>
              <div className='login-input'>
                  <TextField 
                      className='textfield' 
                      variant="outlined" 
                      label="Username" 
                      focused
                      sx={{root: {
                        '& label.Mui-focused': {
                          color: 'white',
                        }}}}
                  />
              </div>
              <div>
                  <TextField 
                    className='textfield' 
                    variant="outlined" 
                    label="Password" 
                    focused />
              </div>        
              <div>
                  <a href="/login">Forgot password</a>
              </div>
          </div>
          
          

          <div>
              <button>
                  BUTTON
              </button>
              <button>
                   BUTTON
              </button>
          </div>    
       </div>
     )
 }
>>>>>>> Stashed changes
 
export default Login;
