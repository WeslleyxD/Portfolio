import React from 'react';
import styles from './brand.module.css';

export default function Brand({ name }) {
  const formatString = (str) => {
    return str[0].toUpperCase() + str.slice(1);
  };

  const compareSkills = (a, b) => {
    const order = ["full-stack", "back-end", "front-end"];
  
    // Se a estiver no array de ordem, coloca a antes de b
    if (order.includes(a)) return -1;
    // Se b estiver no array de ordem, coloca b antes de a
    if (order.includes(b)) return 1;
    // Mantém a ordem original para outros itens
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
