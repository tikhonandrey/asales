import React from 'react';
import styles from './Indicator.module.scss';
import Avatar from '../Avatar';
import { formatThousands } from '../../scripts/formatData';

const Indicator = ({
  children,
  loading,
  current,
  previous,
  currentPeriod,
  previousPeriod,
  title,
}) => {
  //todo обработать начало или ошибка
  //красный отрицательный процент
  const status = current >= previous ? 'good' : 'bad';
  let diff = Math.floor(current / (previous * 100));
  diff = diff > 0 ? `+${diff}` : diff;
  return (
    <div className={styles.indicator}>
      <div className={styles.info}>
        <Avatar status={status} icon={title} />
        <div className={styles.infoBox}>
          <h2>
            {title}
            {diff !== 0 && <span className={styles.diff}>{diff}&#37;</span>}
          </h2>
          <h1>
            {formatThousands(current)}
            <span>{currentPeriod}</span>
          </h1>
          <h1>
            {formatThousands(previous)}
            <span>{previousPeriod}</span>
          </h1>
        </div>
      </div>
      <div className={styles.extraData}>{children}</div>
    </div>
  );
};

export default Indicator;
