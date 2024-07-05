import React from 'react';
import ReactDOM from 'react-dom';
import LessonContent from './LessonContent';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LessonContent />, div);
  ReactDOM.unmountComponentAtNode(div);
});