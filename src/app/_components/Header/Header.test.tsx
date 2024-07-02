import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header', () => {
	it('should render without crashing', () => {
		const { getByTestId } = render(<Header />);
		expect(getByTestId('header')).toBeInTheDocument();
	});
});