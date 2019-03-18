import React from 'react';
import styles from './ExtraData.module.scss';
import cn from 'classnames';
import { formatThousands } from '../../scripts/formatData';

const getPercent = (float, dec = 2) => {
  return float ? <span>{float.toFixed(dec)}&#37;</span> : <span>&#8208;</span>;
};
const getInt = int => {
  return int ? formatThousands(Math.ceil(int)) : <span>&#8208;</span>;
};
const SearchesExtraData = ({ mobile, web, isDanger }) => {
  //todo а если не весь траффик? че показывать в description
  return (
    <div className={styles.indicatorExtraData}>
      <h2>Mobile traffic: {getPercent(mobile, 0)}</h2>
      <h2>Web traffic: {getPercent(web, 0)}</h2>
      <div className={styles.description}>
        You get 100% traffic on mobile and desktop devices.
      </div>
      <div className={styles.help}>
        Help: <a href="#">Searches</a>, <a href="#">Pessimisation</a>
      </div>
    </div>
  );
};
const ClicksExtraData = ({ ctr, isDanger }) => {
  return (
    <div className={styles.indicatorExtraData}>
      <h2
        className={cn({
          [styles.danger]: isDanger,
        })}
      >
        CTR: {getPercent(ctr)}
      </h2>
      <div className={styles.description}>
        Conversation from searches to clicks on all devices.
      </div>
      <div className={styles.help}>
        Help: <a href="#">CTR</a>, <a href="#">Clicks</a>
      </div>
    </div>
  );
};
//todo флоат проценты через запятую?
const BookingsExtraData = ({ avg, str }) => {
  return (
    <div className={styles.indicatorExtraData}>
      <h2>STR: {getPercent(str)}</h2>
      <h2>Avg. Check: {getInt(avg)}</h2>
      <div className={styles.description}>
        Conversion from clicks to bookings on all devices.
      </div>
      <div className={styles.help}>
        Help: <a href="#">STR</a>, <a href="#">Bookings</a>,{' '}
        <a href="#">Avg. Check</a>
      </div>
    </div>
  );
};
export { BookingsExtraData, SearchesExtraData, ClicksExtraData };
