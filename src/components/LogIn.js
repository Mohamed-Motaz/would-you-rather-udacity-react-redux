import React, { useState } from "react";
import ReactDOM from "react-dom";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";

import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import { MenuItem, TextField, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { Redirect } from "react-router";

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
});

function Login(props) {
  console.log(props);
  const { classes, users, dispatch } = props;
  const [user, setUser] = useState("");
  console.log(users);

  const handleChange = (e) => {
    e.preventDefault();
    setUser(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!user) alert("Please choose a user before logging in");
    dispatch(setAuthedUser(user));
    return <Redirect to="/" />;
  };

  return (
    <div className="App">
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={
            "https://parade.com/wp-content/uploads/2019/12/Would-You-Rather_Questions-680x430.jpg"
          }
        />
        <CardContent className={classes.content}>
          <Typography
            className={"MuiTypography--heading"}
            variant="h6"
            gutterBottom
            align="center"
          >
            Would YOU Rather?
          </Typography>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
            align="center"
          >
            Would you rather is a simple game, but to play, you first have to
            sign in!
          </Typography>
          <Divider className={classes.divider} light />
          <div>
            <span>Our Current Users</span>
          </div>
          {Object.keys(users).map((user) => (
            <Avatar
              className={classes.avatar}
              key={users[user].id}
              src={users[user].avatarURL}
            />
          ))}

          <CardActions style={{ justifyContent: "center" }}>
            <div>
              <TextField
                select
                label="Select A User"
                value={user}
                onChange={handleChange}
                helperText="Select A User To Start The Game!"
              >
                {Object.keys(users).map((user) => (
                  <MenuItem key={users[user].id} value={users[user].id}>
                    {users[user].name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <Button onClick={handleLogin} variant="contained" color="primary">
              Login
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(withStyles(styles)(Login));
