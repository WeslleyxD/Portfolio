'use client';

import styles from './preloader.module.css'
import React, { useState, useRef } from 'react';


export default function PreLoader( { onChange } ) {

  return (
    <div className={styles.preloader} onAnimationEnd={onChange}>
      <div className={styles.container}>
        <h1>Weslley Araújo</h1>
        <h2>Web Developer</h2>
      </div>
    </div>
  );
}

