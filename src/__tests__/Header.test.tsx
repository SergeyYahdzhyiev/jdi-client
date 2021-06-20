import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { Header } from '../components/Header';

describe('Header', () => {
  test('should render component', () => {
    const component = render(
      <Router>
        <Header />
      </Router>,
    );
    expect(component.getAllByRole('logo')).toBeTruthy();
    expect(component.getAllByRole('nav-link')).toBeTruthy();
    expect(component).toMatchSnapshot();
  });
});
