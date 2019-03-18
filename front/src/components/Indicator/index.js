import React from 'react';
import styles from './Indicator.module.scss';
import Avatar from '../Avatar';

const Indicator = ({ children, loading, current, previous, currentPeriod, previousPeriod, title }) => {
  const status = current >= previous ? 'good' : 'bad';
  const diff = '+5';
  return (
    <div className={styles.indicator}>
      <div className={styles.info}>
        <Avatar status={status} icon={title} />
        <h3>{title}<span className={styles.diff}>{diff}&#37;</span></h3>
        <div>{current} {currentPeriod}</div>
        <div>{previous} {previousPeriod}</div>
      </div>
      <div className={styles.extraData}>{children}</div>
    </div>
  );
};

export default Indicator;
