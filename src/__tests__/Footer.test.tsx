import React from 'react';
import { render } from '@testing-library/react';
import { Footer } from '../components/Footer';

describe('Footer', () => {
  test('should render component', () => {
    const component = render(<Footer />);
    expect(component.getByRole('copyright')).toBeTruthy();
    expect(component.getAllByRole('social-link')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
