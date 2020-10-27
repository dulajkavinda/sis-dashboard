<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import {
  getAllQuestions,
  getInterviews,
  addQuestion,
  deleteQuiz,
} from "../api/Operations";
import {
  CDataTable,
  CButton,
  CCollapse,
  CCardBody,
  CModalBody,
  CModalHeader,
  CModal,
} from "@coreui/react";
import { AiFillEdit } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";
import { RiAddLine } from "react-icons/ri";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const Questions = (props) => {
  const [list, setList] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formmodal, setFormmodal] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState("");

  useState(() => {
    getInterviews().then((result) => {
      setInterviews(result);
    });
  }, []);

  const handleSelect = (e) => {
    getAllQuestions(e).then((res) => {
      setList(res);
    });
    setSelected(e);
  };

  const toggleFotm = () => {
    setFormmodal(!formmodal);
  };

  const [details, setDetails] = useState([]);

  const toggleDetails = (index) => {
    const position = details.indexOf(index);
    let newDetails = details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...details, index];
    }
    setDetails(newDetails);
  };

  const fields = [
    { key: "question", _style: { width: "40%" } },
    { key: "def_ans", _style: { width: "40%" } },
    {
      key: "show_details",
      label: "",
      _style: { width: "30%" },
      sorter: false,
      filter: false,
    },
  ];

  return (
    <div style={{ marginTop: 40, marginLeft: 120, marginRight: 120 }}>
      {selected ? (
        <h3 style={{ marginBottom: 20 }}>
          Question Set For <span className="badge badge-dark">{selected}</span>{" "}
        </h3>
      ) : (
        <p></p>
      )}
      <DropdownButton
        alignRight
        title="Select Interview"
        id="dropdown-menu-align-right"
        variant="outline-dark"
        onSelect={handleSelect}
      >
        {interviews.map((item, i) => {
          return (
            <Dropdown.Item eventKey={item.name}>{item.name}</Dropdown.Item>
          );
        })}
      </DropdownButton>
      <CModal show={formmodal} onClose={toggleFotm}>
        <CModalHeader closeButton>Add Question</CModalHeader>
        <CModalBody>
          <form onSubmit={(e) => e.preventDefault && false}>
            <div className="form-group">
              <label for="question">Question</label>
              <input
                type="text"
                className="form-control"
                id="question"
                name="question"
                aria-describedby="emailHelp"
                placeholder="Question"
                value={question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="answer">Pre-defined Answer</label>
              <input
                type="answer"
                className="form-control"
                id="answer"
                name="answer"
                placeholder="Pre-defined Answer"
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="keyword">Add Keyword</label>
              <input
                type="keyword"
                className="form-control"
                id="keyword"
                name="keyword"
                placeholder="Enter Keywords An"
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />

              {keywords.map((item) => {
                return (
                  <span
                    class="badge badge-pill badge-success"
                    style={{ marginLeft: 5 }}
                  >
                    {item}{" "}
                  </span>
                );
              })}
              <button
                className="btn btn-outline-success"
                type="button"
                style={{ marginTop: 10, marginBottom: 10 }}
                onClick={() => {
                  setKeywords([...keywords, keyword]);
                  setKeyword("");
                }}
              >
                <RiAddLine />
              </button>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-block"
              onClick={() => {
                {
                  addQuestion(selected, question, keywords, answer);
                  console.log(selected);
                }
                toggleFotm();
              }}
            >
              Add Question
            </button>
          </form>
        </CModalBody>
      </CModal>
      <button
        className="btn btn-outline-dark"
        onClick={() => {
          toggleFotm();
        }}
        style={{ marginRight: 10 }}
      >
        Add Question
      </button>
      <CDataTable
        items={list}
        fields={fields}
        tableFilter
        itemsPerPageSelect
        itemsPerPage={5}
        hover
        sorter
        pagination
        scopedSlots={{
          show_details: (item, index) => {
            return (
              <td className="py-2">
                <CButton
                  color="primary"
                  shape="square"
                  size="sm"
                  onClick={() => {
                    toggleDetails(index);
                  }}
                >
                  {details.includes(index) ? "Hide" : "Actions"}
                </CButton>
              </td>
            );
          },
          details: (item, index) => {
            return (
              <CCollapse show={details.includes(index)}>
                <CCardBody>
                  <a
                    href={`/candidatearchives/${props.match.params.name}`}
                    className="btn btn-warning"
                    style={{ marginRight: 20 }}
                    onClick={() => {
                      /* deleteCandidate(item._id, props.match.params.name) */
                    }}
                  >
                    Edit Question <AiFillEdit />
                  </a>
                  <a
                    href={`/Questions`}
                    className="btn btn-danger"
                    onClick={() => {
                      deleteQuiz(item._id, selected);
                    }}
                  >
                    Delete Question <HiUserRemove />
                  </a>
                </CCardBody>
              </CCollapse>
            );
          },
        }}
      />
    </div>
  );
};
=======
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
>>>>>>> 8376f27f879eba2e4c75e57688692464a3e1837a

export default Questions;
