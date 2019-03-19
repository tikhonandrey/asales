import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabPanel.module.scss';
import cn from 'classnames';

const TabPanel = ({ items, selected, onClick }) => {
  return (
    <ul className={styles.tabPanel}>
      {Object.keys(items).map(key => (
        <li
          key={key}
          className={cn({
            [styles.selected]: selected === key,
          })}
        >
          <a
            tabIndex={1}
            draggable="false"
            href={`#${key}`}
            onClick={onClick(key)}
          >
            {items[key]}
          </a>
        </li>
      ))}
    </ul>
  );
};

TabPanel.propTypes = {
  onClick: PropTypes.func.isRequired,
  items: PropTypes.object.isRequired,
  selected: PropTypes.string,
};

export default TabPanel;
