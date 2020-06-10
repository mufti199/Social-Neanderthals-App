import React, { useState } from "react";
import AppIcon from "../images/social-neanderthal.jpg";
import { Link } from "react-router-dom/";

// MUI
import { makeStyles } from "@material-ui/core/styles/";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { signupUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

// Using the application theme
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
}));

function Signup() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  // Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    dispatch(signupUser(newUserData));
  };

  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
    if (event.target.name === "confirmPassword") {
      setConfirmPassword(event.target.value);
    }
    if (event.target.name === "handle") {
      setHandle(event.target.value);
    }
  };

  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} className={classes.image} alt="Application Icon" />
        <Typography variant="h3" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors.email}
            error={errors.email ? true : false}
            value={email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={password}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Username"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleChange}
            fullWidth
          />

          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
          >
            Signup
            {loading && <CircularProgress className={classes.progress} />}
          </Button>
          <br />

          <small>
            Already have an account? Login <Link to="/login">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Signup;
