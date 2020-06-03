import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import theme from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

// CSS
import "./App.css";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

// Utility
import AuthRoute from "./util/AuthRoute.js";

// Theme
const customTheme = createMuiTheme(theme);

// Authorization
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
    localStorage.clear();
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
