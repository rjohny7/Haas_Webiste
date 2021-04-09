import React, { useEffect } from "react";
import "./Authentication.css";
import { Form, FormGroup, Label, Input, Container, Navbar } from "reactstrap";
import axios from 'axios';

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import { StylesProvider } from "@material-ui/styles";

class Authentication extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: null,
    };
  }
  // componentDidMount() {
  //   fetch('/Login/test@gmail.com/test').then(response=>{
  //     if(response.ok){
  //       return response.json()
  //     }
  //   }).then(data => console.log(data))
  // }
  // componentDidUpdate() {
  //   fetch('/api').then(response=>{
  //     if(response.ok){
  //       return response.json()
  //     }
  //   }).then(data => console.log(data))
  // }
  render() {
    /*
            The render code was inspired from a youtube tutorial showing how to create a simple yet professional looking login page. All credit to Kris Foster, https://www.youtube.com/watch?v=XHPL-rX9m-Q
            Some minor tweaks include adding the google login button and instead of writing it in the main App.js file, it is written as a component and will be called when the user clicks on the sign in link. More differences have been added to fit the aesthetic of our website
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

        <Container>
          <Container className="login-button">
            <button type="button"
              onClick={() => this.handleLogIn()}
              
            >
              Log in
            </button>
          </Container>
          <Container className="signup-button">
            <button
            type = "button"
              onClick={() => this.handleSignUp()}
            >
              Sign Up
            </button>
          </Container>
        </Container>
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
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </Form>
    );
  }

  /*
    The following handlers must be updated
  */
 handleLogIn (){
    //update link to heroku link later
    //e.preventDefault();
    fetch('/Login/'+document.getElementsByClassName('input-email')[0].value+'/'+document.getElementsByClassName('input-password')[0].value, {method:"GET"}).then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data => {
      console.log(data);
      if(data == null){
        alert("Some error occurred");
      }
      else if(data == "Incorrect username or password"){
        alert(data);
      }
      else{
        this.setState({
          username: data,
        })
        console.log("Signing in as " + data);
        alert("Signing in as " + data);
      }
    })
  }

  handleFacebook() {
    alert("Facebook");
  }

  handleGoogle() {
    alert("Google");
  }

  handleSignUp() {
    //update link to heroku link later
    //e.preventDefault();
    fetch('/Login/'+document.getElementsByClassName('input-email')[0].value+'/'+document.getElementsByClassName('input-password')[0].value, {method:"POST"}).then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data => {
      if(data == null){
        alert("Some error occurred");
      }
      else if(data == "Username is already taken"){
        alert(data);
      }
      else{
        this.setState({
          username: data,
        })
        alert("Signing in after registering as " + data);
      }
    })
  }
  //Login functionality will be replaced in the future
}

export default Authentication;
