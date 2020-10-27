import React from "react";
import "./App.css";
import Navbar from "./Partials/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import InterviewList from "./Pages/InterviewList";
import CandiateList from "./Pages/CandiateList";
import QuizList from "./Pages/QuizList";
import ArchiveList from "./Pages/Archives";
import ArchiveCandidate from "./Pages/ArchiveCandidate";
import Questions from "./Pages/Questions";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "bootstrap/dist/css/bootstrap.css";
const options = {
  timeout: 2000,
  position: positions.BOTTOM_CENTER,
  transition: "scale",
};

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/allInterviews" exact component={InterviewList} />
          <Route path="/interview" component={CandiateList} />
          <Route path="/candiates/:name" component={CandiateList} />
          <Route path="/archives" component={ArchiveList} />
          <Route path="/candidatearchives/:name" component={ArchiveCandidate} />
          <Route path="/Questions" component={Questions} />
          <Provider template={AlertTemplate} {...options}>
            <Route path="/quiz/:id/:candidateid" component={QuizList} />
          </Provider>
        </Switch>
      </Router>
    </>
  );
}

export default App;
