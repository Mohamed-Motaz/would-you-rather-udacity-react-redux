import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import "../styles/oldProjectStyles.css";
import AnswerQuestion from "./AnswerQuestion";

class Dashboard extends Component {
  state = {
    unAnsweredQuestionsChosen: true,
  };

  getQuestions = (authedUser, questions, users) => {
    let answeredQuestions = {},
      unAnsweredQuestions = {};
    if (!authedUser || !users[authedUser] || !users[authedUser].answers)
      return {
        answeredQuestions,
        unAnsweredQuestions,
      };
    let allAnswers = Object.keys(users[authedUser].answers) || [];
    console.log(users[authedUser]);
    answeredQuestions = Object.values(questions)
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter((question) => allAnswers.includes(question.id));
    unAnsweredQuestions = Object.values(questions)
      .sort((a, b) => b.timestamp - a.timestamp)
      .filter((question) => !allAnswers.includes(question.id));
    console.log(answeredQuestions, unAnsweredQuestions);
    return {
      answeredQuestions,
      unAnsweredQuestions,
    };
  };

  handleChangeQuestionsViewed(e, value) {
    this.setState({ unAnsweredQuestionsChosen: value });
  }

  render() {
    const { authedUser, questions, users } = this.props;
    const { answeredQuestions, unAnsweredQuestions } = this.getQuestions(
      authedUser,
      questions,
      users
    );
    let questionsToDisplay =
      (this.state.unAnsweredQuestionsChosen
        ? unAnsweredQuestions
        : answeredQuestions) || [];
    console.log(
      questions,
      answeredQuestions,
      unAnsweredQuestions,
      questionsToDisplay
    );

    return (
      <div style={{ alignItems: "center", margin: "auto" }}>
        <div>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            style={{
              flexGrow: 1,
              marginBottom: "-3em",
              marginTop: "1em",
              gap: "10em",
            }}
          >
            <Box textAlign="center" m={10}>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
                onClick={(e) => this.handleChangeQuestionsViewed(e, true)}
              >
                UnAnswered Questions
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: 10 }}
                onClick={(e) => this.handleChangeQuestionsViewed(e, false)}
              >
                Answered Questions
              </Button>
            </Box>
          </Grid>
        </div>

        <ul className="dashboard-list">
          {Object.keys(questionsToDisplay).map((element) => (
            <li key={questionsToDisplay[element].id}>
              <Question id={questionsToDisplay[element].id} />
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
    questions,
    users,
  };
}

export default connect(mapStateToProps)(Dashboard);
