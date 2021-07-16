import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer, LoginForm, RegisterForm, Alert, Banner } from './components';

export const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <Switch>
          <Route exact path="/" component={Banner} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
        </Switch>
        <Alert />
      </main>
      <Footer />
    </Router>
  );
};
