import React from 'react';
import ReactDOM from 'react-dom';
import LastAchievements from './LastAchievements';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<LastAchievements />, div);
  ReactDOM.unmountComponentAtNode(div);
});