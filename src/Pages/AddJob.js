import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import { Jumbotron } from "reactstrap";
import { Progress } from "reactstrap";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  CardSubtitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      exp: "",
      edu: "",
      job_desc: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit = (evt) => {
    evt.preventDefault();
    let id = uuidv4();
    axios
      .post("https://personality0023.herokuapp.com/addjob", {
        Id: id,
        company: "AMEX GOLBAL",
        title: this.state.title,
        experience: this.state.exp,
        education: this.state.edu,
        job_desc: this.state.job_desc,
      })
      .then(
        (response) => {
          console.log(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  render() {
    return (
      <div>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/dashboard">Dashboard</NavbarBrand>
            <NavbarToggler onClick={true} />
            <Collapse isOpen={true} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/dashboard">Candiates</NavLink>
                </NavItem>
                <NavItem></NavItem>
                <NavItem>
                  <NavLink href="/addjob">Add Jobs</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/addjob">Support</NavLink>
                </NavItem>
              </Nav>
              <NavbarText>John Doe, Welcome!</NavbarText>
            </Collapse>
          </Navbar>
          <Jumbotron style={{ height: 150 }}>
            <p style={{ textAlign: "center" }} className="lead">
              Add New Job
            </p>
          </Jumbotron>
        </div>
        <div style={{ height: 5, width: 300 }}></div>
        <div className="container" style={{ width: "60%", top: "300px" }}>
          <div>
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag="a" href="/dashboard">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Add New Job
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="apname">Company</Label>
              <Input
                type="text"
                name="applicants_name"
                value="AMEX GOLBAL"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apname">Title</Label>
              <Input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleEmail">Experience(years)</Label>
              <Input
                name="exp"
                type="number"
                value={this.state.exp}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apname">Education</Label>
              <Input
                type="text"
                name="edu"
                value={this.state.edu}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="exampleText">Job Description</Label>
              <Input
                type="textarea"
                value={this.state.job_desc}
                onChange={this.handleChange}
                name="job_desc"
                id="exampleText"
              />
            </FormGroup>
            <Button color="success">
              <Link
                style={{ textDecoration: "none", color: "white" }}
                to={{
                  pathname: "/dashboard",
                  state: {},
                }}
              >
                Add
              </Link>
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default Questions;
