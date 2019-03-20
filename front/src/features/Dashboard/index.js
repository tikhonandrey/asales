import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getDashboardData } from '../../scripts/api';
import ErrorBoundary from '../../components/ErrorBoundary';
import Container from '../../components/Container';
import TabPanel from '../../components/TabPanel';
import Metrics from '../../components/Metrics';
import ChartBar from '../../components/ChartBar';
import Indicator from '../../components/Indicator';
import {
  SearchesExtraData,
  BookingsExtraData,
  ClicksExtraData,
} from '../../components/IndicatorExtraData';
import { METRICS_AVERAGE } from './consts.js';

const tabPanelItems = {
  last_hour: 'Last hour',
  today: 'Today',
  yesterday: 'Yesterday',
  last_3days: 'Last 3 days',
};
const lastPeriod = 'Last friday';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      selectedPeriod: 'last_hour',
      metrics: {},
      charts: {},
    };
    this.errorCatcher = React.createRef();
  }
  render() {
    const { selectedPeriod: selected, loading, metrics, charts } = this.state;

    const tabPanelProps = {
      items: tabPanelItems,
    };
    const metricsProps = {
      loading,
      errors: metrics[`errors_${selected}`],
      zeroes: metrics[`zeroes_${selected}`],
      timeout: metrics[`timeout_${selected}`],
      average: METRICS_AVERAGE,
    };
    const chartBar = {
      loading,
      items: charts[`errors_${selected}`] || [],
    };
    const searchesIndicatorProps = {
      loading,
      title: 'searches',
      current: metrics[`searches_current_${selected}`],
      previous: metrics[`searches_previous_${selected}`],
      currentPeriod: tabPanelItems[selected],
      previousPeriod: lastPeriod,
    };
    const clicksIndicatorProps = {
      loading,
      title: 'clicks',
      current: metrics[`clicks_current_${selected}`],
      previous: metrics[`clicks_previous_${selected}`],
      currentPeriod: tabPanelItems[selected],
      previousPeriod: lastPeriod,
    };
    const bookungsIndicatorProps = {
      loading,
      title: 'bookings',
      current: metrics[`bookings_current_${selected}`],
      previous: metrics[`bookings_previous_${selected}`],
      currentPeriod: tabPanelItems[selected],
      previousPeriod: lastPeriod,
    };
    return (
      <ErrorBoundary ref={this.errorCatcher}>
        <Container hideLoader={!loading}>
          <h1>Main metrics</h1>
          <TabPanel {...tabPanelProps} />
          <Metrics {...metricsProps} />
          {chartBar.items.length > 0 && <ChartBar {...chartBar} />}
          <Indicator {...searchesIndicatorProps}>
            <SearchesExtraData
              {...{
                mobile: metrics[`mobile_pessimizer`],
                web: metrics[`web_pessimizer`],
              }}
            />
          </Indicator>
          <Indicator {...clicksIndicatorProps}>
            <ClicksExtraData
              {...{
                ctr: metrics[`ctr_${selected}`],
                isDanger: true,
              }}
            />
          </Indicator>
          <Indicator {...bookungsIndicatorProps}>
            <BookingsExtraData
              {...{
                str: metrics[`str_${selected}`],
                avg: metrics[`avg_price_${selected}`],
              }}
            />
          </Indicator>
        </Container>
      </ErrorBoundary>
    );
  }

  componentWillMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.match.params.selectedPeriod !==
      this.props.match.params.selectedPeriod
    ) {
      this.setState({
        selectedPeriod: nextProps.match.params.selectedPeriod,
      });
    }
  }

  loadData() {
    this.setState({ loading: true }, async () => {
      try {
        const { metrics, charts } = await getDashboardData();
        this.setState({
          loading: false,
          selectedPeriod: this.props.match.params.selectedPeriod,
          metrics,
          charts,
        });
      } catch (e) {
        this.setState(
          {
            loading: false,
          },
          () => {
            this.errorCatcher &&
              this.errorCatcher.setState({
                error: 'Network problem',
              });
          }
        );
      }
    });
  }

  onSelectPeriod = index => () => {
    if (this.state.selectedPeriod === index) return;
    this.setState({
      selectedPeriod: index,
    });
  };
}
Dashboard.propTypes = {
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
};
export default Dashboard;
