import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';
import cn from 'classnames';
const Avatar = ({ status, icon }) => {
  return (
    <div className={styles.avatar}>
      <div
        className={cn(styles.circle, {
          [styles[icon]]: icon,
        })}
      >
        <div
          className={cn(styles.status, {
            [styles[status]]: status,
          })}
        />
      </div>
    </div>
  );
};
Avatar.propTypes = {
  status: PropTypes.string,
  icon: PropTypes.string.isRequired,
};
export default Avatar;
