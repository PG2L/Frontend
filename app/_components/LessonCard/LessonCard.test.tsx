import React from 'react';
import ReactDOM from 'react-dom';
import LessonCard from './LessonCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LessonCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});