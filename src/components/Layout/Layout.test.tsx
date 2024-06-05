import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Layout from './Layout';

describe('Layout', () => {
    it('should render without crashing', () => {
        const { getByTestId } = render(<Layout>{undefined}</Layout>);
        expect(getByTestId('layout')).toBeInTheDocument();
    });
});