import React from 'react';
import ReactDOM from 'react-dom';
import CourseButton from './CourseButton';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});