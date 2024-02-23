import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'
import styles from './cardprojects.module.css'

export default function CardProjects({ data }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const toggleSection = (e) => {
    setIsOpen(!isOpen)
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
  };

  return (
    <Link href={"test"} target='_blank'>
      <div className={styles.container}>
        <div className={styles.card}>
          <Image src={`/repo/${data.id}.png`} alt="`/repo/${data.id}.png`" width="300" height="128" title="Serverless Application Model" />
          <div className={styles.content}>{data.description}</div>
        </div>
      </div >
    </Link>
  );
};
