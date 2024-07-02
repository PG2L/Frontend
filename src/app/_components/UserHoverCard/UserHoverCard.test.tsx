import React from 'react';
import ReactDOM from 'react-dom';
import UserHoverCard from './UserHoverCard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UserHoverCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});