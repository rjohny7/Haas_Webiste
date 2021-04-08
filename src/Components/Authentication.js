import React from "react";
import "./Authentication.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

class Authentication extends React.Component {
  render() {
    /*
            The render code was sourced from a youtube tutorial showing how to create a simple yet professional looking login page. All credit to Kris Foster, https://www.youtube.com/watch?v=XHPL-rX9m-Q
            Some minor tweaks include adding the google login button and instead of writing it in the main App.js file, it is written as a component and will be called when the user clicks on the sign in link
        */
    return (
      <Form className="Login">
        <FormGroup className="col">
          <Input className="input-email" type="email" placeholder="Email" />
        </FormGroup>

        <FormGroup>
          <Input
            className="input-password"
            type="password"
            placeholder="Password"
          />
        </FormGroup>

        <div className="main-button">
          <button
            className="btn-lg btn-dark"
            onClick={() => this.handleLogIn()}
          >
            Log in
          </button>
        </div>
        <div className="text-center pt-3">
          Or continue with your social account
        </div>
        <FacebookLoginButton
          className="mt-3 mb-3"
          onClick={() => this.handleFacebook()}
        />
        <GoogleLoginButton
          className="mt-3 mb-3"
          onClick={() => this.handleGoogle()}
        />
        <div className="text-center">
          <a href="/sign-up">Sign up</a>
          <span className="p-2">|</span>
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </Form>
    );
  }

  handleLogIn() {
    alert("Log in");
  }

  handleFacebook() {
    alert("Facebook");
  }

  handleGoogle() {
    alert("Google");
  }
  //Login functionality will be replaced in the future
}

export default Authentication;
