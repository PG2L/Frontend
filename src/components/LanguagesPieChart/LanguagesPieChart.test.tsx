import React from 'react';
import ReactDOM from 'react-dom';
import LanguagesPieChart from './LanguagesPieChart';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LanguagesPieChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});