import React from 'react';
import styles from './brand.module.css';

export default function Brand({ name }) {
  const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  if (Array.isArray(name)) {
    // Se name for um array, renderiza uma lista de spans
    return (
      <>
        {name
          .filter(item => item !== "full-stack" && item !== "back-end") // Filtra os itens "full-stack" e "back-end"
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
