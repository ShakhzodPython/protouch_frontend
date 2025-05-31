import styles from '../Data.module.scss';
import { InputPropsType } from './Input.types';

export function Input({ title, children }: InputPropsType) {
  return (
    <div className={styles.data_layout}>
      <label className={styles.data_layout_label}>{title}</label>
      {children}
    </div>
  );
}
