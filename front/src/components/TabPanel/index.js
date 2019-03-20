import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabPanel.module.scss';
import cn from 'classnames';
import { Link } from 'react-router-dom';
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
          <Link tabIndex={1} draggable="false" to={`#${key}`}>
            {items[key]}
          </Link>
        </li>
      ))}
    </ul>
  );
};

TabPanel.propTypes = {
  onClick: PropTypes.func,
  items: PropTypes.object.isRequired,
  selected: PropTypes.string,
};

export default TabPanel;
