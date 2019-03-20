import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './features/Dashboard';
//todo history
//redux store
class App extends Component {
  render() {
    return (
      <Router>
        <Route  path="/" component={Dashboard} />
        <Route  path="/:selectedPeriod" component={Dashboard} />
      </Router>
    );
  }
}

export default App;
