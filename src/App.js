import React from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Carousel from './Components/Carousel';
import availabilityTable from './Components/Availability';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(){
    return(
        <>
        <Router>
            <Navbar/>
            <Switch>
               <Route path="/" exact component={Home} /> 
            </Switch>
            <Switch>
               <Route 
                  path="/computing-resources" 
                  exact component={availabilityTable}
               />
            </Switch>
            <Switch>
               <Route 
                  path="/LOCATION-TWO" 
                  render={(props) => (
                     <Carousel {...props} init={0} />
                   )}
               /> 
            </Switch>
            <Switch>
               <Route path="/LOCATION-THREE" exact /> 
            </Switch>
        </Router>
        </>
    );
}

export default App;