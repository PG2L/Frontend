import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render without crashing', () => {
    const { getByTestId } = render(<NavBar />);
    expect(getByTestId('NavBar')).toBeInTheDocument();
  });

  it('should render with default props', () => {
    const { getByTestId } = render(<NavBar />);
    expect(getByTestId('NavBar')).toBeInTheDocument();
  });

  // it('should accept custom props', () => {
  //   const { getByTestId } = render(<NavBar customProp="test" />);
  //   expect(getByTestId('NavBar')).toHaveTextContent('test');
  // });

  // it('should call onClick when clicked', () => {
  //   const handleClick = jest.fn();
  //   const { getByTestId } = render(<NavBar onClick={handleClick} />);
  //   fireEvent.click(getByTestId('NavBar'));
  //   expect(handleClick).toHaveBeenCalled();
  // });

  // ...add more tests as needed...
});