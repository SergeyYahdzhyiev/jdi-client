import React from 'react';
import { render } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  test('should render component', () => {
    const component = render(<Header />);
    expect(component.getAllByRole('logo')).toBeTruthy();
    expect(component.getAllByRole('nav-link')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
