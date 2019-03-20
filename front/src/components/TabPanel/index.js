import React from 'react';
import PropTypes from 'prop-types';
import styles from './TabPanel.module.scss';
import { NavLink } from 'react-router-dom';
const TabPanel = ({ items }) => {
  return (
    <ul className={styles.tabPanel}>
      {Object.keys(items).map(key => (
        <li key={key}>
          <NavLink
            tabIndex={1}
            draggable="false"
            to={`/dashboard/${key}`}
            activeClassName={styles.selected}
          >
            {items[key]}
          </NavLink>
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
