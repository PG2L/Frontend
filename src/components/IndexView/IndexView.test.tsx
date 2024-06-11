import React from 'react';
import ReactDOM from 'react-dom';
import IndexView from './IndexView';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<IndexView />, div);
  ReactDOM.unmountComponentAtNode(div);
});