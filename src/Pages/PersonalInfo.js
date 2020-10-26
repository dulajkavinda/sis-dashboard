import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useHistory } from "react-router-dom";
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
  Row,
  Col,
} from "reactstrap";
import { Jumbotron } from "reactstrap";
import { Progress } from "reactstrap";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}°C`;
}

function PersonalInfo(props) {
  const [openness, setOpenness] = React.useState("5");
  const [neuroticism, setNeuroticism] = React.useState("5");
  const [conscientiousness, setConscientiousness] = React.useState("5");
  const [agreeableness, setAggreeableness] = React.useState("5");
  const [extraversion, setExtraversion] = React.useState("5");

  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  const onChangeHandlerOpenness = (event, newValue) => {
    setOpenness(newValue);
    console.log(openness);
  };

  const onChangeHandlerNeuroticism = (event, newValue) => {
    setNeuroticism(newValue);
    console.log(neuroticism);
  };

  const onChangeHandlerConscientiousness = (event, newValue) => {
    setConscientiousness(newValue);
    console.log(conscientiousness);
  };

  const onChangeHandlerAggreeableness = (event, newValue) => {
    setAggreeableness(newValue);
    console.log(agreeableness);
  };

  const onChangeHandlerExtraversion = (event, newValue) => {
    setExtraversion(newValue);
    console.log(extraversion);
  };

  const updateCandidateCount = (Id) => {
    axios
      .post("https://personality0023.herokuapp.com/updateCandidateCount", {
        Id: Id,
      })
      .then(
        (response) => {},
        (error) => {
          console.log(error);
        }
      );
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    let sex = gender == "Male" ? 1 : 0;
    let id_ = uuidv4();
    axios
      .post("https://personality0023.herokuapp.com/addcandidate", {
        vehicancy_id: id,
        Id: id_,
        job: job,
        applicants_name: applicants_name,
        age: age,
        bio: bio,
        email: email,
        cv_text: "Software Endineer 2 Years Java C++ ReactJs Python",
        gender: sex,
        openness: openness,
        neuroticism: neuroticism,
        conscientiousness: conscientiousness,
        agreeableness: agreeableness,
        extraversion: extraversion,
        per: "not analyzed",
        cv_name: filename,
      })
      .then(
        (response) => {
          console.log(response.data);
          updateCandidateCount(id);
          toggle();
        },
        (error) => {
          console.log(error);
        }
      );
  };
  const {
    id,
    job,
    applicants_name,
    age,
    email,
    gender,
    cv_text,
    bio,
    filename,
  } = props.location.state;

  const classes = useStyles();

  return (
    <div className="container" style={{ width: "60%", top: "300px" }}>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Response Recieved!</ModalHeader>
        <ModalBody>
          We successfully recieved your response. Thank You!
        </ModalBody>
        <ModalFooter>
          <Button color="success" onClick={handleClick}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
      <div style={{ marginTop: 20 }}>
        <Jumbotron style={{ backgroundColor: "gray", color: "ghostwhite" }}>
          <p
            style={{ textAlign: "center", fontWeight: "bold", fontSize: 22 }}
            className="lead"
          >
            {job} #{id}
          </p>
          <p style={{ textAlign: "center" }} className="lead">
            Personal Information (2/2)
          </p>
        </Jumbotron>
      </div>
      <div style={{ height: 10, width: 300 }}></div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            {" "}
            <FormGroup>
              <Label
                for="exampleEmail"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                Enjoy New Experience and Things (Openness)
              </Label>
              <div className={classes.root} style={{ width: 300 }}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  marks
                  min={1}
                  onChange={onChangeHandlerOpenness}
                  max={10}
                  color="danger"
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={{ size: "auto", offset: 1 }}>
            {" "}
            <Button outline color="danger">
              {openness}
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <FormGroup>
              <Label
                for="exampleEmail"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                How Often You Feel Negativity (Neuroticism)
              </Label>
              <div className={classes.root}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={1}
                  onChange={onChangeHandlerNeuroticism}
                  marks
                  min={1}
                  max={10}
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={{ size: "auto", offset: 1 }}>
            {" "}
            <Button outline color="danger">
              {neuroticism}
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label
                for="exampleEmail"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                Wishing to do one’s work thoroughly (Conscientiousness)
              </Label>
              <div className={classes.root}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  onChange={onChangeHandlerConscientiousness}
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={{ size: "auto", offset: 1 }}>
            {" "}
            <Button outline color="danger">
              {conscientiousness}
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col>
            {" "}
            <FormGroup>
              <Label
                for="exampleEmail"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                How much would you like ti work with you’r peers
                (Aggreeableness)
              </Label>
              <div className={classes.root}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  onChange={onChangeHandlerAggreeableness}
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={{ size: "auto", offset: 1 }}>
            <Button outline color="danger">
              {agreeableness}
            </Button>{" "}
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label
                for="exampleEmail"
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                How outgoing and social interactions you like (Extraversion)
              </Label>
              <div className={classes.root}>
                <Slider
                  defaultValue={5}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  onChange={onChangeHandlerExtraversion}
                  step={1}
                  marks
                  min={1}
                  max={10}
                />
              </div>
            </FormGroup>
          </Col>
          <Col sm={{ size: "auto", offset: 1 }}>
            {" "}
            <Button outline color="danger">
              {extraversion}
            </Button>{" "}
          </Col>
        </Row>

        <Button color="success" type="submit">
          Submit
        </Button>
      </Form>
      <div>
        <div className="text-center">100%</div>
        <Progress value={100} />
      </div>
    </div>
  );
}

export default PersonalInfo;
