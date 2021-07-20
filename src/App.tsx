import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Header, Footer, LoginForm, RegisterForm, Alert, Banner } from './components';
import { Main } from './components/Main';
import { useStores } from './hooks/stores.hook';

export const App: React.FC = observer(() => {
  const { userStore } = useStores();

  const getRoutes = useCallback(() => {
    if (userStore.token) {
      return <Route path="/" component={Main} />;
    }
    return (
      <>
        <Route exact path="/" component={Banner} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
      </>
    );
  }, [userStore.token]);
  return (
    <Router>
      <Header />
      <main>
        <Switch>{getRoutes()}</Switch>
        <Alert />
      </main>
      <Footer />
    </Router>
  );
});
