import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Dashboard from './features/Dashboard';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/dashboard/:selectedPeriod" component={Dashboard} />
        <Redirect to="/dashboard/last_hour" push />
      </Switch>
    );
  }
}

export default hot(module)(App);
