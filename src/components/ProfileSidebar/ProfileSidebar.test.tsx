import React from 'react';
import ReactDOM from 'react-dom';
import ProfileSidebar from './ProfileSidebar';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProfileSidebar />, div);
  ReactDOM.unmountComponentAtNode(div);
});