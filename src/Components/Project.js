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
                    <Input type="text" placeholder="Enter Name" id = 'project-name'/>
                </FormGroup>
                <FormGroup>
                    <Label>Project Description</Label>
                    <Input type="text" placeholder="Enter Description" id = 'project-description'/>
                </FormGroup>
                <FormGroup>
                    <Label>Project ID</Label>
                    <Input type="text" placeholder="Enter ID" id = 'project-id-create'/>
                </FormGroup>
                <button className="btn-lg btn-dark btn-block" onClick={() => this.handleCreate()}>Create Project</button>
                <div className="text-center pt-3">
                    Or manage an existing project
                </div>
                <FormGroup>
                    <Label>Project ID</Label>
                    <Input type="text" placeholder="Enter ID" id = 'project-id-view'/>
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block" onClick={() => this.handleView()}>View Project</Button>
            </Form>
        );
    }



    handleCreate() {
        //update link to heroku link later
        alert('http://127.0.0.1:5000/Projects/'+document.getElementById('project-name').value+'/'+document.getElementById('project-description').value+'/'+document.getElementById('project-id-create').value);
        const response = axios.post('http://127.0.0.1:5000/Projects/'+document.getElementById('project-name').value+'/'+document.getElementById('project-description').value+'/'+document.getElementById('project-id-create').value).then((response) =>{
            alert("Made it to then");
            if(response == 500){
            alert("Some error occurred");
            }
            else if(response == 404){
            alert("Project id already exists");
            }
            else{
            this.state = {
                name: document.getElementById('project-name'),
                description: document.getElementById('project-description'),
                project_id: document.getElementById('project-id-create'),
            };
            alert("Successfully created project " + document.getElementById('project-name'));
            }
      })
   } 

    handleView(){
        //update link to heroku link later
        alert('http://127.0.0.1:5000/Projects/a/b/'+document.getElementById('project-id-view').value);
        const response = axios.get('http://127.0.0.1:5000/Projects/a/b/'+document.getElementById('project-id-view').value).then((response) =>{
            alert("Made it to then");
            if(response == 500){
            alert("Some error occurred");
            }
            else if(response == 404){
            alert("Project id does not exist");
            }
            else{
            this.state = {
                //unpack values from response here, right now is temporary
                name: document.getElementById('project-name'),
                description: document.getElementById('project-description'),
                project_id: document.getElementById('project-id-create'),
            };
            alert("Successfully viewing project " + document.getElementById('project-name'));
            }
      })
   }
}

export default Project