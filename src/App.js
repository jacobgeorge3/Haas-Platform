import React from "react";
import {BrowserRouter as Router, Link, Switch, Route} from 'react-router-dom';
import Landing from './pages/Landing';
import Dataset from './pages/Datasets';

import Button from '@mui/material/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/datasets' exact component={Dataset} />
        </Switch>
        
        <Link
          to='/datasets'>
          <Button>
            Click me to go to the dataset page!
          </Button>
        </Link>
      </Router>
    </div>
  );
}

export default App;
