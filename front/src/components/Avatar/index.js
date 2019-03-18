import React from 'react';
import PropTypes from 'prop-types';
import styles from './Avatar.module.scss';
import linedown from './images/linedown.png';
import cn from 'classnames';
const Avatar = ({ status, icon, isLinedown }) => {
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
      <img
        src={linedown}
        alt="linedown"
        className={cn({
          [styles.active]: isLinedown,
        })}
      />
    </div>
  );
};
Avatar.propTypes = {
  status: PropTypes.string,
  isLinedown: PropTypes.bool,
  icon: PropTypes.string.isRequired,
};
export default Avatar;
