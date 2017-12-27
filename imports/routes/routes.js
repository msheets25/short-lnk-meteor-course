import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory'

import Signup from '../ui/Signup';
import Link from '../ui/Link';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

export const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    history.replace('/links');
  } else if (!isAuthenticated && isAuthenticatedPage) {
    history.replace('/');
  }
};
export const routes = (
  <Router history={history}>
    <Switch>
      <Route path="/" exact render={() => (Meteor.userId() ? <Redirect to="/links"/> : <Login/>)}/>
      <Route path="/signup" render={() => (Meteor.userId() ? <Redirect to="/links"/> : <Signup/>)}/>
      <Route path="/links" render={() => (!Meteor.userId() ? <Redirect to="/"/> : <Link/>)}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>
);
