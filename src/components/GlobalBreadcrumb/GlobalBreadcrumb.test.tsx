import React from 'react';
import ReactDOM from 'react-dom';
import GlobalBreadcrumb from './GlobalBreadcrumb';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GlobalBreadcrumb />, div);
  ReactDOM.unmountComponentAtNode(div);
});