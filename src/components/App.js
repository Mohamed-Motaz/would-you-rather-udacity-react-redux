import React, { Component, Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import AddQuestion from "./AddQuestion";
import AnswerQuestion from "./AnswerQuestion";
import Dashboard from "./Dashboard";
import Leaderboard from "./Leaderboard";
import LogIn from "./Login";
import NavBar from "./NavBar";
import Login from "./Login";
import Question from "./Question";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return (
      <div>
        {authedUser ? (
          <BrowserRouter>
            <div className="container">
              <NavBar user={authedUser} />
              <Route path="/" exact component={Dashboard} />
              <Route path="/questions/:id" exact component={AnswerQuestion} />
              <Route path="/new" exact component={AddQuestion} />
              <Route path="/leaderboard" exact component={Leaderboard} />
              <Route path="/login" exact component={Login} />
            </div>
          </BrowserRouter>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapStateToProps)(App);
