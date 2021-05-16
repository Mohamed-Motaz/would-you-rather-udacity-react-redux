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
  getOptionChosenForAnsweredQuestion = (question, authedUser) => {
    console.log(question);
    let option = "";
    question.optionOne.votes.forEach((element) => {
      if (element === authedUser) option = "optionOne";
    });
    question.optionTwo.votes.forEach((element) => {
      if (element === authedUser) option = "optionTwo";
    });
    return option;
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
            <Box textAlign="center">
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 100 }}
                onClick={(e) => this.handleChangeQuestionsViewed(e, true)}
              >
                UnAnswered Questions
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={{ margin: 100 }}
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
              <AnswerQuestion
                id={questionsToDisplay[element].id}
                chosenAnswer={this.getOptionChosenForAnsweredQuestion(
                  questionsToDisplay[element],
                  authedUser
                )}
              />
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
