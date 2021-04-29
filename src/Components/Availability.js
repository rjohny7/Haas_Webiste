import React from "react";
import "./Availibility.css";
import {Form, FormGroup, Label, Input} from "reactstrap";
/*const locations = ["Austin", "Houston", "Dallas", "Location"];
//const sets = ["HWSet 1", "HWSet 2"];
//const availableKeyWords = ["", "no"];
//const NO = 0;*/

class Availability extends React.Component {
  //creates a table that shows whether there are available hardware resources in the area
  constructor(props) {
    super(props);
    this.state = {
      availability: [20,10],
      capacity: [20,10],
      loggedIn: this.props.loggedIn,
      username: this.props.userName,
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
              {this.state.capacity[0]}
            </td>
            <td id="available">
              {this.state.availability[0]}
            </td>
            <td id="request-1">
              <Form>
                <FormGroup>
                  <Input type="text" placeholder="Request Capacity" id = 'set1-request'/>
                </FormGroup>
              </Form>
            </td>
            <td>
              <button onClick={() => this.handleCheckout('1', document.getElementById("set1-request").value)}>Checkout</button>
            </td>
            <td>
              <button onClick={() => this.handleCheckin('1', document.getElementById("set1-request").value)}>Checkin</button>
            </td>
          </tr>
          <tr>
            <td id="HWSet2">
              HW Set 2
            </td>
            <td id="capacity">
              {this.state.capacity[1]}
            </td>
            <td id="available">
              {this.state.availability[1]}
            </td>
            <td id="request-2">
              <Form>
                <FormGroup>
                  <Input type="text" placeholder="Request Capacity" id = 'set2-request' />
                </FormGroup>
              </Form>
            </td>
            <td>
              <button onClick={() => this.handleCheckout('2', document.getElementById("set2-request").value)}>Checkout</button>
            </td>
            <td>
              <button onClick={() => this.handleCheckin('2', document.getElementById("set2-request").value)}>Checkin</button>
            </td>
          </tr>
        </table>
      </div>
    );
  }

  handleCheckout(set_id, input_value){
    fetch('/HardwareResources/'+set_id+'/T/'+input_value, {method:"POST"}).then(response => {
        if(response.ok){
          return response.json()
        }
    }).then(data => {
      if(data == null){
        alert("Some error occurred");
      }
      else if(data == "Requested amount exceeds available hardware"){
        alert(data);
      }
      else{
        const avail = this.state.availability.slice(0, this.state.availability.length);
        const capac = this.state.capacity.slice(0, this.state.capacity.length);
        //temporarily capacity and availability are the same thing
        avail[parseInt(set_id)-1] = data['capacity'];
        capac[parseInt(set_id)-1] = data['capacity'];
        this.setState({
          availability: avail,
          capacity: capac,
          loggedIn: this.props.loggedIn,
          username: this.props.userName,
        })
      }
    })
  }

  handleCheckin(set_id, input_value){
    fetch('/HardwareResources/'+set_id+'/F/'+input_value, {method:"POST"}).then(response => {
      if(response.ok){
        return response.json()
      }
    }).then(data => {
      if(data == null){
        alert("Some error occurred");
      }
      else if(data == "Requested amount exceeds available hardware"){
        alert(data);
      }
      else{
        const avail = this.state.availability.slice(0, this.state.availability.length);
        const capac = this.state.capacity.slice(0, this.state.capacity.length);
        //temporarily capacity and availability are the same thing
        avail[parseInt(set_id)-1] = data['capacity'];
        capac[parseInt(set_id)-1] = data['capacity'];
        this.setState({
          availability: avail,
          capacity: capac,
          loggedIn: this.props.loggedIn,
          username: this.props.userName,
        })
      }
    })
  }
  
  componentWillMount(){
    //dummy variables a b c since get does not use them
    fetch('/HardwareResources/a/b/c', {method:"GET"}).then(response=>{
      if(response.ok){
        return response.json()
      }
    }).then(data => {
      if(data == null){
        alert("Some error occurred");
      }
      else{
        const avail = [data[0]['amount'], data[1]['amount']];
        const capac = [data[0]['capacity'], data[1]['capacity']];
        this.setState({
          availability: avail,
          capacity: capac,
          loggedIn: this.props.loggedIn,
          username: this.props.userName,
        })
      }
    })
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

export default Availability;