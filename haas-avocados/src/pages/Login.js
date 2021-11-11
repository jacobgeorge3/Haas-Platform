/**
 * Login.js
 * Temp for landing
 */

import React from "react";
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { TextField } from "@mui/material"; /* you were just using the wrong import */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { TextFieldWrapper } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { Button } from "../components/button.style";
import "../styles/login.css";

const Login = () => {

  return (
    <div className="login-container">
      <h1>Login</h1>
      <div className="login-sub-container">
        <TextFieldWrapper>
          <TextField color="primary" label="Username" />
        </TextFieldWrapper>

        <TextFieldWrapper>
          <TextField color="primary" label="Password" />
        </TextFieldWrapper>

        <a href="/login">Forgot password</a>
      </div>

      <div>
        <Button>BUTTON</Button>
        <Button>BUTTON</Button>
      </div>
    </div>
  );
};

export default Login;
