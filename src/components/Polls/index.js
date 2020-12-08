import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import {
  Grid,
  Paper,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import polls from "./polls";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(10, 0),
    minHeight: "100vh",
  },
  paper: {
    minHeight: "90vh",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  card: {
    maxWidth: 345,
  },
  chart: {
    marginTop: theme.spacing(8),
  },
  create: {
    position: "fixed",
    top: theme.spacing(8.5),
    left: "48%",
    color: "primary",
    // borderRadius: "50%",
  },
}));

const Chart = ({ items, data }) => {
  const classes = useStyles();
  const state = {
    labels: [...items],
    datasets: [
      {
        label: "Election",
        backgroundColor: [
          "#C9DE00",
          "#2FDE00",
          "#00A6B4",
          "#6800B4",
          "#B21F00",
        ],
        hoverBackgroundColor: [
          "#4B5000",
          "#175000",
          "#003350",
          "#35014F",
          "#501800",
        ],
        data: [...data],
      },
    ],
  };
  return (
    <div className={classes.chart}>
      <Doughnut
        data={state}
        options={{
          title: {
            display: true,
            text: "Election Results",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
};

function CandidateCard({ name, score, image }) {
  const classes = useStyles();

  return (
    <Grid item xs={6}>
      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.create}
        startIcon={<AddIcon />}
      ></Button>
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt={name}
            height="160"
            image={image}
            title={name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2" align="left">
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              align="left"
            >
              Total Score: {score}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Vote
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default function Polls() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {polls.map((poll, index) => {
        let theItem = [];
        let theScore = [];

        poll.items.forEach((item) => {
          theItem.push(item.name);
          theScore.push(item.score);
        });
        return (
          <Grid key={index} container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography variant="h6" gutterBottom align="center">
                  {poll.name}
                </Typography>
                <Typography variant="body2" gutterBottom align="center">
                  {poll.description}
                </Typography>
                <Chart items={theItem} data={theScore} />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  {poll.items.map((item, index) => (
                    <CandidateCard
                      key={index}
                      name={item.name}
                      image={item.image}
                      score={item.score}
                    />
                  ))}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
