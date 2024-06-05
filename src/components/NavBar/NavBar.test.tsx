import React from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './NavBar';

it('It should mount', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<NavBar />);
  root.unmount();
});