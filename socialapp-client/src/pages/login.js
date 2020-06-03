import React, { useState } from "react";
import AppIcon from "../images/social-neanderthal.jpg";
import { Link } from "react-router-dom/";

//MUI
import { makeStyles } from "@material-ui/core/styles/";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { loginUser } from "../redux/actions/userActions";
import { useSelector, useDispatch } from "react-redux";

// Using the application theme
const useStyles = makeStyles((customTheme) => ({
  ...customTheme.theme,
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.ui.loading);
  const errors = useSelector((state) => state.ui.errors);

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handlers
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData));
  };

  // Editing details
  const handleChange = (event) => {
    if (event.target.name === "email") {
      setEmail(event.target.value);
    }
    if (event.target.name === "password") {
      setPassword(event.target.value);
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} className={classes.image} alt="Application Icon" />
        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            className={classes.textField}
            helperText={errors ? errors.email : false}
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
            helperText={errors ? errors.password : false}
            error={errors.password ? true : false}
            value={password}
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
            Login
            {loading && <CircularProgress className={classes.progress} />}
          </Button>
          <br />
          <small>
            Don't have an account? Sign up <Link to="/signup">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

export default Login;
