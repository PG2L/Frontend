import React from 'react';
import ReactDOM from 'react-dom';
import ResumeLesson from './ResumeLesson';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ResumeLesson />, div);
  ReactDOM.unmountComponentAtNode(div);
});