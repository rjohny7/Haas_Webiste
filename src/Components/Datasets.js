import React from "react";
import "./Datasets.css";
import * as reactstrap from "react-bootstrap";
import { Button } from "reactstrap";
import { NavLink } from "react-router-dom";
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
      dataArray: [], //this dataArray will hold all the info needed for a row in the table. Name, description, and download link will be encompassed in the data class
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
          <a href={buttonDownload}>{buttonLabel}</a>
        </td>
        <td>
          <p>{description}</p>
        </td>
      </tr>
    );
  };

  //***API GOES HERE MUST REPLACE THIS WITH API******************************

  /*
    This works for now but we must do the api at some point
  */
  constructArray = () => {
    const first = new data(
      "Abdominal and Direct Fetal ECG Database",
      " Multichannel fetal electrocardiogram recordings obtained from 5 different women in labor, between 38 and 41 weeks of gestation.",
      "https://physionet.org/static/published-projects/adfecgdb/abdominal-and-direct-fetal-ecg-database-1.0.0.zip"
    );
    const second = new data(
      "A Pressure Map Dataset for In-bed Posture Classification",
      " Pressure sensor data captured from 13 participants in various sleeping postures. ",
      "https://physionet.org/static/published-projects/pmd/a-pressure-map-dataset-for-in-bed-posture-classification-1.0.0.zip"
    );
    const third = new data(
      "CAP Sleep Database",
      "The CAP Sleep Database is a collection of 108 polysomnographic recordings registered at the Sleep Disorders Center of the Ospedale Maggiore of Parma, Italy",
      "https://physionet.org/static/published-projects/capslpdb/cap-sleep-database-1.0.0.zip"
    );
    const fourth = new data(
      "Noise Enhancement of Sensorimotor",
      " Postural sway measurements for 27 healthy young and elderly volunteers.",
      "https://physionet.org/static/published-projects/nesfdb/noise-enhancement-of-sensorimotor-function-1.0.0.zip"
    );

    const fifth = new data(
      "Sleep Bioradiolocation Database",
      "The database contains 32 records of non-contact sleep monitoring by a bioradar.",
      "https://physionet.org/static/published-projects/sleepbrl/sleep-bioradiolocation-database-1.0.0.zip"
    );

    const sixth = new data(
      "Wrist PPG During Exercise",
      "Photoplethysmogram recorded from 8 volunteers during walking, running and bike riding.",
      "https://physionet.org/static/published-projects/wrist/wrist-ppg-during-exercise-1.0.0.zip"
    );
    this.updateTable(first);
    this.updateTable(second);
    this.updateTable(third);
    this.updateTable(fourth);
    this.updateTable(fifth);
    this.updateTable(sixth);
  };

  //This adds a row to the table. Previous rows to the table are not changed.
  updateTable(data) {
    this.setState({
      dataArray: this.state.dataArray.push(data),
    });
  }

  //this method will be implemented when the api is. Download's directly as opposed to going to the physionet page
  downloadFile(link) {}
}

export default datasets;
