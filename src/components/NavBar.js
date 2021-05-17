import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeAuthedUser, REMOVE_AUTHED_USER } from "../actions/authedUser";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const { user, dispatch } = props;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Box m={2}>
            <Typography variant="contained" size="large" color="default">
              {"Hi " + user}
            </Typography>
          </Box>
          <Box m={2}>
            <NavLink className="nav-link nav-item" to="/">
              <Button variant="contained" size="large" color="default">
                Home
              </Button>
            </NavLink>
          </Box>
          <Box m={2}>
            <NavLink className="nav-link nav-item" to="/new">
              <Button variant="contained" size="large" color="default">
                Create Question
              </Button>
            </NavLink>
          </Box>
          <Box m={2}>
            <NavLink className="nav-link nav-item" to="/leaderboard">
              <Button variant="contained" size="large" color="default">
                Leaderboard
              </Button>
            </NavLink>
          </Box>
          <Box m={2}>
            <NavLink className="nav-link nav-item" to="/">
              <Button
                variant="contained"
                size="large"
                color="default"
                onClick={() => dispatch(removeAuthedUser())}
              >
                Log Out
              </Button>
            </NavLink>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default connect()(NavBar);
