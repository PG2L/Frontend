import React from 'react';
import ReactDOM from 'react-dom';
import AdminMenu from './AdminMenu';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminMenu />, div);
  ReactDOM.unmountComponentAtNode(div);
});