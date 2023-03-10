import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sale app', () => {
  render(<App />);
  const titleElement = screen.getByText(/sale products/i);
  expect(titleElement).toBeInTheDocument();
});
