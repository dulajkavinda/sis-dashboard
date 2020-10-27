import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Jumbotron,
} from "reactstrap";
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
  ListGroup,
  ListGroupItem,
  ButtonToggle,
  Badge,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

function CandidateList(props) {
  const { id, job } = props.location.state;
  const [candidates, setCandidates] = useState([]);
  const [jobs, setJob] = useState({ job_desc: "" });

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleClick = () => {
    toggle();
  };

  const analyzeAll = () => {
    console.log("hey");
    candidates.map((candidate) => {
      let Id = candidate.Id;
      let age = candidate.age;
      let gender = candidate.gender;
      let openness = candidate.openness;
      let neuroticism = candidate.neuroticism;
      let conscientiousnes = candidate.conscientiousness;
      let agreeableness = candidate.agreeableness;
      let extraversion = candidate.extraversion;
      let cv_data = candidate.cv_text;

      console.log(age);
      console.log(gender);
      console.log(openness);
      console.log(neuroticism);
      console.log(conscientiousnes);
      console.log(agreeableness);
      console.log(extraversion);
      axios
        .post("https://personality0023.herokuapp.com/predict", {
          age: age,
          gender: gender,
          openness: openness,
          neuroticism: neuroticism,
          conscientiousness: conscientiousnes,
          agreeableness: agreeableness,
          extraversion: extraversion,
        })
        .then(
          (response) => {
            console.log(response);
            let per = response.data.Prediction;
            updatePrediction(Id, per);
            checkSimilarity(cv_data, Id);
            toggle();
          },
          (error) => {
            console.log(error);
          }
        );
    });
  };

  const updatePrediction = (Id, per) => {
    axios
      .post("https://personality0023.herokuapp.com/updatePrediction", {
        Id: Id,
        per: per,
      })
      .then(
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
  };

  const updateScore = (Id, score) => {
    axios
      .post("https://personality0023.herokuapp.com/updateScore", {
        Id: Id,
        score: score,
      })
      .then(
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    axios
      .post("https://personality0023.herokuapp.com/findCandidates", {
        Id: id,
      })
      .then(
        (response) => {
          console.log(response.data);
          setCandidates(response.data);
          getJob();
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  const getJob = () => {
    axios
      .post("https://personality0023.herokuapp.com/candidateCount", {
        Id: id,
      })
      .then(
        (response) => {
          console.log(response.data[0].job_desc);
          setJob(response.data[0].job_desc);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const checkSimilarity = (cv_data, Id) => {
    axios
      .post("https://personality0023.herokuapp.com/getSimilarity", {
        ftext: jobs,
        stext: cv_data,
      })
      .then(
        (response) => {
          let score = response.data;
          updateScore(Id, score);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div>
      <div>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Analize Complete</ModalHeader>
          <ModalBody>Successfully analized all candidates.</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={handleClick}>
              OK
            </Button>
          </ModalFooter>
        </Modal>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/dashboard">Dashboard</NavbarBrand>
          <Collapse isOpen={true} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/dashboard/">Candiates</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/addjob">Add Jobs</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">
                  Support
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron style={{ height: 150 }}>
          <p style={{ textAlign: "center" }} className="lead">
            {job} #{id}
          </p>
        </Jumbotron>

        <div className="container" style={{ width: "60%", top: "300px" }}>
          <div>
            <Breadcrumb tag="nav" listTag="div">
              <BreadcrumbItem tag="a" href="/dashboard">
                Dashboard
              </BreadcrumbItem>
              <BreadcrumbItem active tag="span">
                Candidate List
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div>
            <ButtonToggle onClick={analyzeAll} color="primary">
              Analyze All
            </ButtonToggle>{" "}
            <ButtonToggle color="success">Rank</ButtonToggle>{" "}
            <ButtonToggle color="warning">Refresh</ButtonToggle>{" "}
          </div>
          <div
            style={{
              height: 50,
              width: 300,
              display: "flex",
              justifyContent: "flex-end",
            }}
          ></div>
          <ListGroup>
            {candidates.map((candidate) => (
              <ListGroupItem
                tag="button"
                action
                key={candidate.applicants_name}
                style={{
                  fontSize: 18,
                  fontWeight: "bolder",
                  marginBottom: 10,
                }}
              >
                <Row>
                  <Col> {candidate.applicants_name} </Col>
                  <Col>
                    <span style={{ color: "tomato" }}>
                      Age : {candidate.age}
                    </span>
                  </Col>
                  <Col>
                    <span style={{ color: "teal" }}>
                      {candidate.gender == 1 ? "M" : "F"}
                    </span>
                  </Col>
                  <Col sm={{ size: "auto", offset: 1 }}>
                    <Button outline color="primary" size="sm">
                      <Link
                        style={{ textDecoration: "none", color: "" }}
                        to={{
                          pathname: "/candidatedetails",
                          state: { id: candidate.Id },
                        }}
                      >
                        Details
                      </Link>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
