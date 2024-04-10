import React from 'react';
import { Circles } from 'react-loader-spinner';
import styles from './styles.module.css';
import VMC from '../../assets/group1.png';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Circles height={40} width={40} color="#1A89C2" />

      <img
        src={VMC}
        alt="logo"
        style={{ position: 'absolute', bottom: 40, width: '100px', height: '40px' }}
      />
    </div>
  );
};

export default Loader;
