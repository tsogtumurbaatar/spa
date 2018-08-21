import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './app/App';

import IndexPage from './app/IndexPage';
import ConfirmPage from './app/ConfirmPage';

import SignInFormContainer from './user/SignInFormContainer';
import SignUpFormContainer from './user/SignUpFormContainer';
import DashBoard from './user/DashBoard';
import UserInfoFormContainer from './userinfo/UserInfoFormContainer';

export default (
  <Route path="/" component={App}>
  <IndexRoute components={IndexPage} />
  <Route path="/signin" component={SignInFormContainer} />
  <Route path="/signup" component={SignUpFormContainer} />
  <Route path="/dashboard" component={DashBoard} />
  <Route path="/user/:userid" component={UserInfoFormContainer} />
  <Route path="/confirm/:email" component={ConfirmPage} />
  </Route>
  );