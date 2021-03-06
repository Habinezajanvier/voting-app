import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
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
  Fab,
  IconButton,
} from "@material-ui/core";
import { Doughnut } from "react-chartjs-2";
import ResponseSnack from "./SnackBar";
import CreatePolls from "./CreatePoll";
import {
  getAllPoll,
  addVote,
  clearStates,
  deletePoll,
} from "../../redux/actions/polls";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(10, 0),
    minHeight: "calc(100vh - 100px)",
  },
  paper: {
    minHeight: "90vh",
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    position: "relative",
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
    zIndex: theme.zIndex.drawer + 1,
  },
  actions: {
    position: "absolute",
    bottom: 0,
    right: 0,
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

function CandidateCard({ id, itemId, name, score, image }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const votingHandle = (id, itemId) => {
    dispatch(addVote(id, itemId, score + 1));
  };

  return (
    <Grid item xs={12} md={6}>
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
          <Button
            onClick={() => votingHandle(id, itemId, name)}
            size="small"
            color="primary"
          >
            Vote
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default function Polls() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [snackColor, setSnackColor] = React.useState(null);
  const { voted } = useSelector((state) => state.voting);
  const { authSuccess } = useSelector((state) => state.auth);
  const { polls, pollIds, success, deleteSuccess, loading } = useSelector(
    (state) => state.polls
  );

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackOpen(false);
  };

  const handleDeletePoll = (id) => {
    dispatch(deletePoll(id));
  };

  useEffect(() => {
    setSnackOpen(false);
    dispatch(getAllPoll());
  }, [dispatch]);
  useEffect(() => {
    if (voted) {
      setSnackOpen(true);
      setMessage("You have successfully voted");
      setSnackColor("success");
      setInterval(() => {
        dispatch(getAllPoll());
        dispatch(clearStates());
      }, 6000);
    }
  }, [voted, dispatch]);

  useEffect(() => {
    if (success) {
      setSnackOpen(true);
      setMessage("You have successfully created a voting poll");
      setSnackColor("success");
      setInterval(() => {
        window.location.reload();
      }, 6000);
    }
  }, [success]);

  useEffect(() => {
    if (deleteSuccess) {
      setSnackOpen(true);
      setSnackColor("success");
      setMessage("Your Poll is deleted successfully");
      dispatch(getAllPoll());
      setInterval(() => {
        dispatch(clearStates());
      }, 6000);
    }
  }, [deleteSuccess, dispatch]);

  return (
    <div className={classes.root}>
      <ResponseSnack
        color={snackColor}
        open={snackOpen}
        handleClose={handleSnackClose}
        message={message}
      />
      {authSuccess && (
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleToggle}
          className={classes.create}
        >
          <AddIcon />
        </Fab>
      )}
      <CreatePolls open={open} handleClose={handleClose} loading={loading} />
      {polls.map((poll, index) => {
        let theItem = [];
        let theScore = [];
        const pollIndex = index;

        poll.items.forEach((item) => {
          theItem.push(item.name);
          theScore.push(item.score);
        });
        return (
          <Grid key={index} container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Paper id={pollIds[index]} className={classes.paper}>
                <Typography variant="h6" gutterBottom align="center">
                  {poll.title}
                </Typography>
                <Typography variant="body2" gutterBottom align="center">
                  {poll.description}
                </Typography>
                <Chart items={theItem} data={theScore} />
                {authSuccess && (
                  <div className={classes.actions}>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDeletePoll(pollIds[pollIndex])}
                    >
                      <DeleteIcon color="secondary" fontSize="large" />
                    </IconButton>
                  </div>
                )}
              </Paper>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Paper className={classes.paper}>
                <Grid container spacing={1}>
                  {poll.items.map((item, index) => (
                    <CandidateCard
                      id={pollIds[pollIndex]}
                      itemId={index}
                      key={item.name}
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
