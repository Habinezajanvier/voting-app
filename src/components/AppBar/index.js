import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Link, AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { LOG_USER_OUT } from "../../redux/actions/types";

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
  const { authSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { pathname } = window.location;

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch({ type: LOG_USER_OUT });
    if (pathname !== "/") {
      window.location = "/login";
    }
  };

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
          {!authSuccess ? (
            <div>
              <Link
                color="inherit"
                noWrap
                variant="subtitle1"
                href="/signup"
                target={null}
                className={classes.toolbarLink}
              >
                <Button color="inherit">Signup</Button>
              </Link>
              <Link
                color="inherit"
                noWrap
                variant="subtitle1"
                href="/login"
                target={null}
                className={classes.toolbarLink}
              >
                <Button color="inherit">Login</Button>
              </Link>
            </div>
          ) : (
            <div className={classes.actions}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<ExitToAppIcon />}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
