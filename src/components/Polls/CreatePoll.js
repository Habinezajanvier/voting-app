import React, { useState } from "react";
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
  Box,
  CircularProgress,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useDispatch } from "react-redux";
import { createPoll } from "../../redux/actions/polls";
import { storage } from "../../firebase/config";

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="determinate" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function CreatePoll({ open, handleClose, loading }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    name: "",
    image: "",
    score: 0,
  });
  let [items, setItems] = useState([]);
  const [poll, setPoll] = useState({
    title: "",
    description: "",
    items: [],
  });
  const [progress, setProgress] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPoll((poll) => ({ ...poll, [name]: value }));
  };

  const handleSubmit = () => {
    dispatch(createPoll(poll));
  };

  const addItemHandle = () => {
    items = [...items];
    items.push(item);
    setItems(items);
    setPoll((poll) => ({ ...poll, items: items }));
    setItem({
      ...item,
      name: "",
      image: "",
    });
  };

  const onNameChange = (e) => {
    setItem((item) => ({ ...item, name: e.target.value }));
  };

  const onFileChange = (e) => {
    const selected = e.target.files[0];
    const accepted = ["image/png", "image/jpeg"];

    if (selected && accepted.includes(selected.type)) {
      const storageRef = storage.ref(selected.name);
      storageRef.put(selected).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          setItem((item) => ({ ...item, image: url }));
          setProgress(null);
        }
      );
    } else {
      const errorMsg = "Selected file is not an image type";
      alert(errorMsg);
    }
  };

  return (
    <div>
      <Modal className={classes.backdrop} open={open} onClose={handleClose}>
        <Paper className={classes.paper} elevation={3}>
          <Typography gutterBottom variant="h5" component="h2" align="center">
            Create a Voting Poll
          </Typography>
          <Grid container>
            <Grid item sm={12} md={8}>
              <Paper className={classes.innerPaper}>
                <form className={classes.form}>
                  <TextField
                    id="standard-basic"
                    label="Title"
                    name="title"
                    value={poll.title}
                    onChange={handleInputChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Description"
                    name="description"
                    value={poll.description}
                    onChange={handleInputChange}
                  />
                  <Grid container>
                    {poll.items.length ? (
                      items.map((n, index) => (
                        <Grid key={index} item xs={4}>
                          <Card className={classes.card}>
                            <CardActionArea>
                              <CardMedia
                                component="img"
                                alt="_item_image_"
                                height="100"
                                image={n.image}
                                title={n.name}
                              />
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="body1"
                                  component="h5"
                                  align="left"
                                >
                                  {n.name}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                        </Grid>
                      ))
                    ) : (
                      <Alert severity="warning">
                        Add Item or Candidate first!
                      </Alert>
                    )}
                  </Grid>
                  <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={
                      !poll.title || !poll.description || !poll.items.length
                    }
                  >
                    {loading ? <CircularProgress size={24} /> : "Save"}
                  </Button>
                </form>
              </Paper>
            </Grid>
            <Grid item sm={6} md={4}>
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
                  <TextField
                    id="standard-basic"
                    label="Name"
                    value={item.name}
                    onChange={onNameChange}
                  />
                  <Grid container>
                    <Grid item xs={4} className={classes.uploadInput}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={onFileChange}
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
                    <Grid item xs={8}>
                      {progress && (
                        <CircularProgressWithLabel value={progress} />
                      )}
                      {item.image && (
                        <Card className={classes.card}>
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              alt="_item_image_"
                              height="100"
                              image={item.image}
                              title={item.name}
                            />
                          </CardActionArea>
                        </Card>
                      )}
                    </Grid>
                  </Grid>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addItemHandle}
                    disabled={!item.name || !item.image}
                  >
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
