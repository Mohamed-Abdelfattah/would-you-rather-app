import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Layout from './components/layout/Layout';
import NewQuestionPage from './pages/new-question';
import HomaPage from './pages/home';
import QuestionDetailsPage from './pages/questionDetails-page';
import LoginPage from './pages/loginPage';
import LeaderBoard from './pages/leader-board';

function App() {
  //
  const thereIsUserLoggedIn = useSelector((state) => state.users.activeUser);

  return (
    <Layout>
      <Switch>
        {!thereIsUserLoggedIn && (
          <Route path="/login">
            <LoginPage />
          </Route>
        )}

        {!thereIsUserLoggedIn && <Redirect from="*" to="/login" />}
        <Redirect exact from="/" to="/home" />

        <Route path="/home" exact>
          <HomaPage />
        </Route>
        <Route path="/add">
          <NewQuestionPage />
        </Route>
        <Route path="/questions/:id">
          <QuestionDetailsPage />
        </Route>
        <Route path="/leader-board">
          <LeaderBoard />
        </Route>
        {/* <Route path="*">
          <NotFound />
        </Route> */}
      </Switch>
    </Layout>
  );
}

export default App;
