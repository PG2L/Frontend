import React from 'react';
import ReactDOM from 'react-dom';
import FAQ from './FAQ';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FAQ />, div);
  ReactDOM.unmountComponentAtNode(div);
});