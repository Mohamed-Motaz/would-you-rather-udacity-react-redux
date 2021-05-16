import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";
import { Paper } from "@material-ui/core";

class AnswerQuestion extends Component {
  state = {
    alreadyAnswered: false,
  };
  handleUserAnswerQuestion = (option) => {
    const { dispatch, authedUser, id } = this.props;
    dispatch(handleAnswerQuestion(authedUser, id, option));
  };
  componentDidMount() {
    const { chosenAnswer } = this.props;
    if (!chosenAnswer) return;
    this.setState({ chosenAnswer, alreadyAnswered: true });
  }
  render() {
    const { questions, users, id, chosenAnswer } = this.props;
    const question = questions[id] || null;
    const user = question ? users[questions[id].author] : {};
    return (
      <>
        <Card
          style={{
            maxWidth: 300,
            margin: "auto",
            transition: "0.3s",
            boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            "&:hover": {
              boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            },
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {user.name}
              </Typography>
              <CardMedia
                component="img"
                alt="Contemplative Reptile"
                height="140"
                image={user.avatarURL}
                title="Contemplative Reptile"
              />
              <Typography gutterBottom variant="h5" component="h2">
                Would You Rather
              </Typography>
              <CardActions style={{ justifyContent: "center" }}>
                {this.state.alreadyAnswered ? (
                  <Typography gutterBottom variant="h5" component="h2">
                    {question.optionOne.text} :{" "}
                    {
                      <Paper
                        style={{
                          padding: 8,
                          backgroundColor: "purple",
                          border: "1px solid black",
                          color: "white",
                        }}
                        variant="outlined"
                        elevation={12}
                        square={false}
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {question["optionOne"].votes.length}
                        </Typography>
                      </Paper>
                    }
                  </Typography>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => this.handleUserAnswerQuestion("optionOne")}
                  >
                    {question.optionOne.text}
                  </Button>
                )}
              </CardActions>
              <Typography gutterBottom variant="h5" component="h2">
                OR
              </Typography>
              <br />
              <CardActions style={{ justifyContent: "center" }}>
                {/* <Link to={`/questions/${question.id}`}> */}
                {this.state.alreadyAnswered ? (
                  <>
                    <Typography gutterBottom variant="h5" component="h2">
                      {question.optionTwo.text} :
                      {
                        <Paper
                          style={{
                            padding: 8,
                            backgroundColor: "purple",
                            border: "1px solid black",
                            color: "white",
                          }}
                          variant="outlined"
                          elevation={12}
                          square={false}
                        >
                          <Typography gutterBottom variant="h5" component="h2">
                            {question["optionTwo"].votes.length}
                          </Typography>
                        </Paper>
                      }
                    </Typography>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    size="large"
                    color="secondary"
                    onClick={() => this.handleUserAnswerQuestion("optionTwo")}
                  >
                    {question.optionTwo.text}
                  </Button>
                )}
                {/* </Link> */}
              </CardActions>
              {this.state.alreadyAnswered && (
                <Paper
                  style={{
                    padding: 8,
                    backgroundColor: "purple",
                    border: "1px solid black",
                    color: "white",
                  }}
                  variant="outlined"
                  elevation={12}
                  square={false}
                >
                  <Typography gutterBottom variant="h5" component="h2">
                    Selected Choice: {question[chosenAnswer].text}
                  </Typography>
                </Paper>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    users,
    questions,
    authedUser,
  };
}

export default connect(mapStateToProps)(AnswerQuestion);
