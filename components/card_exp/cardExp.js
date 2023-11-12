import Link from 'next/link';
import styles from './cardexp.module.css'
import Brand from '../brand/brand';

export default function CardExp({ href, time, seniority, title, company, brands, description }) {
  return (
    <Link href={href} target='_blank' className={styles.container} data-aos="fade-up" data-aos-delay="500" >
      <div className={styles.content}>
        <div className={styles.left}>
          {time}
        </div>
        <div className={styles.right}>
          <div className={styles.title}>
            <h2>{title}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" aria-hidden="true"><path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>
          </div>
          <h3>{seniority}</h3>
          <h3>Empresa: {company}</h3>
          <h4>{description}</h4>
          <div className={styles.brand}>
            {brands.map((item, index) => (
              <Brand key={index} name={item} />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
