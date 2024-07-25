import React from 'react';
import ReactDOM from 'react-dom';
import LevelDisplayer from './LevelDisplayer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LevelDisplayer />, div);
  ReactDOM.unmountComponentAtNode(div);
});