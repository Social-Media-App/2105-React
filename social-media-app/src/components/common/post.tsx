import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
<<<<<<< HEAD
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import TextField from '@material-ui/core/TextField';
=======
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    Avatar,
    IconButton,
    Typography,
    CardActionArea,
} from "@material-ui/core";
>>>>>>> 66e854697d686e461e32e6c3b419677ea28c6b5f
import { blueGrey, grey, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import { Storage } from "aws-amplify";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import {IPost, IUser, IComment} from "../../redux/stateStructures";
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import Collapse from '@material-ui/core/Collapse';
import { Button } from "@material-ui/core";
import { Divider, Grid, Box} from "@material-ui/core";


interface IProps {
    post: IPost
    liked: boolean
    comment: IComment
=======
import { IPost } from "../../redux/stateStructures";
import { BrowserRouter as Link } from "react-router-dom";
import { CardActions } from "@material-ui/core";

interface IProps {
    post: IPost;
    liked: boolean;
>>>>>>> 66e854697d686e461e32e6c3b419677ea28c6b5f
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
<<<<<<< HEAD
        padding: "5px"
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: 'rotate(180deg)',
      },
=======
        padding: "5px",
    },
>>>>>>> 66e854697d686e461e32e6c3b419677ea28c6b5f
}));

//Pass a post in as a prop and a boolean value if the current user liked the post
function InstaPost(props: IProps) {
    const dispatch = useDispatch();
    const post = props.post;
    const styles = useStyles();
    
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [liked, toggleLike] = useState(props.liked);
<<<<<<< HEAD
    const [commentState, setCommentState] = useState(props.comment);

    //Comments
    // const [commentState, setCommentState] = useState("Test comment");
    
    const [url, setURL] = useState(post.postImage);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
    const handleLikeClick = () => {
=======

    const [url, setURL] = useState(post.postImage);

    const handleLikeClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
>>>>>>> 66e854697d686e461e32e6c3b419677ea28c6b5f
        // if(liked) {
        //     dispatch(unlikePost(post));
        // } else {
        //     dispatch(likePost(post));
        // }
        toggleLike(!liked);
    };

<<<<<<< HEAD
    const handleCommentSubmit = () => {
        setCommentState(props.comment);
        console.log(commentState);
    }


=======
>>>>>>> 66e854697d686e461e32e6c3b419677ea28c6b5f
    useEffect(() => {
        getPostPicture(post.postImage);
    }, [post.postImage]);

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

    return (
        <>
<<<<<<< HEAD
        <Card className={styles.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={styles.avatar}>
                        {post.postOwner.firstname.charAt(0)}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" className={styles.header}>
                        {post.postOwner.firstname + " " + post.postOwner.lastname}
                    </Typography>
                }
                action={ liked
                        ?   <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                                <FavoriteIcon />
                            </IconButton>
                        : <IconButton onClick={handleLikeClick} aria-label="add to favorites">
                                <FavoriteBorderIcon />
                            </IconButton>
                    }
                className={styles.top}
            />
            {post.postImage && (
                <CardMedia
                    className={styles.media}
                    image={url}
                />
            )}
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {post.postWrittenContent}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Box textAlign='center'>
        <TextField
          fullWidth 
          id="outlined-multiline-static"
          label="Post a Comment"
          multiline
          rows={4}
          defaultValue=""
          variant="outlined"
          onChange={handleCommentSubmit}
        />
        <br></br>
        
        <Button variant='contained' color='primary'>Comment</Button>
        </Box>
        </CardContent>
        <Grid container item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>Conor Kent</h4>
            <p style={{ textAlign: "left" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              luctus ut est sed faucibus. Duis bibendum ac ex vehicula laoreet.
              Suspendisse congue vulputate lobortis. Pellentesque at interdum
              tortor. Quisque arcu quam, malesuada vel mauris et, posuere
              sagittis ipsum. Aliquam ultricies a ligula nec faucibus. In elit
              metus, efficitur lobortis nisi quis, molestie porttitor metus.
              Pellentesque et neque risus. Aliquam vulputate, mauris vitae
              tincidunt interdum, mauris mi vehicula urna, nec feugiat quam
              lectus vitae ex.{" "}
            </p>
          </Grid>
      </Collapse>         
     </Card>
 </>
=======
            <Card className={styles.root} variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar
                            aria-label="recipe"
                            className={styles.avatar}
                            >
                                {post.postOwner.firstname.charAt(0)}
                            </Avatar>
                        }
                        title={
                            <Typography variant="h6" className={styles.header}>
                                {post.postOwner.firstname +
                                    " " +
                                    post.postOwner.lastname}
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
                    {post.postImage && (
                        <CardMedia className={styles.media} image={url} />
                    )}
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {post.postWrittenContent}
                        </Typography>
                        <CardActions>

                        </CardActions>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
>>>>>>> 66e854697d686e461e32e6c3b419677ea28c6b5f
    );
}

export default InstaPost;
