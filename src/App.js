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
               <Route path="/LOCATION-ONE" exact component = {availabilityTable}/> 
            </Switch>
            <Switch>
               <Route path="/LOCATION-TWO" exact component = {Carousel}/> 
            </Switch>
            <Switch>
               <Route path="/LOCATION-THREE" exact /> 
            </Switch>
        </Router>
        </>
    );
}

export default App;