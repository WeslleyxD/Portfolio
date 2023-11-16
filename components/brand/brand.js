import React from 'react';
import styles from './brand.module.css';

export default function Brand({ name }) {
  const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const compareSkills = (a, b) => {
    const order = ["full-stack", "back-end", "front-end"];
  
    if (order.includes(a)) return -1;
    if (order.includes(b)) return 1;
    return 0;
  };

  if (Array.isArray(name)) {
    // Se name for um array, renderiza uma lista de spans
    return (
      <>
        {name
          .sort(compareSkills)
          .map((item, index) => (
            <span key={index} className={styles.brand}>
              {formatString(item)}
            </span>
          ))}
      </>
    );
  }

  // Se name não for um array, renderiza apenas um <span>
  return <span className={styles.brand}>{formatString(name)}</span>;
}
