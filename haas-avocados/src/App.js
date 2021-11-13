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
    //return component;
    // uncomment this when wanting to use authentication
    return !Auth.isAuthenticated() ? <Redirect to="/login" /> : component;
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
              <Route path="/logout" exact render={() => <LoggedOut auth={Auth} />} /> 
              <Route path="/login" exact render={() => <Login updateApp={updateApp} />} />
              <Route path="/register" exact render={() => <Register updateApp={updateApp} />} />
              <Route path="/projects" exact render={() => requireAuth(<Project />)} />
              <Route path="/addproject" exact render={() => requireAuth(<AddProject />)} />
              <Route path="/datasets" exact component={Dataset} />
            </Switch>
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
