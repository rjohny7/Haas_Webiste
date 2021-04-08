import React from "react";
import "./Availibility.css";
const locations = ["Austin", "Houston", "Dallas", "Location"];
const availableKeyWords = ["", "no"];
const NO = 0;

class availabilityTable extends React.Component {
  //creates a table that shows whether there are available hardware resources in the area
  constructor(props) {
    super(props);
    this.state = {
      maxCapacity: NO, //0 r efers to the keyword
      region: 3, //refers to index in locations array
    };
  }

  swapState(i) {
    this.setState({
      maxCapacity: this.state.maxCapacity, //changes to either "" or "no" in availablekeywords
      region: i, //swaps the location to locations[i]
    });
  }
  render() {
    //creates a dropdown and table
    //dropdown selects the region
    //table shows whether there are resources available in that region
    return (
      <div>
        <table>
          <tr>
            <td>
              <div class="dropdown">
                <button class="dropbtn">{locations[this.state.region]}</button>
                <div class="dropdown-content">
                  <button onClick={(i = 0) => this.swapState((i = 0))}>
                    {locations[0]}
                  </button>
                  <button onClick={(i = 1) => this.swapState((i = 1))}>
                    {locations[1]}
                  </button>
                  <button onClick={(i = 2) => this.swapState((i = 2))}>
                    {locations[2]}
                  </button>
                </div>
              </div>
            </td>
            <td id="isAvailable">
              There are {availableKeyWords[this.state.maxCapacity]} available
              resources in {locations[this.state.region]}!
            </td>
          </tr>
        </table>
        <br/>
        <button className="checkout">{"Checkout Hardware Resources"}</button><br/><br/>
        <button className="download">{"Download Datasets"}</button>
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
