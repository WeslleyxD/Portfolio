import Link from 'next/link';
import styles from './anchor.module.css'
import { useEffect } from 'react';

export default function Anchor ({ href, title, menu }) {

  const handleClick = (e) => {
    e.preventDefault();
    // history.replaceState(null, null, `${href}`)
    const targetElement = document.querySelector(href);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 100,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={title.toUpperCase().replace('#', '') === menu.toUpperCase() ? 'active': 'deactive'}><span> # </span> {title}</Link>
  );
};
