import React, { useState } from 'react';
import fallback from "../../public/repo/default.png";
import Link from 'next/link';
import Image from 'next/image'
import styles from './cardprojects.module.css'

export default function CardProjects({ data }) {
  const [imageError, setImageError] = useState(false);
  const fallBackSrc = fallback.src

  return (
    <Link href={data.html_url} target='_blank'>
      <div className={styles.container}>
        <div className={styles.card}>
          <div>
            <Image src={imageError ? fallBackSrc : `/repo/${data.name.toLowerCase()}.png`} alt="error" width="300" height="128" title={data.name} style={{ objectFit: "contain" }} onError={() => setImageError(true)} />
            <h3>{data.name}</h3>
          </div>
          <div className={styles.content}><h4>{data.description}</h4></div>
        </div>
      </div >
    </Link>
  );
};
