import { Link } from 'react-router';

import styles from '../Footer.module.scss';
import { FooterColumnPropsType } from './Column.types';

export function Column({ title, columns }: FooterColumnPropsType) {
  return (
    <div className={styles.footer_columns_layout}>
      <h1 className={styles.footer_columns_layout_title}>{title}</h1>
      <ul className={styles.footer_columns_layout_list}>
        {columns.map((column, index) => (
          <li key={index} className={styles.footer_columns_layout_list_link}>
            <Link to={column.url}>{column.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
