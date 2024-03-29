import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Typography, Link } from "@material-ui/core";
import NavBar from "./components/AppBar";
import Homepage from "./components/Homepage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Polls from "./components/Polls";
import Signup from "./components/Signup";
import Login from "./components/Login";

const Footer = () => (
  <Typography variant="body2" color="primary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="/">
      OnlineVote
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <NavBar />
        <Router>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/polls" component={Polls} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
        <Footer />
      </Container>
    </React.Fragment>
  );
}
