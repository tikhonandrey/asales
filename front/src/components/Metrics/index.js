import React from 'react';
import PropTypes from 'prop-types';
import styles from './Metrics.module.scss';
import cn from 'classnames';
import { getPercent } from '../../scripts/reactHelpers';

const Metric = ({ name, value, average }) => {
  return (
    <div className={styles.metricItem}>
      <div className={styles.status} />
      <div>
        <h3>
          {name}: {getPercent(value)}
        </h3>
        <span className={styles.average}>Average: {getPercent(average)}</span>
      </div>
    </div>
  );
};

const Metrics = ({ loading, errors, zeroes, timeout, average }) => {
  return (
    <div
      className={cn(styles.metrics, {
        [styles.loading]: loading,
      })}
    >
      <Metric key="errors" name="errors" average={average} value={errors} />
      <Metric key="zeroes" name="zeroes" average={average} value={zeroes} />
      <Metric key="timeout" name="timeout" average={average} value={timeout} />
    </div>
  );
};

Metric.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  average: PropTypes.number,
};
Metrics.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.number,
  zeroes: PropTypes.number,
  timeout: PropTypes.number,
  average: PropTypes.number,
};

export default Metrics;
