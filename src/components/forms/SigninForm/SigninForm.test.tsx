import React from 'react';
import ReactDOM from 'react-dom';
import SigninForm from './SigninForm';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SigninForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});