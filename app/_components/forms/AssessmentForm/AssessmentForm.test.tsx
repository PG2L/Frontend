import React from 'react';
import ReactDOM from 'react-dom';
import AssessmentForm from './AssessmentForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AssessmentForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});