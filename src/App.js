import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import NavigationBar from "./Pages/extra/Navbar"
import Dashboard from "./Pages/Dashboard";

import ExamView from './Pages/written.exam.view';
import ResultDashboard from './Pages/written.result.dashboard';
import WrittenExam from './Pages/written.exam.list';
import AddQuestion from './Pages/written.add.question';
import Done from './Pages/written.done';

import Home from "./Pages/Home";
import About from "./Pages/About";
import Questions from "./Pages/Questions";
import PersonalInfo from "./Pages/PersonalInfo";
import AddJob from "./Pages/AddJob";
import CandidateList from "./Pages/CandidateList";

import SortedList from "./Pages/expertise.sorted.list";

import './App.css';

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
        <Route path="/written-test/exam/:candidate/:interviewId" component={ExamView}></Route>
        <Route path="/written-test/add-question" component={AddQuestion}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/questions" component={Questions}></Route>
        <Route path="/personal" component={PersonalInfo}></Route>
        <Route path="/addjob" component={AddJob}></Route>
        <Route path="/candidatelist" component={CandidateList}></Route>
        <Route path="/candidatedetails" component={CandidateDetails}></Route>
        </Router>
    </div>
  );
}

export default App;
