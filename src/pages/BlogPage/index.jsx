import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import Comments from "./Comments";
import LikeButton from "./LikeButton";
import Appbar from "./Appbar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
    marginTop: "10px",
    marginBottom: "10px",
  },
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1519791883288-dc8bd696e667?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },

  commentForm: {
    display: "flex",
    marginTop: "20px",
  },

  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
    margin: "15px",
    marginBottom: "20px",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
    margin: " 0px 10px 0px 0px",
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

function BlogPage(props) {
  const classes = useStyles();

  return (
    <div className="BlogPage">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Appbar />
        </Toolbar>
      </AppBar>

      <Box className={classes.hero}>
        <Box>Jadavpur University</Box>
      </Box>

      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Hey Community
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This app feels so easy to use!!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Box className={classes.author}>
              <Box ml={2}>
                <Typography
                  className="user-name"
                  variant="subtitle4"
                  component="p"
                >
                  Prerna
                </Typography>
              </Box>
            </Box>
            <LikeButton incrementBy={1} />
          </CardActions>

          <Comments />
          <Box className={classes.commentForm}>
            <TextField
              label="Add comment."
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              style={{ marginLeft: "10px" }}
            />

            <Button
              color="primary"
              size="small"
              variant="contained"
              endIcon={<Send />}
              style={{ margin: "15px 10px 10px 10px" }}
            >
              Add
            </Button>
          </Box>
        </Card>
        <Card className={classes.card}>
          <CardActionArea>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Hey Community
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                This app feels so great!
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className={classes.cardActions}>
            <Box className={classes.author}>
              <Box ml={2}>
                <Typography
                  className="user-name"
                  variant="subtitle4"
                  component="p"
                >
                  Rishab
                </Typography>
              </Box>
            </Box>
            <LikeButton incrementBy={1} />
          </CardActions>

          <Comments />
          <Box className={classes.commentForm}>
            <TextField
              label="Add comment."
              size="small"
              variant="outlined"
              fullWidth
              margin="normal"
              style={{ marginLeft: "10px" }}
            />

            <Button
              color="primary"
              size="small"
              variant="contained"
              endIcon={<Send />}
              style={{ margin: "15px 10px 10px 10px" }}
            >
              Add
            </Button>
          </Box>
        </Card>
      </Container>
    </div>
  );
}

export default BlogPage;
