import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const styles = (muiBaseTheme) => ({
  card: {
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  media: {
    paddingTop: "56.25%",
  },
  content: {
    textAlign: "left",
    padding: muiBaseTheme.spacing(3),
  },
  divider: {
    margin: `${muiBaseTheme.spacing(3)}px 0`,
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  avatar: {
    display: "inline-block",
    border: "2px solid white",
    "&:not(:first-of-type)": {
      marginLeft: -muiBaseTheme.spacing(),
    },
  },
  root: {
    maxWidth: 345,
  },
});

function Question(props) {
  const { classes, questions, users, id } = props;
  console.log(questions, id);
  const question = questions[id];
  const user = users[questions[id].author];
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.name + " Wonders"}
          </Typography>{" "}
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image={user.avatarURL}
            title="Contemplative Reptile"
          />
          <Typography
            align="center"
            variant="subtitle1"
            color="textPrimary"
            className={classes.question}
          >
            {question.optionOne.text}{" "}
          </Typography>
          <br />
          <Typography
            align="center"
            variant="subtitle1"
            color="textPrimary"
            className={classes.question}
          >
            OR
          </Typography>
          <br />
          <Typography
            align="center"
            variant="subtitle1"
            color="textPrimary"
            className={classes.question}
          >
            {question.optionTwo.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "center" }}>
        {/* <Link to={`/questions/${question.id}`}> */}
        <Button variant="contained" size="large" color="primary">
          Choose!
        </Button>
        {/* </Link> */}
      </CardActions>
    </Card>
  );
}

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Question));
