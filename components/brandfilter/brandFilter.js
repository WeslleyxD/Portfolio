'use client';

import React, { useState } from 'react';
import styles from './brandfilter.module.css'

export default function Accordion({ data }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const toggleSection = (e) => {
    setIsOpen(!isOpen)
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button onClick={toggleSection}>
          <h2>{data.name} ({data.count})</h2>
          <svg className={isOpen ? styles.openArrow : styles.closeArrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
        </button>
        <div className={`${isOpen ? styles.openAccordion : styles.closeAccordion}`}>
            {data.items.map((item, index) => (
              <div key={index} className={styles.checkbox}>
                <input
                  type="checkbox"
                  id={`checkbox-${item.name}`}
                  onChange={() => handleCheckboxChange(item.name)}
                />
                <label htmlFor={`checkbox-${item.name}`}><h4>{item.name} ({item.count})</h4></label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
