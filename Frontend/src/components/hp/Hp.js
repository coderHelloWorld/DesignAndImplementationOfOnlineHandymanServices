import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './hp.module.css';

const MyComponent = () => {
    const navigate = useNavigate();
    const handleItemClickt = () => {
        navigate(`/login`);
    }
    const handleItemClick = () => {
        navigate(`/register`);
    }
    

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Handyman's Shop</h1>
      <div className={styles.content_2_scroll_not_bb}>
          <button className={styles.button_86} onClick={() => handleItemClickt()}>Login</button>
          <button className={styles.button_86} onClick={() => handleItemClick()}>Sign Up</button>
      </div>
    </div>
  );
};

export default MyComponent;

