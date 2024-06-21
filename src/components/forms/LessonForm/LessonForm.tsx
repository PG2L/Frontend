import React, { FC } from 'react';
import styles from './LessonForm.module.css';

interface LessonFormProps {}

const LessonForm: FC<LessonFormProps> = () => (
  <div className={styles.LessonForm}>
    LessonForm Component
  </div>
);

export default LessonForm;
