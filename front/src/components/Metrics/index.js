import React from 'react';
import styles from './Metrics.module.scss';
import cn from 'classnames';
import round from 'lodash.round';

const MetricValue = ({ value }) =>
  value ? <span>{round(value, 2)}&#37;</span> : <span>&#8208;</span>;

const Metric = ({ name, value, average }) => {
  return (
    <div className={styles.metricItem}>
      <h3>
        {name}: <MetricValue value={value} />
      </h3>
      <span className={styles.average}>
        Average: <MetricValue value={average} />
      </span>
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

export default Metrics;
