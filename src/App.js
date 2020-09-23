import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <Router>
      <Route path="/" exact component={Dashboard}></Route>
    </Router>
  );
}

export default App;
