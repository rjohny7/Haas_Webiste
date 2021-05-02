import React, { useEffect } from "react";
import "./Authentication.css";
import { Form, FormGroup, Label, Input, Container, Navbar } from "reactstrap";
import axios from "axios";

//<script src="https://apis.google.com/js/platform.js" async defer></script>;

// import {
//   FacebookLoginButton,
//   GoogleLoginButton,
// } from "react-social-login-buttons"; These are not being implemented as it requires our app to be verified by the respective companies. Otherwise they would be implemented
import { StylesProvider } from "@material-ui/styles";

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: this.props.loggedIn,
      username: this.props.userName,
      credits: this.props.credits,
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
    if (this.state.loggedIn) {
      return (
        <div>
          <p>You are currently signed in as {this.state.username}</p>
          <p>You currently have {this.state.credits} credits left</p>
          <br />
          <button
            id="sign-out"
            className="btn-lg btn-dark btn-block"
            onClick={() => this.handleLogOut()}
          >
            Sign Out
          </button>
        </div>
      );
    }
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
            <button type="button" onClick={() => this.handleLogIn()}>
              Log in
            </button>
          </Container>
          <Container className="signup-button">
            <button type="button" onClick={() => this.handleSignUp()}>
              Sign Up
            </button>
          </Container>
        </Container>
        <div className="text-center pt-3">
          Or continue with your social account
        </div>
        <div className="text-center">
          <a href="/forgot-password">Forgot Password</a>
        </div>
      </Form>
    );
  }

  /*
    The following handlers must be updated
  */
  handleLogOut() {
    this.props.setLoggedIn(false);
    this.props.setUser("");
    this.setState({ loggedIn: false, userName: "" });
  }

  handleLogIn() {
    //update link to heroku link later
    //e.preventDefault();

    //<Route path="/user"></Route>
    fetch(
      "/Login/" +
        document.getElementsByClassName("input-email")[0].value +
        "/" +
        document.getElementsByClassName("input-password")[0].value,
      { method: "GET" }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        if (data == null) {
          alert("Some error occurred");
        } else if (data == "Incorrect username or password") {
          alert(data);
        } else {
          this.setState({
            loggedIn: true,
            username: data["username"],
            credits: data["credits"],
          });
          console.log("Signing in as " + data["username"]);
          alert("Signing in as " + data["username"]);
          this.props.setLoggedIn(true);
          this.props.setUser(data["username"]);
          console.log(this.state.credits);
        }
      });
  }

  /* handleFacebook() {
    alert("Facebook");
  }
                                      This code is commented out as we are not implementing the google/facebook buttons
  handleGoogle() {
    alert("Google");
  }*/

  handleSignUp() {
    //update link to heroku link later
    //e.preventDefault();
    fetch(
      "/Login/" +
        document.getElementsByClassName("input-email")[0].value +
        "/" +
        document.getElementsByClassName("input-password")[0].value,
      { method: "POST" }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        if (data == null) {
          alert("Some error occurred");
        } else if (data == "Username is already taken") {
          alert(data);
        } else {
          this.setState({
            loggedIn: true,
            username: data["username"],
            credits: data["credits"],
          });
          alert("Signing in after registering as " + data["username"]);
          this.props.setLoggedIn(true);
          this.props.setUser(data["username"]);
          console.log(this.state.credits);
        }
      });
  }
  //Login functionality will be replaced in the future
}

export default Authentication;
