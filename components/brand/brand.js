import React from 'react';
import styles from './brand.module.css';

export default function Brand({ topics }) {
  const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const compareSkills = (a, b) => {
    const order = ["full-stack", "back-end", "front-end"];
    if (order.includes(a)) return -1;
    if (order.includes(b)) return 1;
    return 0;
  };

  if (Array.isArray(topics)) {
    return (
      <>
        {topics
          .sort(compareSkills)
          .map((item, index) => (
            <span key={index} className={styles.brand}>
              {formatString(item)}
            </span>
          ))}
      </>
    );
  }

  return <span className={styles.brand}>{formatString(topics)}</span>;
}
