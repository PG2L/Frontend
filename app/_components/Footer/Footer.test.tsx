import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Footer', () => {
    it('should render without crashing', () => {
        const { getByTestId } = render(<Footer />);
        expect(getByTestId('footer')).toBeInTheDocument();
    });
});