import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '../ErrorBoundary';
import Container from '../Container';
import TabPanel from '../TabPanel';
import Metrics from '../Metrics';
import ChartBar from '../ChartBar';
import Indicator from '../Indicator';
import {
  SearchesExtraData,
  BookingsExtraData,
  ClicksExtraData,
} from '../IndicatorExtraData';

const tabPanelItems = {
  last_hour: 'Last hour',
  today: 'Today',
  yesterday: 'Yesterday',
  last_3days: 'Last 3 days',
};
const lastPeriod = 'Last friday';

export default class Dashboard extends PureComponent {
  render() {
    const {
      selectedPeriod: selected,
      loading,
      metrics,
      charts,
      average,
    } = this.props;

    const tabPanelProps = {
      items: tabPanelItems,
    };
    const metricsProps = {
      loading,
      errors: metrics[`errors_${selected}`],
      zeroes: metrics[`zeroes_${selected}`],
      timeout: metrics[`timeout_${selected}`],
      average,
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
}

Dashboard.propTypes = {
  selectedPeriod: PropTypes.string,
  loading: PropTypes.bool,
  metrics: PropTypes.any,
  charts: PropTypes.any,
  average: PropTypes.number,
};
