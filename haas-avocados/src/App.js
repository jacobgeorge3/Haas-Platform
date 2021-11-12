import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import LoggedOut from "./pages/LoggedOut";
import Project from "./pages/Projects";
import Dataset from "./pages/Datasets";
import Dashboard from "./pages/Dashboard";
import Button from "@mui/material/Button";
import Register from "./pages/Register"
import "./App.css";
import AddProject from "./pages/AddProject";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Paper } from "@mui/material";

import Auth from "./Auth";

function App() {

  const [isAuth, setAuth] = useState(Auth.isAuthenticated());

  useEffect(() => {
    document.title = "Haas Avocados";
  }, []);
  
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#2eb62c",
      },
      secondary: {
        main: "#ffeca1",
      },
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
            },
          },
          defaultProps: {
            variant: "outlined",
            focused: true,

          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
            },
          },
        },
        MuiInputLabel: {
            styleOverrides: {
              root: {
              },
            },
          },
    },
  });

  

  function requireAuth(component) {
    return component;
    // uncomment this when wanting to use authentication
    // return !Auth.isAuthenticated() ? <Redirect to="/login" /> : component;
  }

  function updateApp() {
    setAuth(!isAuth);
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ minHeight: "100vh" }}>
        <div className="App">
          <Router>
            <Navbar isAuth={isAuth} 
              updateApp={updateApp} />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/dashboard" exact render={() => requireAuth(<Dashboard />)} />
              <Route path="/logout" exact render={() => requireAuth(<LoggedOut auth={Auth} />)} /> 
              <Route path="/login" exact render={() => <Login updateApp={updateApp} />} />
              <Route path="/register" exact render={() => <Register updateApp={updateApp} />} />
              <Route path="/projects" exact render={() => requireAuth(<Project />)} />
              <Route path="/addproject" exact render={() => requireAuth(<AddProject />)} />
              <Route path="/datasets" exact component={Dataset} />
            </Switch>

            {/* Buttons to test login/logout functionality
            <button onClick={() => Auth.login("test","test").then(data => console.log(data))}>Login</button>
            <button onClick={() => console.log(Auth.getCurrentToken())}>Get token</button>
            <button onClick={() => Auth.register('test', 'test').then(data => console.log(data))}>Register</button>
            <button onClick={() => Auth.post('/user/remove', { 'email': 'test', 'password': 'test' }).then(data => console.log(data))}>Remove User</button>
            <button onClick={() => Auth.get('/project/get-all').then(data => console.log(data))}>get projects</button>
            <button 
              onClick={() => Auth.post('/project/create', {
                'name': 'TestProject',
                'description': 'Test Description'
              }).then(data => console.log(data))}>
                create
            </button>
            <button 
              onClick={() => Auth.post('/project/remove', {
                'name': 'TestProject',
              }).then(data => console.log(data))}>
                remove proj
            </button>
            <button 
              onClick={() => Auth.post('/project/join', {
                'email': 'test4',
                'name': 'TestProject',
              }).then(data => console.log(data))}>
                join proj
            </button>
            <button onClick={() => Auth.logout()}>logout</button> */}
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
