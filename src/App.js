import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from './components/layout/Navbar'
import Dashboard from './components/layout/Dashboard';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Pokemon from './components/pokemon/Pokemon'


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            {/* CHECK BELOW HOW THEY MADE THE DOT ID  */}
            <Route exact path="/:id" component={Pokemon} />
            <Dashboard />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
