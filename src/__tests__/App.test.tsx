import React from 'react';
import { render } from '@testing-library/react';
import { App } from '../App';

describe('App', () => {
  test('should render component', () => {
    const component = render(<App />);
    expect(component).toMatchSnapshot();
    expect(component.getByRole('heading')).toBeTruthy();
    expect(component.getByRole('heading').textContent).toMatch(/Hello Jdi!/);
  });
});
