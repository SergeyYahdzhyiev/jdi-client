import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header, Footer } from './components';

export const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Footer />
    </Router>
  );
};
