import React from 'react';
import ReactDOM from 'react-dom';
import DarkModeToggle from './DarkModeToggle';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DarkModeToggle />, div);
  ReactDOM.unmountComponentAtNode(div);
});