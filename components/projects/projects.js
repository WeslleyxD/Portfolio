'use client';

import Link from 'next/link';
import styles from './projects.module.css'
import React, { useState, useCallback } from 'react';
import Block from '../block/block';

const Projects = () => {
  const [currentBlock, setCurrentBlock] = useState("back-end");

  const handleClickBlock1 = () => {
    setCurrentBlock("back-end");
  };

  const handleClickBlock2 = () => {
    setCurrentBlock("full-stack");
  };

  const handleClickBlock3 = () => {
    setCurrentBlock("front-end");
  };

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <div onClick={handleClickBlock1} className={`${currentBlock === 'back-end' ? styles.active : ''}`}>
          <p>BACK-END</p>
        </div>
        <div onClick={handleClickBlock2} className={`${currentBlock === 'full-stack' ? styles.active : ''}`}>
          <p>FULL-STACK</p>
        </div>
        <div onClick={handleClickBlock3} className={`${currentBlock === 'front-end' ? styles.active : ''}`}>
          <p>FRONT-END</p>
        </div>
      </div>
        <Block currentblock={currentBlock} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0' }}/>
    </div>
  );
};

export default React.memo(Projects);