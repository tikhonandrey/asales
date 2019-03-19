import React from 'react';
import PropTypes from 'prop-types';
import styles from './ExtraData.module.scss';
import cn from 'classnames';
import { getInt, getPercent } from '../../scripts/reactHelpers';

const Link = ({ children }) => {
  return (
    <a
      href="https://www.aviasales.ru/"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

const SearchesExtraData = ({ mobile, web, isDanger }) => {
  const isOkMobile = mobile >= 100;
  const isOkWeb = web >= 100;
  const both = isOkMobile && isOkWeb;
  const desc = `You get 100% traffic on
   ${isOkMobile ? 'mobile' : ''}
    ${both ? 'and' : ''}
   ${isOkWeb ? 'desktop' : ''} device${both ? 's' : ''}.`;

  return (
    <div className={styles.indicatorExtraData}>
      <h2>Mobile traffic: {getPercent(mobile, 0)}</h2>
      <h2>Web traffic: {getPercent(web, 0)}</h2>
      <div className={styles.description}>{desc}</div>
      <div className={styles.help}>
        Help: <Link>Searches</Link>, <Link>Pessimisation</Link>
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
        Help: <Link>CTR</Link>, <Link>Clicks</Link>
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
        Help: <Link>STR</Link>, <Link>Bookings</Link>, <Link>Avg. Check</Link>
      </div>
    </div>
  );
};

Link.propTypes = {
  children: PropTypes.string,
};
SearchesExtraData.propTypes = {
  mobile: PropTypes.number,
  web: PropTypes.number,
  isDanger: PropTypes.bool,
};
ClicksExtraData.propTypes = {
  ctr: PropTypes.number,
  isDanger: PropTypes.bool,
};
BookingsExtraData.propTypes = {
  avg: PropTypes.number,
  str: PropTypes.number,
};

export { BookingsExtraData, SearchesExtraData, ClicksExtraData };
