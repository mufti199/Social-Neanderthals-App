import React, { Fragment } from "react";
import { Link } from "react-router-dom/";
import MyButton from "../util/MyButton";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
// Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

// Redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <AppBar>
      <Toolbar className="navbar-container">
        {authenticated ? (
          <Fragment>
            <MyButton tipTitle="Post a scream!">
              <AddIcon color="primary" />
            </MyButton>
            <Link to="/">
              <MyButton tipTitle="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <MyButton tipTitle="Notifications">
              <Notifications color="primary" />
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
