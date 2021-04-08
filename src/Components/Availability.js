import React from "react";
import "./Availibility.css";
import {Form, FormGroup, Label, Input} from "reactstrap";
//const locations = ["Austin", "Houston", "Dallas", "Location"];
const sets = ["HWSet 1", "HWSet 2"];
var availability = [20, 10];
var capacity = [20, 10];
//const availableKeyWords = ["", "no"];
const NO = 0;

class availabilityTable extends React.Component {
  //creates a table that shows whether there are available hardware resources in the area
  constructor(props) {
    super(props);
    this.state = {
      //maxCapacity: NO, //0 r efers to the keyword
      //region: 3, //refers to index in locations array
    };
  }

  swapState(i, isAvailable) {
    this.
    this.setState({
      //maxCapacity: this.state.maxCapacity, //changes to either "" or "no" in availablekeywords
     // region: i, //swaps the location to locations[i]
    });
  }
  render() {
    //creates a table
    //table shows resource availability and allows user to check in/out resources
    return (
      <div>
        <br/>
        <p>Checkin or Checkout hardware resources</p><br/>
        <table>
          <thead>
            <th>Set</th>
            <th>Capacity</th>
            <th>Availability</th>
            <th>Request</th>
          </thead>
          <tr>
            <td id="HWSet1">
              HW Set 1
            </td>
            <td id="capacity">
              {capacity[0]}
            </td>
            <td id="available">
              {availability[0]}
            </td>
            <td id="request">
              <Form>
                <FormGroup>
                  <Input type="text" placeholder="Request Capacity" id = 'set1-request'/>
                </FormGroup>
              </Form>
            </td>
            <td>
              <button className="btn-lg btn-dark btn-block">Checkout</button>
            </td>
            <td>
              <button className="btn-lg btn-dark btn-block">Checkin</button>
            </td>
          </tr>
          <tr>
            <td id="HWSet2">
              HW Set 2
            </td>
            <td id="capacity">
              {capacity[1]}
            </td>
            <td id="available">
              {availability[1]}
            </td>
            <td id="request">
              <Form>
                <FormGroup>
                  <Input type="text" placeholder="Request Capacity" id = 'set2-request' />
                </FormGroup>
              </Form>
            </td>
            <td>
              <button className="btn-lg btn-dark btn-block">Checkout</button>
            </td>
            <td>
              <button className="btn-lg btn-dark btn-block">Checkin</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  /*
  *********************IMPORTANT***************************
  // Turn auto update stuff into something else later
  // Won't make too much sense after we hook things up to the backend
  *********************************************************
  */
  componentDidMount() {
    //this method is run whenever the component is made, updates the table every 1.5 seconds
    this.timerID = setInterval(() => this.updateTable(), 1500);
  }

  componentWillUnmount() {
    //clears the timer when component is deleted
    clearInterval(this.timerID);
  }

  /*
****************************IMPORTANT*****************************
this method must be updated later once the backend is implemented. Right now it randomly decides if a location has resources or not. Thus, once the backend can communicate, it can notify this method whether the selected location has hardware resources available or not
******************************************************************
  */
  updateTable() {
    //randomly decides if the location has resources
    let isFull = 0;
    let curRegion = this.state.region;
    const randNum = Math.round(Math.random() * 5);

    if (randNum === 1) isFull = 1;

    this.setState({
      maxCapacity: isFull,
      region: this.state.region,
    });
  }
}

export default availabilityTable;
