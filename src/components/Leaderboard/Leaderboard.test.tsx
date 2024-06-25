import React from 'react';
import ReactDOM from 'react-dom';
import Leaderboard from './Leaderboard';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Leaderboard />, div);
  ReactDOM.unmountComponentAtNode(div);
});