import React from "react";
import {
  Modal,
  Paper,
  Typography,
  Grid,
  TextField,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  paper: {
    width: "60%",
    minHeight: "80vh",
    position: "absolute",
    top: theme.spacing(6),
    left: "20%",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      marginTop: theme.spacing(2),
      width: "90%",
    },
  },
  input: {
    display: "none",
  },
  innerPaper: {
    margin: theme.spacing(1),
  },
  card: {
    maxWidth: 200,
    margin: theme.spacing(1),
  },
  uploadInput: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "space-around",
  },
}));

export default function CreatePoll({ open, handleClose }) {
  const classes = useStyles();

  return (
    <div>
      <Modal className={classes.backdrop} open={open} onClose={handleClose}>
        <Paper className={classes.paper} elevation={3}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Create a Voting Poll
          </Typography>
          <Grid container>
            <Grid item xs={8}>
              <Paper className={classes.innerPaper}>
                <form className={classes.form}>
                  <TextField id="standard-basic" label="Title" />
                  <TextField id="standard-basic" label="Description" />
                  <Grid container>
                    {[1, 2, 3].map((n, index) => (
                      <Grid key={index} item xs={4}>
                        <Card className={classes.card}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="_item_image_"
                              height="100"
                              image="https://source.unsplash.com/random"
                              title="Item/ Candidate"
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="body1"
                                component="h5"
                                align="left"
                              >
                                Item / Candidate
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Button variant="contained" color="primary">
                    Save
                  </Button>
                </form>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.innerPaper}>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  align="center"
                >
                  Add Item
                </Typography>
                <form className={classes.form}>
                  <TextField id="standard-basic" label="Name" />
                  <Grid container>
                    <Grid item xs={8}>
                      <Card className={classes.card}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt="_item_image_"
                            height="100"
                            image="https://source.unsplash.com/random"
                            title="Item/ Candidate"
                          />
                        </CardActionArea>
                      </Card>
                    </Grid>
                    <Grid item xs={4} className={classes.uploadInput}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                    </Grid>
                  </Grid>
                  <Button variant="contained" color="primary">
                    Add
                  </Button>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  );
}
