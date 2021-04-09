import React from "react";
import "./Authentication.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from 'axios';

class Project extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: null, //project name
            description: null, //project description
            project_id: null, //project id 
        }
    }
    render() {
        return(
            <Form className="Create">
                <FormGroup>
                    <Label>Project Name</Label>
                    <Input type="text" placeholder="Enter Name" className = 'project-name'/>
                </FormGroup>
                <FormGroup>
                    <Label>Project Description</Label>
                    <Input type="text" placeholder="Enter Description" className = 'project-description'/>
                </FormGroup>
                <FormGroup>
                    <Label>Project ID</Label>
                    <Input type="text" placeholder="Enter ID" className = 'project-id-create'/>
                </FormGroup>
                <button type = "button" onClick={() => this.handleCreate()}>Create Project</button>
                <div className="text-center pt-3">
                    Or manage an existing project
                </div>
                <FormGroup>
                    <Label>Project ID</Label>
                    <Input type="text" placeholder="Enter ID" className = 'project-id-view'/>
                </FormGroup>
                <button type = "button" onClick={() => this.handleView()}>View Project</button>
            </Form>
        );
    }



    handleCreate() {
        //update link to heroku link later
        fetch('/Projects/'+document.getElementsByClassName('project-name')[0].value+'/'+document.getElementsByClassName('project-description')[0].value+'/'+document.getElementsByClassName('project-id-create')[0].value, {method:"POST"}).then(response=>{
            if(response.ok){
              return response.json()
            }
          }).then(data => {
            if(data == null){
                alert("Some error occurred");
            }
            else if(data == "Project id already exists"){
                alert(data);
            }
            else{
              this.setState({
                    name: data['name'],
                    description: data['description'],
                    project_id: data['project_id'],
              })
              alert("Creating and viewing project " + this.state.name);
            }
        })
   } 

    handleView(){
        fetch('/Projects/a/b/'+document.getElementsByClassName('project-id-view')[0].value, {method:"GET"}).then(response=>{
            if(response.ok){
                return response.json()
            }
            }).then(data => {
                alert(data);
            if(data == null){
                alert("Some error occurred");
                console.log("Some error occurred");
            }
            else if(data == "Not found"){
                alert("Project not found");
                console.log("Project not found");
            }
            else{
                this.setState({
                    name: data['name'],
                    description: data['description'],
                    project_id: data['project_id'],
                })
                alert("Viewing project " + this.state.name);
                console.log("Viewing project " + this.state.name);
            }
        })
   }    
}

export default Project