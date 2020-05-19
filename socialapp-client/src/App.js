import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import "./App.css";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#3385c6",
      main: "#3385c6",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#FFFFDB",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
});

function App() {
  return (
    <MuiThemeProvider theme={customTheme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
