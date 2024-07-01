import React, { FC } from 'react';
import styles from './LoginForm.module.css';

interface LoginFormProps {}

const LoginForm: FC<LoginFormProps> = () => (
  <div className={styles.LoginForm}>
    LoginForm Component
  </div>
);

export default LoginForm;
