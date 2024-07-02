import React from 'react';
import ReactDOM from 'react-dom';
import LessonForm from './LessonForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LessonForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});