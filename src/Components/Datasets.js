import React from "react";
import "./Datasets.css";
import * as reactstrap from "react-bootstrap";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
//data is the object that will hold the data for each dataset that a user can download. Name is the name of dataset, description the description and download is the download link that will run when you click on the download button
class data {
  constructor(name, description, download) {
    this.name = name;
    this.description = description;
    this.download = download;
  }

  get title() {
    return this.name;
  }
  get desc() {
    return this.description;
  }
  get dwnld() {
    return this.download;
  }
  set _name(input) {
    this.name = input;
  }
  set _description(input) {
    this.description = input;
  }
  set _download(input) {
    this.download = input;
  }
}

class datasets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataArray: [],
    };
    this.constructArray();
  }
  /*
        To Do: map to dataArray, create table title, create buttons for download, 

    */
  render() {
    return (
      <reactstrap.Table>
        <thead>
          <tr>
            <th>Download Dataset</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{this.state.dataArray.map(this.renderDataSet)}</tbody>
      </reactstrap.Table>
    );
  }

  //this renders a single row in the table, it creates a button that will eventually
  renderDataSet = (data, index) => {
    //insert dataset render here
    const buttonLabel = data.name;
    const buttonDownload = data.download;
    const description = data.description;

    return (
      <tr key={index}>
        <td>
          <Link
            to={buttonDownload}
            className="btn btn-lg btn-dark btn-block"
            onClick={() => this.downloadFile(buttonDownload)}
          >
            {buttonLabel}
          </Link>
        </td>
        <td>
          <p>{description}</p>
        </td>
      </tr>
    );
  };

  //***API GOES HERE MUST REPLACE THIS WITH API******************************
  constructArray = () => {
    const first = new data("test1", "description1", "https://www.utexas.edu");
    const second = new data(
      "test2",
      "This is a longer description intended to test",
      "https://www.google.com"
    );
    const third = new data(
      "This is a longer name",
      "Does it work?",
      "https://www.ece.utexas.edu/academics/undergraduate/curriculum"
    );

    this.updateTable(first);
    this.updateTable(second);
    this.updateTable(third);
    this.updateTable(third);
    this.updateTable(second);
    this.updateTable(first);
  };

  updateTable(data) {
    this.setState({
      dataArray: this.state.dataArray.push(data),
    });
  }

  downloadFile(link) {}
}

export default datasets;
