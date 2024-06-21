import React from 'react';
import ReactDOM from 'react-dom';
import CourseForm from './CourseForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});