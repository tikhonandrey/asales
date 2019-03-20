import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import Dashboard from './features/Dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <Switch>
            <Route path="/dashboard/:selectedPeriod" component={Dashboard} />
            <Redirect to="/dashboard/last_hour" />
          </Switch>
        </Router>
      </Provider>
    );
  }
}
Dashboard.propTypes = {
  store: PropTypes.any,
};
export default App;
