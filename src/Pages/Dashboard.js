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
  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand href="/">Reccomendation System</NavbarBrand>
          <Collapse navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Personality Prediction</NavLink>
              </NavItem>
              <NavItem></NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <Jumbotron>
          <h1 className="display-3">SMART INTERVIEW SYSTEM</h1>
          <p className="lead">
            This is a simple hero unit, a simple Jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-2" />
          <p>
            It uses utility classes for typography and spacing to space content
            out within the larger container.
          </p>
          <p className="lead">
            <Button color="primary">Learn More</Button>
          </p>
        </Jumbotron>
        <Container style={{ marginTop: 200 }}>
          <Row>
            <Col>
              {" "}
              <Card
                body
                inverse
                style={{ height: 200 }}
                style={{ backgroundColor: "#333", borderColor: "#333" }}
              >
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button color="success">Open</Button>
              </Card>
            </Col>
            <Col>
              {" "}
              <Card body inverse color="primary" style={{ height: 200 }}>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button color="success">Open</Button>
              </Card>
            </Col>
            <Col>
              {" "}
              <Card body inverse color="warning" style={{ height: 200 }}>
                <CardTitle>Special Title Treatment</CardTitle>
                <CardText>
                  With supporting text below as a natural lead-in to additional
                  content.
                </CardText>
                <Button color="success">Open</Button>
              </Card>
            </Col>
            <Col>
              {" "}
              <Card body inverse color="info" style={{ height: 200 }}>
                <CardTitle style={{ fontWeight: "bold" }}>
                  Personality Trait Prediction
                </CardTitle>
                <CardText>
                  - Personality Trait Prediction <br /> - CV Ranking <br /> - CV
                  Data Extraction
                </CardText>
                <Button color="success">Open</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
