import React from 'react';
import ReactDOM from 'react-dom';
import CourseProgressBar from './CourseProgressBar';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseProgressBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});