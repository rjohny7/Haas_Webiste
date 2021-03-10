import React from 'react';
import "./Availibility.css";
const locations = ["Austin", "Houston", "Dallas"];
const availableKeyWords = ["", "no"]


class availabilityTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            maxCapacity: 0,
            region: 0,  //refers to index in locations array
        };
    }

    render() {
        return (
           
            <div>
                <table>
                    <tr>
                     <td>Current Region: {locations[this.state.region]}</td>
                     <td id = "isAvailable">There are {availableKeyWords[this.state.maxCapacity]} available resources!</td>   
                    </tr>
                </table>
            </div>
        )
    }


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
        region: (curRegion + 1) % 3
    });
}

}

export default availabilityTable