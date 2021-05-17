import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { connect } from "react-redux";

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

function LeaderBoardAvatar(props) {
  const { user, classes } = props;
  return (
    <>
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {user.name}
            </Typography>{" "}
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              height="140"
              image={user.avatarURL}
              title="Contemplative Reptile"
            />
            <br />
            <Typography
              align="center"
              variant="subtitle1"
              color="textPrimary"
              className={classes.question}
            >
              {"Total Score: " +
                (Object.keys(user.answers).length +
                  Object.keys(user.questions).length)}
            </Typography>
            <br />
            <Typography
              align="center"
              variant="subtitle1"
              color="textPrimary"
              className={classes.question}
            >
              {"Questions Answered: " + Object.keys(user.answers).length}
            </Typography>
            <br />
            <Typography
              align="center"
              variant="subtitle1"
              color="textPrimary"
              className={classes.question}
            >
              {"Questions Created: " + Object.keys(user.questions).length}
            </Typography>
            <br />
          </CardContent>
        </CardActionArea>
      </Card>
      <br />
      <br />
      <br />
    </>
  );
}

function mapStateToProps({ users, questions }) {
  return {
    users,
    questions,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(LeaderBoardAvatar));
