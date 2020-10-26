import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  CardHeader,
  CardFooter,
  CardBody,
  Badge,
} from "reactstrap";
import { useHistory } from "react-router-dom";
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
  Jumbotron,
  ListGroupItem,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";

import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

function CandidateDetails(props) {
  const { id } = props.location.state;
  const [candidates, setCandidates] = useState({});
  const [job, setJob] = useState({});
  const [activeIndex, setActiveIndex] = useState({ activeIndex: 0 });

  const data = [
    { name: "Openness", value: parseInt(candidates.openness) },
    { name: "Neuroticism", value: parseInt(candidates.neuroticism) },
    {
      name: "Conscientiousness",
      value: parseInt(candidates.conscientiousness),
    },
    { name: "Agreeableness", value: parseInt(candidates.agreeableness) },
    { name: "Extraversion", value: parseInt(candidates.extraversion) },
  ];

  const history = useHistory();
  const handleClick = () => {
    console.log("hello");
    history.push("/" + candidates.cv_name);
  };

  const dataRadar = [
    {
      subject: "Openness",
      A: parseInt(candidates.openness),
      B: parseInt(candidates.openness),
      fullMark: 10,
    },
    {
      subject: "Neuroticism",
      A: parseInt(candidates.neuroticism),
      B: parseInt(candidates.neuroticism),
      fullMark: 10,
    },
    {
      subject: "Conscientiousness",
      A: parseInt(candidates.conscientiousness),
      B: parseInt(candidates.conscientiousness),
      fullMark: 10,
    },
    {
      subject: "Agreeableness",
      A: parseInt(candidates.agreeableness),
      B: parseInt(candidates.agreeableness),
      fullMark: 10,
    },
    {
      subject: "Extraversion",
      A: parseInt(candidates.extraversion),
      B: parseInt(candidates.extraversion),
      fullMark: 10,
    },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`Points ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const onPieEnter = (data, index) => {
    setActiveIndex(index);
  };

  const jsfiddleUrl = "https://jsfiddle.net/alidingling/c9pL8k61/";
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "gray", "#FF2042"];
  useEffect(() => {
    axios
      .post("https://personality0023.herokuapp.com/getcandidate", {
        Id: id,
      })
      .then(
        (response) => {
          setCandidates(response.data[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  let x = parseFloat(candidates.score);
  let score_ = x.toFixed(2);
  let score = score_ * 100;
  return (
    <div>
      <div>
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
            Applicant ID: #{id} | Name : {candidates.applicants_name}
          </p>
        </Jumbotron>
      </div>
      <Container>
        <div>
          <Breadcrumb tag="nav" listTag="div">
            <BreadcrumbItem tag="a" href="/dashboard">
              Dashboard
            </BreadcrumbItem>
            <BreadcrumbItem tag="a" href="/candidatelist">
              Candidate List
            </BreadcrumbItem>
            <BreadcrumbItem active tag="span">
              {candidates.applicants_name}
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
        <Row>
          <Col xs="6">
            <ListGroup>
              <ListGroupItem>Applicants ID : {candidates.Id}</ListGroupItem>
              <ListGroupItem>
                Applicants Name : {candidates.applicants_name}
              </ListGroupItem>
              <ListGroupItem>Job Role : {candidates.job}</ListGroupItem>
              <ListGroupItem>Age : {candidates.age}</ListGroupItem>
              <ListGroupItem>
                Gender : {candidates.gender == 1 ? "Male" : "Female"}
              </ListGroupItem>
              <ListGroupItem>
                Predicted Personality :{" "}
                <span style={{ fontSize: 25 }}>
                  <Badge color="info">{candidates.per}</Badge>
                </span>
              </ListGroupItem>
            </ListGroup>
          </Col>

          <Col xs="6">
            <Card style={{ marginBottom: 10 }}>
              <CardHeader>CV Ranking</CardHeader>
              <CardBody>
                <CardTitle>
                  Similarity Score :
                  <span style={{ fontWeight: "bold" }}> {score}/ 100</span>
                </CardTitle>
                <CardText></CardText>
              </CardBody>
              <CardFooter>Job ID : {candidates.vehicancy_id}</CardFooter>
            </Card>
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardTitle>
                CV Uploaded Successsfully :{" "}
                <Badge color="primary" pill>
                  Yes
                </Badge>
              </CardTitle>
              <CardText></CardText>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://personality0023.herokuapp.com//file/" +
                    candidates.cv_name;
                }}
              >
                View CV
              </Button>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="6" style={{ top: 80 }}>
            <ListGroup>
              <ListGroupItem color="success">Neuroticism</ListGroupItem>
              <ListGroupItem color="primary">Openness</ListGroupItem>
              <ListGroupItem color="warning">Conscientiousness</ListGroupItem>
              <ListGroupItem color="danger">Agreeableness</ListGroupItem>
              <ListGroupItem color="secondary">Extraversion</ListGroupItem>
            </ListGroup>
          </Col>
          <Col xs="6">
            <PieChart width={480} height={480}>
              <Pie
                data={data}
                cx={250}
                cy={190}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </Col>
        </Row>
        <Navbar color="light" light expand="md" style={{ marginTop: -40 }}>
          <NavbarBrand href="/">Radar Chart bases on BIG5 Model</NavbarBrand>
          <NavbarToggler />
          <Collapse navbar></Collapse>
        </Navbar>
        <Row style={{ marginTop: 100 }}>
          <Col xs="6">
            <RadarChart
              cx={250}
              cy={200}
              outerRadius={150}
              width={500}
              height={500}
              data={dataRadar}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis />
              <Radar
                name="Mike"
                dataKey="A"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </Col>
          <Col xs="6">
            <PieChart width={700} height={600}>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx={250}
                cy={170}
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                onMouseEnter={onPieEnter}
              />
            </PieChart>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CandidateDetails;
