import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextFieldWrapper } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { Button } from "../components/button.style";
import "../styles/register.css";
import Auth from "../Auth";

const Register = ({ updateApp }) => {

  const [userEmail, setEmail] = useState("");
  const [userPassword, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const history = useHistory();

  const registerUser = () => {
    console.log("registered")
  }

  const submit = (e) => {
    Auth.register(userEmail, userPassword)
      .then(data => {
        if (data['status'] == 200) {
          updateApp();
          history.push("/dashboard");
        }
        setMsg(data['msg']);
      })
    // // Simple POST request with a JSON body using fetch
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username: {userEmail}, password: {userPassword} })
    // };
    // fetch('/signin', requestOptions).then(response => {
    //   if(response.status === 200){
    //     return response.json()
    //   }
    // }).then(data => console.log(data))
    // .then(error => console.log(error))
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <h2 style={{ color: 'red' }}>{msg}</h2>
      <TextFieldWrapper>
        <TextField color="primary" label="First Name" />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Last Name" />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Email Address" onChange={(e) => { setEmail(e.target.value) }} />
      </TextFieldWrapper>
      <TextFieldWrapper>
        <TextField color="primary" label="Password" onChange={(e) => { setPassword(e.target.value) }} />
      </TextFieldWrapper>

      <div className='button-container'>
        <Button onClick={submit}>Register</Button>
        <Link to="/login">
          <Button>Cancel</Button>
        </Link>
      </div>
    </div>
  );
};

export default Register;
