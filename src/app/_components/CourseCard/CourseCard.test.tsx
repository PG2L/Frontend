import React from 'react';
import ReactDOM from 'react-dom';
import CourseCard from './CourseCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});