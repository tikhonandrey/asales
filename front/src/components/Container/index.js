import React from 'react';
import PropTypes from 'prop-types';
import styles from './Container.module.scss';
import cn from 'classnames';

const Container = ({ children, hideLoader = true }) => {
  return (
    <div
      className={cn(styles.container, {
        [styles.hideLoader]: hideLoader,
      })}
    >
      <div className={styles.loader} />
      {children}
    </div>
  );
};
Container.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
};
export default Container;
