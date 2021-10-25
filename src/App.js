import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Project from "./pages/Projects";
import Dataset from "./pages/Datasets";
import Dashboard from "./pages/Dashboard";

import Button from "@mui/material/Button";
import "./App.css";
import AddProject from "./pages/AddProject";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const theme = createTheme({
    palette: {
      type: "dark",
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
            backgroundColor: "#fff",
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

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/projects" exact component={Project} />
            <Route path="/addproject" exact component={AddProject} />
            <Route path="/datasets" exact component={Dataset} />
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
