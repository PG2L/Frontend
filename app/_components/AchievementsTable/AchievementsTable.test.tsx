import React from 'react';
import ReactDOM from 'react-dom';
import AchievementsTable from './AchievementsTable';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AchievementsTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});