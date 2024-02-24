'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import styles from './brandfilter.module.css'

export default function Accordion({ data }) {
  const router = useRouter()
  const pathname = usePathname()

  const [divsClicadas, setDivsClicadas] = useState([]);
  const [checkBoxesClicados, setCheckBoxesClicados] = useState([]);

  const handleClick = (e) => {
    // Adiciona ou remove o índice ao array de divs clicadas
    setDivsClicadas((prevDivsClicadas) => {
      if (prevDivsClicadas.includes(e)) {
        // Se o índice já estiver no array, remove-o
        return prevDivsClicadas.filter((i) => i !== e);
      } else {
        // Se o índice não estiver no array, adiciona-o
        return [...prevDivsClicadas, e];
      }
    });
  };

  const handleCheckboxChange = (e) => {
    setCheckBoxesClicados((activeCheckBoxes) => {
      if (activeCheckBoxes.includes(e)) {
        // Se o índice já estiver no array, remove-o
        return activeCheckBoxes.filter((i) => i !== e);
      } else {
        // Se o índice não estiver no array, adiciona-o
        return [...activeCheckBoxes, e];
      }
    });
  };

  useEffect(() => {
    const clickCheck = checkBoxesClicados.map(item => item.toLowerCase());
    if (clickCheck.length > 0) {
      router.push(`${pathname}?search=${clickCheck.join('+')}`, { scroll: false });
    } else {
      console.log(50050)
      router.push(`${pathname}`, { scroll: false });
    }

  }, [checkBoxesClicados]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {data.map((row, index) => (
          <div  key={index}>
            <button className={styles.button} onClick={() => handleClick(index)}>
              <h2>{row.name} ({row.count})</h2>
              <svg className={!divsClicadas.includes(index) ? styles.openArrow : styles.closeArrow} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path></svg>
            </button>
            <div className={!divsClicadas.includes(index) ? styles.openAccordion : styles.closeAccordion}>
              {row.items.map((item, index) => (
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
        ))}
      </div>
    </div>
  );
};
