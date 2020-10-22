import React, { Component } from "react";
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
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardTitle,
  CardText,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Jumbotron,
} from "reactstrap";
export default class Dashboard extends Component {
  componentDidMount() {
    document.body.style.background = "#d6d6d6";
  }

  render() {
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            marginTop: "200px",
          }}
        >
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <h1
              className="display-3"
              style={{
                fontWeight: "bold",
                color: "ghostwhite",
                fontStyle: "initial",
              }}
            >
              <span style={{ color: "yellowgreen" }}>S</span>MART{" "}
              <span style={{ color: "yellowgreen" }}>I</span>NTERVIEW{" "}
              <span style={{ color: "yellowgreen" }}>S</span>YSTEM
            </h1>
            <span className="lead" style={{ color: "", fontWeight: "bold" }}>
              SIS is one such software/tool which can automate the traditional
              interviewing process using modern<br></br> natural language
              processing techniques and deep learning applications.
            </span>
            <hr className="my-2" />
            <p></p>
            <p className="lead">
              <Button color="primary">Learn More</Button>
            </p>
          </div>
        </div>
        <Container style={{ marginTop: 200 }}></Container>
      </div>
    );
  }
}
