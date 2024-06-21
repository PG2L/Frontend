import React from 'react';
import ReactDOM from 'react-dom';
import UserForm from './UserForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});