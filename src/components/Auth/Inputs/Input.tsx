import { useState, useEffect } from 'react';
import { InputPropsType } from './Input.types';
import { motion } from 'framer-motion';

import styles from './Input.module.scss';

export function Input({
  type,
  value,
  error,
  placeholder,
  onChange,
}: InputPropsType) {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setIsFocused(true);
    }
  }, [value]);

  return (
    <div className={styles.register_form_inputs_layout}>
      <motion.label
        className={`${styles.register_form_inputs_layout_label} ${
          isFocused ? styles.register_form_inputs_layout_label_active : ''
        }`}
        animate={{
          y: isFocused ? -20 : 0,
          scale: isFocused ? 0.9 : 1,
          opacity: error ? 0 : 1,
        }}
        transition={{ duration: 0.1 }}
      >
        {placeholder}
      </motion.label>
      <motion.input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => setIsFocused(e.target.value !== '')}
        className={`${styles.register_form_inputs_layout_input} ${
          error ? styles.register_form_inputs_layout_input_error_field : ''
        }`}
      />
      <p className={styles.register_form_inputs_layout_input_error}>{error}</p>
    </div>
  );
}
