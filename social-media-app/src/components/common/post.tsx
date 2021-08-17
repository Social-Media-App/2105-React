import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  CardActionArea,
  Collapse,
  Box,
  TextField,
  Button,
  Grid,
} from "@material-ui/core";
import { blueGrey, grey, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { Storage } from "aws-amplify";
import { IComment, IPost, IPostDetails } from "../../redux/stateStructures";
import { BrowserRouter as Link } from "react-router-dom";
import { CardActions } from "@material-ui/core";
import clsx from "clsx";
import { addComment, displayComments } from "../../redux/actons";
import PostContainer from "./PostContainer";
import { RootState } from "../../redux/store";

interface IProps {
  post: IPostDetails;
  liked: boolean;
//   comment: IComment;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: grey[300],
  },
  media: {
    paddingTop: "100%",
    // height: "200px",
  },
  avatar: {
    backgroundColor: grey[500],
  },
  header: {
    textAlign: "left",
    padding: "0px",
  },
  top: {
    padding: "5px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

//Pass a post in as a prop and a boolean value if the current user liked the post
function InstaPost(props: IProps) {
  const dispatch = useDispatch();
  const post = props.post;
  const styles = useStyles();
  const comment = props.post.comments;

  const loggedUser = useSelector((state: RootState) => state.auth.user);

  const [liked, toggleLike] = useState(props.liked);

  //USE STATE FOR EXPAND BUTTON
  const [expanded, setExpanded] = React.useState(false);

  //SETTING UP USESTATE FOR COMMENTS
  const [newCommentContentState, setNewCommentContentState] = useState(
    props.post.comments
  );
  const [commentState, setCommentState] = useState(props.post.comments);
  const [commentAuthorState, setCommentAuthorState] = useState(
    props.comment.userId.username
  );
  const [commentPostState, setCommentPostState] = useState(
    props.comment.post.postId
  );
  const [url, setURL] = useState(post.picture);

  //TRIES TO DISPLAY COMMENTS AFTER EXPANDING
  const handleExpandClick = (eve: any) => {
    setExpanded(!expanded);
    dispatch(displayComments(props.post, commentPostState!));
    console.log(props.post, props.comment);
  };

  const handleLikeClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    // if(liked) {
    //     dispatch(unlikePost(post));
    // } else {
    //     dispatch(likePost(post));
    // }
    toggleLike(!liked);
  };

  //SETS STATE FOR COMMENT AND TRIES TO POST TO ENDPOINT (500 ERROR)
  const handleCommentSubmit = () => {
    // setNewCommentContentState(comment.comment);
    console.log(newCommentContentState);
    const myComment: IComment = {
      post: props.post,
      comment: newCommentContentState,
      userId: loggedUser,
    };
    setCommentAuthorState(comment.userId.username);
    setCommentPostState(comment.post.postId);
    console.log("checkpoint 2");
    console.log(myComment);

    dispatch(addComment(myComment, props.post));

    console.log(newCommentContentState);
    console.log(commentAuthorState);
    console.log(commentPostState);
  };

  useEffect(() => {
    getPostPicture(post.picture!);
  }, [post.picture]);

  const getPostPicture = async (profileImg: string) => {
    Storage.get(profileImg)
      .then((url: any) => {
        var myRequest = new Request(url);
        fetch(myRequest).then(function(response) {
          if (response.status === 200) {
            setURL(url);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  //TRYING TO MAP COMMENTS (?)

  // let myList: JSX.Element;
  // if (props.comment) {
  //     myList = (

  //         <div>
  //             {props.comment.map((myPost: any) => {
  //                 return (
  //                     <PostContainer name={myPost}
  //                     />

  //                 );
  //             })}
  //        </div>
  // );
  // }
  // else {
  //     myList = (<h1>No Post Available</h1>);
  // }

  return (
    <>
      <Card className={styles.root} variant="outlined">
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={styles.avatar}>
              {post.postOwner.firstName.charAt(0)}
            </Avatar>
          }
          title={
            <Typography variant="h6" className={styles.header}>
              {post.postOwner.firstName + " " + post.postOwner.lastName}
            </Typography>
          }
          action={
            liked ? (
              <IconButton
                onClick={handleLikeClick}
                aria-label="add to favorites"
              >
                <FavoriteIcon />
              </IconButton>
            ) : (
              <IconButton
                onClick={handleLikeClick}
                aria-label="add to favorites"
              >
                <FavoriteBorderIcon />
              </IconButton>
            )
          }
          className={styles.top}
        />
        <CardActionArea>
          {post.picture && <CardMedia className={styles.media} image={url} />}
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.content}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {/* EXPAND BUTTON */}
            <IconButton
              className={clsx(styles.expand, {
                [styles.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {/* TRYING TO POPULATE WITH SERVER DATA (not working) */}
            <Grid container item xs zeroMinWidth>
              <h4 style={{ margin: 0, textAlign: "left" }}>
                {commentAuthorState}
              </h4>
              <p style={{ textAlign: "left" }}>{commentState}</p>
            </Grid>
            <CardContent>
              <Box textAlign="center">
                {/* COMMENT TEXT FIELD / SETS STATE ON SUBMIT */}
                <TextField
                  fullWidth
                  id="comment-input"
                  label="Post a Comment"
                  multiline
                  rows={4}
                  defaultValue=""
                  variant="outlined"
                  onChange={(e) => {
                    setNewCommentContentState(e.target.value);
                  }}
                />
                <br></br>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCommentSubmit}
                >
                  Comment
                </Button>
              </Box>
            </CardContent>
          </Collapse>
        </CardActionArea>
      </Card>
    </>
  );
}

export default InstaPost;
