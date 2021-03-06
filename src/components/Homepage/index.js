import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import homeImage from "../../assets/undraw_voting_nvu7.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(16),
    minHeight: "calc(100vh - 150px)",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 300,
    display: "flex",
    flexFlow: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "80%",
    height: "90%",
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.paper} component="div">
            <Typography variant="h4" gutterBottom align="center">
              Create a voting poll with us
            </Typography>
            <Typography variant="body1" gutterBottom align="center">
              “If there have been those who doubted whether a confederated
              representative democracy were a government competent to the wise
              and orderly management of the common concerns of a mighty nation,
              those doubts have been dispelled.” —John Quincy Adams
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes.paper} component="div">
            <img className={classes.image} src={homeImage} alt="_avatar_" />
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
