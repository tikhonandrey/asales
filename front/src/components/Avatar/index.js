import React from 'react';
import styles from './Avatar.module.scss';
import cn from 'classnames';
const Avatar = ({ status, icon }) => {
  return (
    <div className={styles.avatar}>
      <div className={styles.circle}>
        <img src={icon} alt={icon} />
        <div className={cn(styles.status, {
          [styles[status]]: status
        })} />
      </div>
    </div>
  );
};

export default Avatar;
