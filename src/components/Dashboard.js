import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import "../styles/oldProjectStyles.css";

class Dashboard extends Component {
  getQuestions = (authedUser, questions, users) => {
    let answeredQuestions = {},
      unAnsweredQuestions = {};
    if (!authedUser || !users[authedUser] || !users[authedUser].answers)
      return {
        answeredQuestions,
        unAnsweredQuestions,
      };
    let allAnswers = Object.keys(users[authedUser].answers) || [];
    answeredQuestions = Object.values(questions)
      .filter((question) => allAnswers.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    unAnsweredQuestions = Object.values(questions)
      .filter((question) => !allAnswers.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    return {
      answeredQuestions,
      unAnsweredQuestions,
    };
  };

  render() {
    const { authedUser, questionIds, questions, users } = this.props;
    const { answeredQuestions, unAnsweredQuestions } = this.getQuestions(
      authedUser,
      questions,
      users
    );
    console.log(answeredQuestions, unAnsweredQuestions);

    return (
      <div style={{ alignItems: "center", margin: "auto" }}>
        <ul className="dashboard-list">
          {questionIds.map((id) => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard);
