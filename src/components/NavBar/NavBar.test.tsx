import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NavBar from './NavBar';

describe('NavBar', () => {
    it('should render without crashing', () => {
        const { getByTestId } = render(<NavBar />);
        expect(getByTestId('navBar')).toBeInTheDocument();
    });
});