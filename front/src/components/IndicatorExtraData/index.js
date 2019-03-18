import React from 'react';
import styles from './ExtraData.module.scss';
import cn from 'classnames';
import { getInt, getPercent } from '../../scripts/reactHelpers';

const SearchesExtraData = ({ mobile, web, isDanger }) => {
  //todo а если не весь траффик? че показывать в description
  const desc = `You get 100% traffic on mobile and desktop devices.`;
  return (
    <div className={styles.indicatorExtraData}>
      <h2>Mobile traffic: {getPercent(mobile, 0)}</h2>
      <h2>Web traffic: {getPercent(web, 0)}</h2>
      <div className={styles.description}>{desc}</div>
      <div className={styles.help}>
        Help:&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Searches
        </a>
        ,&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Pessimisation
        </a>
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
        Help:&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CTR
        </a>
        ,&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Clicks
        </a>
      </div>
    </div>
  );
};

const BookingsExtraData = ({ avg, str }) => {
  return (
    <div className={styles.indicatorExtraData}>
      <h2>STR: {getPercent(str)}</h2>
      <h2>Avg. Check: {getInt(avg)}</h2>
      <div className={styles.description}>
        Conversion from clicks to bookings on all devices.
      </div>
      <div className={styles.help}>
        Help:&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          STR
        </a>
        ,&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Bookings
        </a>
        ,&nbsp;
        <a
          href="https://www.aviasales.ru/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Avg. Check
        </a>
      </div>
    </div>
  );
};
export { BookingsExtraData, SearchesExtraData, ClicksExtraData };
