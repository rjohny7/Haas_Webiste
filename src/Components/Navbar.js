import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import Logo from "./favicon.ico";

// Navbar that sits at the top of the page. It's a list of links that navigate you to different pages in the website

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
      username: "",
      loggedIn: this.props.loggedIn,
    };
  }
  
  render() {
    let lastTab;
    if (!this.props.loggedIn) {
      lastTab = (
        <Link to="/login" className="nav-links">
          Login or Sign Up
        </Link>
      );
    } else {
      lastTab = (
        <Link id="signed-in" to="/user" className="nav-links">
          {"Welcome, " + this.props.userName}
        </Link>
      );
    }
    return (
      <nav className="navbar">
        <div className="navbar-container">
          {/* We would use the icon here */}
          <Link to="/" className="navbar-logo">
            <img src={Logo} />
          </Link>
          <ul className="nav-menu">
            <li className="nav-item">
              {/* Clicking on this object will take you to computing-resources page*/}
              <Link to="/computing-resources" className="nav-links">
                Computing Resources
              </Link>
            </li>
            <li className="nav-item">
              {/* Clicking on this object will take you to LOCATION-TWO page*/}
              <Link to="/LOCATION-TWO" className="nav-links">
                Our Hardware
              </Link>
            </li>
            <li className="nav-item">
              {/* Clicking on this object will take you to Project page*/}
              <Link to="/projects" className="nav-links">
                Create or Manage Projects
              </Link>
            </li>
            <li className="nav-item">
              {/* Clicking on this object will take you to Downloads page*/}
              <Link to="/download" className="nav-links">
                Downloads
              </Link>
            </li>
            <li className="nav-item">{lastTab}</li>
          </ul>
        </div>
      </nav>
    );
  }

  setLogIn() {
    this.setState({ loggedIn: true });
  }
  setLoggedOut() {
    this.setState({ loggedIn: false });
  }
  setUsername(user) {
    this.setState({ username: user });
  }
}

export default Navbar;
