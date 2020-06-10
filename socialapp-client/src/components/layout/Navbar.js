import React from "react";
import { Link } from "react-router-dom/";

// Utility
import MyButton from "../../util/MyButton";

// Components
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles/";
import Typography from "@material-ui/core/Typography";
//Icons
import HomeIcon from "@material-ui/icons/Home";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/userActions";

// Styles
const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
    width: "90%",
    "& svg": {
      color: "white",
    },
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.user.authenticated);

  // Logout
  const handleLogout = () => {
    dispatch(logoutUser());
  };
  return (
    <AppBar>
      <Toolbar className={classes.navbarContainer}>
        <Link to="/" className={classes.link}>
          <Typography variant="h5" color="inherit" align="left">
            Social Neanderthal
          </Typography>
        </Link>
        {authenticated ? (
          <div>
            <Link to="/profile">
              <MyButton tipTitle="Profile">
                <AccountCircleIcon color="primary" />
              </MyButton>
            </Link>
            <PostScream />
            <Link to="/home">
              <MyButton tipTitle="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <Notifications color="primary" />
            <MyButton
              tipTitle="Logout"
              onClick={handleLogout}
              btnClassName={classes.backButton}
            >
              <KeyboardReturn color="primary" />
            </MyButton>
          </div>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/about">
              About
            </Button>
            <Button color="inherit" component={Link} to="/home">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
