import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import AlertTemplate from "react-alert-template-basic";
import { positions, Provider } from "react-alert";

import NavigationBar from "./Pages/extra/Navbar";
import Dashboard from "./Pages/Dashboard";

import ExamView from "./Pages/written.exam.view";
import ResultDashboard from "./Pages/written.result.dashboard";
import WrittenExam from "./Pages/written.exam.list";
import AddQuestion from "./Pages/written.add.question";
import Done from "./Pages/written.done";

import Home from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import About from "./Pages/About";
import Questions from "./Pages/Questions";
import PersonalInfo from "./Pages/PersonalInfo";
import AddJob from "./Pages/AddJob";
import CandidateList from "./Pages/CandidateList";
import CandiateList from "./Pages/CandiateList";
import CandidateDetails from "./Pages/CandidateDetails";
import InterviewList from "./Pages/InterviewList";
import ArchiveList from "./Pages/Archives";
import ArchiveCandidate from "./Pages/ArchiveCandidate";
import QuizList from "./Pages/QuizList";

import SortedList from "./Pages/expertise.sorted.list";

import "./App.css";

const options = {
  timeout: 2000,
  position: positions.BOTTOM_CENTER,
  transition: "scale",
};

function App() {
  return (
    <div>
      <NavigationBar />
      <Router>
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/expert-areas" component={SortedList}></Route>
        <Route path="/written-test" exact component={ResultDashboard}></Route>
        <Route path="/written-test/completed" component={Done}></Route>
        <Route path="/written-test/exam-list" component={WrittenExam}></Route>
        <Route
          path="/written-test/exam/:candidate/:interviewId"
          component={ExamView}
        ></Route>
        <Route
          path="/written-test/add-question"
          component={AddQuestion}
        ></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/dashboard" component={Dashboard}></Route>
        <Route path="/questions" component={Questions}></Route>
        <Route path="/personal" component={PersonalInfo}></Route>
        <Route path="/addjob" component={AddJob}></Route>
        <Route path="/candidatelist" component={CandidateList}></Route>
        <Route path="/candidatedetails" component={CandidateDetails}></Route>
        <Route path="/allInterviews" exact component={InterviewList} />
        <Route path="/interview" component={CandiateList} />
        <Route path="/candiates/:name" component={CandiateList} />
        <Route path="/archives" component={ArchiveList} />
        <Route path="/candidatearchives/:name" component={ArchiveCandidate} />
        <Route path="/Questions" component={Questions} />
        <Provider template={AlertTemplate} {...options}>
          <Route path="/quiz/:id/:candidateid" component={QuizList} />
        </Provider>
      </Router>
    </div>
  );
}

export default App;
