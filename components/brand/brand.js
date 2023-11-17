import React from 'react';
import styles from './brand.module.css';

export default function Brand({ name }) {
  const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  if (Array.isArray(name)) {
    // Se name for um array, renderiza uma lista de spans
    const order = {
      "back-end": 1,
      "full-stack": 2,
      "front-end": 3,
      "aws": 4,
      "javascript": 5,
      "python": 6,
      "golang": 7,
    };
  
    const sortedArray = [...name].sort((a, b) => (order[a] || Number.MAX_SAFE_INTEGER) - (order[b] || Number.MAX_SAFE_INTEGER));

    return (
      <>
        {sortedArray
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
