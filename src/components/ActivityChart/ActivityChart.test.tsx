import React from 'react';
import ReactDOM from 'react-dom';
import ActivityChart from './ActivityChart';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActivityChart />, div);
  ReactDOM.unmountComponentAtNode(div);
});