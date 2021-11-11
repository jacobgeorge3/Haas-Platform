import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material"; /* you were just using the wrong import */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextFieldWrapper } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { Button } from "../components/button.style";
import "../styles/login.css";

const Login = () => {

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState(""); 

  const submit = (e) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: {userEmail}, password: {userPassword} })
    };
    fetch('/login', requestOptions).then(response => {
      if(response.status === 200){
        return response.json()
      }
    }).then(data => console.log(data))
    .then(error => console.log(error))
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>

      <TextFieldWrapper>
        <TextField color="primary" label="Email Address" onChange={(e) => {setEmail(e.target.value)}}/>
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Password" onChange={(e) => {setPassword(e.target.value)}}/>
      </TextFieldWrapper>

      <Link to="/login" className='forgot'>Forgot password </Link>

      <div className='login-button-container'>
        <Button onClick={submit}>Login</Button>
        <Link to="/register">
            <Button>Register</Button>
        </Link>
      </div>

      <p>{userEmail}</p>
      <p>{userPassword}</p>

    </div>
  );
};

export default Login;
