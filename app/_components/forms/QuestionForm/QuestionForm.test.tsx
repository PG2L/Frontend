import React from 'react';
import ReactDOM from 'react-dom';
import QuestionForm from './QuestionForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<QuestionForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});