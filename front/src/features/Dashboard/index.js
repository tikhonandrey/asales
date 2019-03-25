import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dashboard from '../../components/Dashboard';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  fetchDashboardData,
  isLoadingSelector,
  getChartInfoSelector,
  getMetricsSelector,
  errorSelector,
  METRICS_AVERAGE,
} from './duck';

export class DashboardContainer extends Component {
  render() {
    const { fetchDashboardData, ...other } = this.props;
    const props = {
      ...other,
      average: METRICS_AVERAGE,
    };
    return <Dashboard {...props} />;
  }

  componentWillMount() {
    this.props.fetchDashboardData();
  }
}
DashboardContainer.propTypes = {
  history: PropTypes.any,
  location: PropTypes.shape({
    hash: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      selectedPeriod: PropTypes.string,
    }),
  }),
  fetchDashboardData: PropTypes.func,
  selectedPeriod: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.string,
  metrics: PropTypes.any,
  charts: PropTypes.any,
  average: PropTypes.number,
};

const mapStateToProps = (state, ownProps) => ({
  loading: isLoadingSelector(state),
  error: errorSelector(state),
  metrics: getMetricsSelector(state),
  charts: getChartInfoSelector(state),
  selectedPeriod: ownProps.match.params.selectedPeriod,
});

export default withRouter(
  connect(
    mapStateToProps,
    { fetchDashboardData }
  )(DashboardContainer)
);
