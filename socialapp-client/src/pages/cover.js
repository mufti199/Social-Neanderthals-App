import React from "react";
import { Link } from "react-router-dom";
import CoverPicture from "../images/cover-page.jpg";

// MUI
import { makeStyles } from "@material-ui/core/styles/";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

// Styles
const useStyles = makeStyles((customTheme) => ({
  paper: customTheme.paper,
  buttons: customTheme.buttons,
  coverPicture: {
    width: "75%",
  },
}));

const Cover = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justify="space-around"
      alignItems="center"
    >
      <img
        src={CoverPicture}
        alt="CoverPage"
        className={classes.coverPicture}
      />

      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          Welcome.
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    </Grid>
  );
};

export default Cover;
