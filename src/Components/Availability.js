import React from 'react';
import "./Availibility.css";
const locations = ["Austin", "Houston", "Dallas", "Location"];
const availableKeyWords = ["", "no"]


class availabilityTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxCapacity: 0,
            region: 3,  //refers to index in locations array
        };
    }

    swapState(i){
        this.setState({
            maxCapacity: this.state.maxCapacity,
            region: i,
        });
    }
    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td>
                        <div class="dropdown">
                            <button class="dropbtn">{locations[this.state.region]}</button>
                            <div class="dropdown-content">
                                <button onClick={(i=0) => this.swapState(i=0)}>{locations[0]}</button>
                                <button onClick={(i=1) => this.swapState(i=1)}>{locations[1]}</button>
                                <button onClick={(i=2) => this.swapState(i=2)}>{locations[2]}</button>
                            </div>
                        </div>
                        </td>
                        <td id = "isAvailable">
                            There are {availableKeyWords[this.state.maxCapacity]} available resources in {locations[this.state.region]}!
                        </td>   
                    </tr>
                </table>
            </div>
        )
    }

// Turn auto update stuff into something else later
// Won't make too much sense after we hook things up to the backend
    componentDidMount() {
        this.timerID = setInterval(
            () => this.updateTable(), 1500
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    updateTable() {
        let isFull = 0;
        let curRegion = this.state.region;
        const randNum = Math.round(Math.random() * 5);
        

        if(randNum === 1) isFull = 1;
        
        this.setState({
            maxCapacity: isFull,
            region: this.state.region,
        });
    }
}

export default availabilityTable