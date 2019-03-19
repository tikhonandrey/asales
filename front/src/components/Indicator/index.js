import React from 'react';
import PropTypes from 'prop-types';
import styles from './Indicator.module.scss';
import Avatar from '../Avatar';
import cn from 'classnames';
import { formatThousands, getDeltaPercent } from '../../scripts/formatData';
import { getPercent } from '../../scripts/reactHelpers';

const Indicator = ({
  children,
  loading,
  current,
  previous,
  currentPeriod,
  previousPeriod,
  title,
}) => {
  let status;
  let diff;
  let delta;
  if (current && previous) {
    status = current && previous && current >= previous ? 'good' : 'bad';
    delta = getDeltaPercent(previous, current);
    diff = getPercent(delta, 0, current >= previous && '+');
  }
  return (
    <div className={styles.indicator}>
      <div className={styles.info}>
        <div>
          <Avatar status={status} icon={title} />
          <div className={styles.linedown} />
        </div>
        <div className={styles.infoBox}>
          <h2>
            {title}
            {!!diff && (
              <span
                className={cn(styles.diff, {
                  [styles.danger]: delta < 0,
                })}
              >
                {diff}
              </span>
            )}
          </h2>
          <h1>
            {current || current === 0 ? formatThousands(current) : '-'}
            <span>{currentPeriod}</span>
          </h1>
          <h1>
            {previous || previous === 0 ? formatThousands(previous) : '-'}
            <span>{previousPeriod}</span>
          </h1>
        </div>
      </div>
      <div className={styles.extraData}>{children}</div>
    </div>
  );
};

Indicator.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  current: PropTypes.number,
  previous: PropTypes.number,
  currentPeriod: PropTypes.string,
  previousPeriod: PropTypes.string,
  title: PropTypes.string,
};

export default Indicator;
