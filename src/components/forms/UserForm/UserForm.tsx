import React, { FC } from 'react';
import styles from './UserForm.module.css';

interface UserFormProps {}

const UserForm: FC<UserFormProps> = () => (
  <div className={styles.UserForm}>
    UserForm Component
  </div>
);

export default UserForm;
