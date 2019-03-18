import React, { Component } from 'react';
import { getDashboardData } from '../../scripts/api';
import { getIdInHash } from '../../scripts/routing';
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

//todo режим лоадинг(заглушки вместо данных)
const tabPanelItems = {
  last_hour: 'Last hour',
  today: 'Today',
  yesterday: 'Yesterday',
  last_3days: 'Last 3 days',
};

class Dashboard extends Component {
  state = {
    loading: false,
    selectedPeriod: 'last_hour',
    metrics: {},
    charts: {},
  };
  render() {
    console.log('I am Dashboard');

    const { selectedPeriod: selected, loading, metrics, charts } = this.state;

    const tabPanelProps = {
      selected,
      items: tabPanelItems,
      onClick: this.onSelectPeriod,
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
      currentPeriod: selected,
      previousPeriod: 'Last friday', //todo прошлый период??
    };
    const clicksIndicatorProps = {
      loading,
      title: 'clicks',
      current: metrics[`clicks_current_${selected}`],
      previous: metrics[`clicks_previous_${selected}`],
      currentPeriod: selected,
      previousPeriod: 'Last friday', //todo прошлый период??
    };
    const bookungsIndicatorProps = {
      loading,
      title: 'bookings',
      current: metrics[`bookings_current_${selected}`],
      previous: metrics[`bookings_previous_${selected}`],
      currentPeriod: selected,
      previousPeriod: 'Last friday', //todo прошлый период??
    };
    return (
      <ErrorBoundary
        ref={el => {
          this.errorCatcher = el;
        }}
      >
        <Container>
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
                isDanger: true, //todo
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
    window.addEventListener('hashchange', this.onHashChange);

    this.loadData();
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  loadData() {
    this.setState({ loading: true }, async () => {
      try {
        const { metrics, charts } = await getDashboardData();
        this.setState({
          selectedPeriod: getIdInHash() || 'last_hour',
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

  onHashChange = () => {
    this.onSelectPeriod(getIdInHash())();
  };

  onSelectPeriod = index => () => {
    if (this.state.selectedPeriod === index) return;
    this.setState({
      selectedPeriod: index,
    });
  };
}

export default Dashboard;
