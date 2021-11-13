import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import { TextFieldWrapper } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button } from "../components/button.style";
import "../styles/login.css";
import Auth from "../Auth";

const Login = ({ updateApp }) => {

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState(""); 
	const [msg, setMsg] = useState("");

  const submit = (e) => {
		Auth.login(userEmail, userPassword)
			.then(data => {
				console.log(JSON.stringify(data));
				if (data['status'] == 200) {
					updateApp();
				}
				setMsg(data['msg']);
			})
  }

  return (
    <div className='login-container'>
      <h1>Login</h1>
			<h2>{msg}</h2>
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
    </div>
  );
};

export default Login;
