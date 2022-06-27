import React, { useState, useContext } from "react";
import Comments from "./Comments";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Divider from "@mui/material/Divider";
import { makeStyles } from "@material-ui/core";
import AuthContext from "../../store/AuthContext";

const useStyles = makeStyles((theme) => ({
  outerDiv: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
export default function BlogCard({ blog }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [liked, setLiked] = useState(blog.isLiked);
  const [likeCount, setLikeCount] = useState(blog.likesCount);
  const authCtx = useContext(AuthContext);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLiked = () => {
    if (liked) {
      setLikeCount(likeCount - 1);
      fetch("http://localhost:8080/blogs/undo_like/", {
        method: "POST",
        body: JSON.stringify({
          userId: authCtx.id,
          blogId: blog._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    if (!liked) {
      setLikeCount(likeCount + 1);
      fetch("http://localhost:8080/blogs/do_like/", {
        method: "POST",
        body: JSON.stringify({
          userId: authCtx.id,
          blogId: blog._id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    setLiked(!liked);
  };

  return (
    <Card sx={{ width: "100%", marginTop: "20px", boxShadow: "10px" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {blog.username[0].toUpperCase()}
          </Avatar>
        }
        title={blog.username}
        action={
          (liked && (
            <IconButton onClick={handleLiked} aria-label="add to favorites">
              <Typography variant="body1" color="text.secondary">
                {likeCount}
              </Typography>
              <FavoriteIcon />
            </IconButton>
          )) ||
          (!liked && (
            <IconButton onClick={handleLiked} aria-label="add to favorites">
              <Typography variant="body1" color="text.secondary">
                {likeCount}
              </Typography>
              <FavoriteBorderIcon />
            </IconButton>
          ))
        }
        subheader={blog.createdAt.substring(0, 10)}
      />

      <CardContent onClick={handleExpandClick} className={classes.outerDiv}>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ wordWrap: "break-word" }}
        >
          {blog.title}
        </Typography>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Divider />
          <Typography
            className={classes.outerDiv}
            sx={{ marginTop: "12px", wordWrap: "break-word" }}
            paragraph
            onClick={handleExpandClick}
          >
            {blog.content}
          </Typography>
          <Divider />
          <Comments blog={blog} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
