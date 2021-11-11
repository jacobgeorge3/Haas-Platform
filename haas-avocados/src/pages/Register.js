import React from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextFieldWrapper } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { Button } from "../components/button.style";
import "../styles/register.css";
 
const Register = () => {
 
  const registerUser = () => {
    console.log("registered")
  }
 
  return (
    <div className="register-container">
      <h1>Register</h1>

      <TextFieldWrapper>
        <TextField color="primary" label="First Name" />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Last Name" />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Email Address" />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Password" />
      </TextFieldWrapper>

      <div className='button-container'>
        <Button onClick={registerUser}>Register</Button>
        <Link to="/login">
          <Button>Cancel</Button>
        </Link>
      </div>
    </div>
  );
};
 
export default Register;
 