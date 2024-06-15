import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from './TextEditor';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextEditor />, div);
  ReactDOM.unmountComponentAtNode(div);
});