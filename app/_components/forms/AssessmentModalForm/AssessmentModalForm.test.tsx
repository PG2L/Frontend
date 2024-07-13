import React from 'react';
import ReactDOM from 'react-dom';
import AssessmentModalForm from './AssessmentModalForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AssessmentModalForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});