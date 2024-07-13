import React from 'react';
import ReactDOM from 'react-dom';
import AssessmentModal from './AssessmentModal';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AssessmentModal />, div);
  ReactDOM.unmountComponentAtNode(div);
});