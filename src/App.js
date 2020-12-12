import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Container, Typography, Link } from "@material-ui/core";
import NavBar from "./components/AppBar";
import Homepage from "./components/Homepage";

const Footer = () => (
  <Typography variant="body2" color="black" align="center">
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
        <Homepage />
        <Footer />
      </Container>
    </React.Fragment>
  );
}
