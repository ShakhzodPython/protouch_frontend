import { useState } from 'react';
import styles from './Data.module.scss';
import { Input } from './Input/Input';
import {
  useAuthContext,
  useUpdateMeFull,
  useUpdateMePartial,
} from '../../../../hooks/useAuth';

export function Data() {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { user, refetch } = useAuthContext();
  const updateFull = useUpdateMeFull();
  const updatePartial = useUpdateMePartial();

  const initialData = {
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
  };

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'phone_number') {
      let input = value;

      // If input contains digits but does not start with "+998 ", prepend it
      if (/\d/.test(input)) {
        if (!input.startsWith('+998 ')) {
          input = '+998 ' + input;
        }
      }

      // If input is empty or just '+998 ', clear the phone_number
      if (input.trim() === '' || input === '+998 ') {
        setFormData((prev) => ({ ...prev, phone_number: '' }));
        return;
      }

      // If input contains both digits and letters, remove the '+998 ' part
      if (/\d/.test(input) && /[a-zA-Zа-яА-Я]/.test(input)) {
        input = input.replace('+998 ', '');
      }

      setFormData((prev) => ({ ...prev, phone_number: input }));
    } else {
      // For other fields just update normally
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const getChangedFields = () => {
    const changed: Record<string, string> = {};
    for (const key in formData) {
      if (
        formData[key as keyof typeof formData] !==
        initialData[key as keyof typeof initialData]
      ) {
        changed[key] = formData[key as keyof typeof formData];
      }
    }
    return changed;
  };

  const handleEditToggle = () => {
    if (isEditing) {
      const changedFields = getChangedFields();

      if (Object.keys(changedFields).length === 0) {
        setIsEditing(false);
        return;
      }

      if (
        Object.keys(changedFields).length === Object.keys(initialData).length
      ) {
        updateFull.mutate(formData, {
          onSuccess: () => {
            refetch();
            setIsEditing(false);
          },
        });
      } else {
        updatePartial.mutate(changedFields, {
          onSuccess: () => {
            refetch();
            setIsEditing(false);
          },
        });
      }
    } else {
      setIsEditing(true);
    }
  };

  //TODO: handle errors fields
  return (
    <div className={styles.data}>
      <Input title='Профиль'>
        <input
          type='text'
          name='first_name'
          value={formData.first_name}
          onChange={handleChange}
          placeholder='Имя'
          disabled={!isEditing}
          className={!isEditing ? styles.disabledInput : ''}
        />
        <input
          type='text'
          name='last_name'
          value={formData.last_name}
          onChange={handleChange}
          placeholder='Фамилия'
          disabled={!isEditing}
          className={!isEditing ? styles.disabledInput : ''}
        />
      </Input>

      <Input title='E-mail'>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='example@mail.com'
          disabled={!isEditing}
          className={!isEditing ? styles.disabledInput : ''}
        />
      </Input>

      <Input title='Контакты'>
        <input
          type='tel'
          name='phone_number'
          value={formData.phone_number}
          onChange={handleChange}
          placeholder='+998 90 123 45 67'
          disabled={!isEditing}
          maxLength={17}
          className={!isEditing ? styles.disabledInput : ''}
        />
      </Input>

      <button onClick={handleEditToggle} className={styles.customEditButton}>
        {isEditing ? 'Сохранить' : 'Редактировать'}
      </button>
    </div>
  );
}
