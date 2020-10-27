import React from "react";
import { NavbarBrand, Collapse, Nav, NavItem, NavLink, Navbar } from 'reactstrap';

const NavigationBar = () => {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">SIS System</NavbarBrand>
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink
                href="https://voice-front.herokuapp.com/"
                target="_blank"
              >
                Oral Interview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/expert-areas"
                target="_blank"
              >
                Expertise
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="/written-test"
                target="_blank"
              >
                Technical Interview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="https://client-app0023.herokuapp.com"
                target="_blank"
              >
                Personality Prediction
              </NavLink>
            </NavItem>
            <NavItem></NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
