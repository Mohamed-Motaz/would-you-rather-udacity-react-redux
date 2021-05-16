import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import AddQuestion from "./AddQuestion";
import AnswerQuestion from "./AnswerQuestion";
import Dashboard from "./Dashboard";
import LogIn from "./Login";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="container">
        <AddQuestion />
        <LogIn></LogIn>

        <Dashboard />
      </div>
    );
  }
}

export default connect()(App);
