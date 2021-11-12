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

  function logout() {
    Auth.logout();
    setAuth(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{ height: "100vh" }}>
        <div className="App">
          <Router>
            <Navbar isAuth={isAuth} 
              logout={logout} />
            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/dashboard" exact render={() => requireAuth(<Dashboard />)} />
              <Route path="/logout" exact render={() => requireAuth(<LoggedOut auth={Auth} />)} /> 
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/projects" exact render={() => requireAuth(<Project />)} />
              <Route path="/addproject" exact render={() => requireAuth(<AddProject />)} />
              <Route path="/datasets" exact component={Dataset} />
            </Switch>

            {/* Buttons to test login/logout functionality */}
            <button onClick={() => Auth.login("test","test").then(data => console.log(data))}>Login</button>
            <button onClick={() => console.log(Auth.getCurrentToken())}>Get token</button>
            <button onClick={() => Auth.register().then(data => console.log(data))}>Signin</button>
            <button onClick={() => Auth.post('/user/remove', { 'email': 'test', 'password': 'test' }).then(data => console.log(data))}>Remove User</button>
            <button onClick={() => Auth.logout()}>logout</button>
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
