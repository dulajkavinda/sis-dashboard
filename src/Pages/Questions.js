import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Jumbotron } from "reactstrap";
import { Progress } from "reactstrap";
import { Link } from "react-router-dom";
import { render } from "@testing-library/react";
import axios, { post } from "axios";
class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicants_name: "",
      email: "",
      age: "",
      bio: "",
      gender: "",
      cv_text: "",
      file: null,
      filename: "",
      modal: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeFile = this.onChangeFile.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }

  toggle = () => this.setState({ modal: !this.state.modal });

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.fileUpload(this.state.file).then((response) => {
      console.log(response.data);
      this.toggle();
    });
  }

  fileUpload(file) {
    const url = "https://personality0023.herokuapp.com/uploadCV";
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return post(url, formData, config);
  }

  onChangeFile(e) {
    this.setState({
      file: e.target.files[0],
      filename: e.target.files[0].name,
    });
  }

  render() {
    const { id, job } = this.props.location.state;
    return (
      <div className="container" style={{ width: "60%", top: "300px" }}>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>CV Processed</ModalHeader>
          <ModalBody>Your CV is succesfully added to the database.</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
        <div style={{ marginTop: 20 }}>
          <Jumbotron
            style={{
              height: 200,
              backgroundColor: "gray",
              color: "ghostwhite",
            }}
          >
            <p
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 22 }}
              className="lead"
            >
              {job} #{id}
            </p>
            <p style={{ textAlign: "center" }} className="lead">
              Personal Information (1/2)
            </p>
          </Jumbotron>
        </div>
        <div style={{ height: 10, width: 300 }}></div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="apname">Applicants Name</Label>
            <Input
              type="text"
              name="applicants_name"
              value={this.state.applicants_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Age</Label>
            <Input
              name="age"
              type="number"
              value={this.state.age}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleSelect">Gender</Label>
            <Input
              type="select"
              name="gender"
              onChange={this.handleChange}
              value={this.state.gender}
              id="exampleSelect"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleText">Tell us little bit about yourself..</Label>
            <Input
              type="textarea"
              name="bio"
              id="bio"
              value={this.state.bio}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="exampleFile">Upload Your CV</Label>
            <Input
              type="file"
              name="file"
              id="file"
              onChange={this.onChangeFile}
            />
            <FormText color="muted">
              Upload your CV in PDF format. PDF should be less than 5MB.
            </FormText>
          </FormGroup>
          <Button type="submit" color="info">
            Upload
          </Button>{" "}
          <Button color="success">
            <Link
              to={{
                pathname: "/personal",
                state: {
                  id: id,
                  job: job,
                  applicants_name: this.state.applicants_name,
                  age: this.state.age,
                  email: this.state.email,
                  gender: this.state.gender,
                  bio: this.state.bio,
                  cv_text: this.state.cv_text,
                  filename: this.state.filename,
                },
              }}
              style={{ textDecoration: "none", color: "white" }}
            >
              Next
            </Link>
          </Button>
          <div>
            <div className="text-center">50%</div>
            <Progress value={50} />
          </div>
        </Form>
      </div>
    );
  }
}

export default Questions;
