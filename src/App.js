import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Carousel from "./Components/Carousel";
import availabilityTable from "./Components/Availability";
import Authentication from "./Components/Authentication";
import Project from "./Components/Project";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// App which runs the whole site, uses routers that link to components we have built in other files
function App() {
  return (
    <>
      {/* Use router to switch pages through the navbar */}
      <Router>
        <Navbar />
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
          <Route path="/login" exact component={Authentication} />
        </Switch>
        <Switch>
          {/* Page 4 Route*/}
          <Route path="/projects" exact component={Project} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
