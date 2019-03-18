import React from 'react';
import styles from './Avatar.module.scss';

const Avatar = ({ status, icon }) => {
  return <div className={styles.avatar}>
    <div className={styles.circle}>
      <img src={icon} alt={icon}/>
    </div>
    <div className={styles.status}></div>
  </div>;
};

export default Avatar;
