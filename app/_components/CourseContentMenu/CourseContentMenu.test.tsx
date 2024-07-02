import React from 'react';
import ReactDOM from 'react-dom';
import CourseContentMenu from './CourseContentMenu';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseContentMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});