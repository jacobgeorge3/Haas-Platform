import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material"; /* you were just using the wrong import */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextFieldWrapper } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { Button } from "../components/button.style";
import "../styles/login.css";

const Login = () => {

  const clickHandler = () => {
    console.log("logged in");
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>

      <TextFieldWrapper>
        <TextField color="primary" label="Email Address" />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Password" />
      </TextFieldWrapper>

      <Link to="/login" className='forgot'>Forgot password </Link>

      <div className='login-button-container'>
        <Button onClick={clickHandler}>Login</Button>
        <Link to="/register">
            <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
