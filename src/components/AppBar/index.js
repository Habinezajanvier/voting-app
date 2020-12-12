import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link, AppBar, Toolbar, Typography, Button } from "@material-ui/core";

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
  toolbarLink: {
    padding: theme.spacing(1),
    fontSize: 22,
    flexShrink: 0,
    "&:hover": {
      textDecoration: "none",
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const { pathname } = window.location;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {pathname === "/" ? (
              <Link
                color="inherit"
                noWrap
                variant="subtitle1"
                href="/polls"
                target={null}
                className={classes.toolbarLink}
              >
                Polls
              </Link>
            ) : (
              <Link
                color="inherit"
                noWrap
                variant="subtitle1"
                href="/"
                target={null}
                className={classes.toolbarLink}
              >
                Back
              </Link>
            )}
          </Typography>
          <Button color="inherit">Signup</Button>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
