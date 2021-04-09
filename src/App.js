import React, {useState} from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Carousel from "./Components/Carousel";
import availabilityTable from "./Components/Availability";
import Authentication from "./Components/Authentication";
import Project from "./Components/Project";
import datasets from "./Components/Datasets";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/*function setLoggedIn(_loggedIn){
   loggedIn = _loggedIn;
   alert("in setLoggin");
   alert(loggedIn);
}*/
// App which runs the whole site, uses routers that link to components we have built in other files
function App(props) {
   const loggedIn = useState(false);
   const changeState = loggedIn[1];
  return (
    <>
      {/* Use router to switch pages through the navbar */}
      <Router>
        <Navbar loggedIn={loggedIn[0]}/>
        <Switch>
          {/* Home Page Route*/}
          <Route path="/" exact component={Home} />
        </Switch>
        <Switch>
          {/* Page 1 Route*/}
          <Route
            path="/computing-resources"
            exact
            component={availabilityTable}
          />
        </Switch>
        <Switch>
          {/* Page 2 Route*/}
          <Route
            path="/LOCATION-TWO"
            render={(props) => <Carousel {...props} init={0} />}
          />
        </Switch>
        <Switch>
          {/* Page 3 Route*/}
          <Route path="/login"
          render={(props)=> <Authentication {...props} setLoggedIn={function setLoggedIn(_loggedIn){changeState(_loggedIn);}}/>}  
          />
        </Switch>
        <Switch>
          {/* Page 4 Route*/}
          <Route path="/projects" exact component={Project} />
        </Switch>
        <Switch>
          {/* Page 4 Route*/}
          <Route path="/download" exact component={datasets} />
        </Switch>
      </Router>
    </>
  );

  
}

export default App;