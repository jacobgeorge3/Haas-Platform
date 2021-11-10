/**
 * Login.js
 * Temp for landing
 */

 import React from "react";
 import {useState} from 'react';
 import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
 import {TextField} from '@material-ui/core';
 import Typography from "@mui/material/Typography";
 import "../styles/login.css";

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
 
export default Login;
