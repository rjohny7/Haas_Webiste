import React from "react";
import "./Authentication.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class Project extends React.Component {
    render() {
        return(
            <Form className="Create">
                <FormGroup>
                    <Label>Project Name</Label>
                    <Input type="text" placeholder="Enter Name" />
                </FormGroup>
                <FormGroup>
                    <Label>Project Description</Label>
                    <Input type="text" placeholder="Enter Description" />
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">Create Project</Button>
                <div className="text-center pt-3">
                    Or manage an existing project
                </div>
                <FormGroup>
                    <Label>Project ID</Label>
                    <Input type="text" placeholder="Enter ID" />
                </FormGroup>
                <Button className="btn-lg btn-dark btn-block">View Project</Button>
            </Form>
        );
    }
    
}

export default Project