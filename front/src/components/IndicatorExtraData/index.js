import React from 'react';
import styles from './ExtraData.module.scss';
import cn from 'classnames';

const BookingsExtraData = ({ avg, str }) => {
  return (
    <div className={styles.indicatorExtraData}>
      <div className={styles.title}>STR: {str}&#37;</div>
      <div className={styles.title}>Avg. Check: {avg}</div>
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
const SearchesExtraData = ({ mobile, web }) => {
  return (
    <div className={styles.indicatorExtraData}>
      <div className={styles.title}>Mobile traffic: {mobile}&#37;</div>
      <div className={styles.title}>Web traffic: {web}&#37;</div>
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
      <div
        className={cn(styles.title, {
          [styles.danger]: isDanger,
        })}
      >
        CTR: {ctr}&#37;
      </div>
      <div className={styles.description}>
        Conversation from searches to clicks on all devices.
      </div>
      <div className={styles.help}>
        Help: <a href="#">CTR</a>, <a href="#">Clicks</a>
      </div>
    </div>
  );
};
export { BookingsExtraData, SearchesExtraData, ClicksExtraData };
