import styles from '../Order.module.scss';
import { InputProps } from './Input.types.ts';

export function Input({
  label,
  name,
  value,
  required,
  onChange,
  error,
}: InputProps) {
  return (
    <div className={styles.order_delivery_content_layout_inputs_list_input}>
      <label
        className={styles.order_delivery_content_layout_inputs_list_input_label}
      >
        {label}
      </label>
      <input
        type='text'
        name={name}
        value={value}
        required={required}
        onChange={onChange}
      />
      {error && (
        <span
          className={
            styles.order_delivery_content_layout_inputs_list_input_error
          }
        >
          {error}
        </span>
      )}
    </div>
  );
}
