import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Templates
import TemplateNothing from '../components/TemplateNothing';
import TemplateSidebar from '../components/TemplateSidebar';

// Routes
import Home from '../components/Home';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import NewWalkContainer from '../../containers/NewWalk';
import NewWalkComponent from '../components/NewWalk';

import Error from '../components/Error';

const Index = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <TemplateSidebar>
          <Home {...props} />
        </TemplateSidebar>
      )}
    />
    <Route
      path="/sign-up"
      render={props => (
        <TemplateNothing pageTitle="Sign Up">
          <SignUpContainer {...props} Layout={SignUpComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/new-walk"
      render={props => (
        <TemplateNothing pageTitle="Add new walk">
          <NewWalkContainer {...props} Layout={NewWalkComponent} />
        </TemplateNothing>
      )}
    />

    <Route
      path="/login"
      render={props => (
        <TemplateNothing pageTitle="Login">
          <LoginContainer {...props} Layout={LoginComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/forgot-password"
      render={props => (
        <TemplateNothing pageTitle="Forgot Password">
          <ForgotPasswordContainer {...props} Layout={ForgotPasswordComponent} />
        </TemplateNothing>
      )}
    />
    <Route
      path="/update-profile"
      render={props => (
        <TemplateSidebar pageTitle="Update Profile">
          <UpdateProfileContainer {...props} Layout={UpdateProfileComponent} />
        </TemplateSidebar>
      )}
    />
    <Route
      render={props => (
        <TemplateSidebar pageTitle="404 - Page note found">
          <Error {...props} title="404" content="Sorry, the route you requested does not exist" />
        </TemplateSidebar>
      )}
    />
  </Switch>
);

export default Index;
