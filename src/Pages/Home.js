import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
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
} from "reactstrap";

class Home extends React.Component {
  state = {
    jobs: [],
  };

  componentDidMount() {
    axios.get("https://personality0023.herokuapp.com/getJobs").then((res) => {
      const jobs = res.data;
      this.setState({ jobs });
    });
  }

  render() {
    return (
      <div>
        <div>
          <Navbar color="dark" dark expand="md">
            <NavbarBrand href="/">Home</NavbarBrand>
            <NavbarToggler onClick={true} />
            <Collapse isOpen={true} navbar>
              <Nav className="mr-auto" navbar>
                <NavItem>
                  <NavLink href="/dashboard">Dashboard</NavLink>
                </NavItem>
              </Nav>
              <NavbarText>John Doe, Welcome!</NavbarText>
            </Collapse>
          </Navbar>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span style={{ fontSize: 25, fontWeight: "bold" }}>
            Available Jobs
          </span>
        </div>
        <Row
          style={{
            marginTop: 30,
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
          }}
        >
          {this.state.jobs.map((item) => (
            <Col sm="6">
              <Card body style={{ margin: 20, borderColor: "#333" }}>
                <CardTitle style={{ fontWeight: "bold" }}>
                  {item.title} #{item.Id}
                </CardTitle>
                <CardSubtitle
                  style={{ fontSize: 15, fontWeight: "bold", color: "indigo" }}
                >
                  {" "}
                  - Company : {item.company}
                </CardSubtitle>
                <CardSubtitle style={{ fontSize: 15, fontWeight: "bold" }}>
                  - Experience : {item.experience} Years
                </CardSubtitle>
                <CardSubtitle style={{ fontSize: 15, fontWeight: "bold" }}>
                  - Education : {item.education}
                </CardSubtitle>{" "}
                <Button color="success" style={{ marginTop: 10 }}>
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={{
                      pathname: "/questions",
                      state: { id: item.Id, job: item.title },
                    }}
                  >
                    Apply
                  </Link>
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default Home;
