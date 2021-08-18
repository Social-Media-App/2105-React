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
} from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";
import { Storage } from "aws-amplify";
import { IPostDetails } from "../../redux/stateStructures";
import { CardActions } from "@material-ui/core";
import { ILike, ILikePost } from "../../redux/stateStructures";
import { RootState } from "../../redux/store";
import { likePost } from "../../redux/actons";
import clsx from "clsx";
import Comments from "../post/comments";
import ChatIcon from '@material-ui/icons/Chat';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import CommentButton from '../post/comment-button'

interface IProps {
    post: IPostDetails;
    liked: boolean;
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
    expandOpen: {
        transform: "rotate(180deg)",
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
}));

//Pass a post in as a prop and a boolean value if the current user liked the post
function InstaPost(props: IProps) {
    const dispatch = useDispatch();
    const styles = useStyles();
    const user = useSelector((state: RootState) => state.auth.user);
    const post = props.post.post;

    const [liked, toggleLike] = useState(props.liked);
    const [bookmarked, toggleBookmark] = useState(true);

    const [url, setURL] = useState(post.picture);
    const [profileUrl, setProfileUrl] = useState(post.postOwner.profilePicture);
    const [expanded, setExpanded] = React.useState(false);

    const handleLikeClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        const likePosted: ILikePost = {
            postId: post.postId!,
        };
        const like: ILike = {
            userId: user.userId!,
            post: likePosted,
        };
        dispatch(likePost(like, post));
        toggleLike(!liked);
    };

    useEffect(() => {
        if (post.picture) {
            getPostPicture(post.picture!);
        }
        if (post.postOwner.profilePicture) {
            getUserProfileImg(post.postOwner.profilePicture);
        }
    }, []);

    const getUserProfileImg = async (profileImg: string) => {
        console.log("getting"+profileImg);
        if (profileImg) {
            Storage.get(profileImg)
                .then((url: any) => {
                    var myRequest = new Request(url);
                    fetch(myRequest).then(function(response) {
                        if (response.status === 200) {
                            setProfileUrl(url);
                        }
                    });
                })
                .catch((err) => console.log(err));
        }
    };

    const getPostPicture = async (postImg: string) => {
        console.log("img"+postImg);

        if (postImg) {
            Storage.get(postImg)
                .then((url: any) => {
                    var myRequest = new Request(url);
                    fetch(myRequest).then(function(response) {
                        if (response.status === 200) {
                            setURL(url);
                        }
                    });
                })
                .catch((err) => console.log(err));
        }
    };

    const handleExpandClick = (eve: any) => {
        setExpanded(!expanded);
        // dispatch(displayComments(props.post, commentPostState!));
    };

    return (
        <Card className={styles.root} variant="outlined">
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="recipe"
                        src={profileUrl}
                        className={styles.avatar}
                    >
                        {/* {post.postOwner.firstName.charAt(0)} */}
                    </Avatar>
                }
                title={
                    <Typography variant="h6" className={styles.header}>
                        {post.postOwner.firstName +
                            " " +
                            post.postOwner.lastName}
                    </Typography>
                }
                action={
                    <div>
                        <CommentButton post={post} user={user}/>
                        {bookmarked ? (
                            <IconButton
                                // onClick={handleLikeClick}
                                aria-label="add to favorites"
                                style={{paddingRight: 0, paddingLeft: 0}}
                            >
                                <BookmarkIcon />
                            </IconButton>
                        ) : (
                            <IconButton
                            // onClick={handleLikeClick}
                            aria-label="add to favorites"
                            style={{paddingRight: 0, paddingLeft: 0}}
                            >
                                <BookmarkBorderIcon />
                            </IconButton>
                        )}
                        {liked ? (
                            <IconButton
                                onClick={handleLikeClick}
                                aria-label="add to favorites"
                                style={{paddingLeft: 0}}
                            >
                                <FavoriteIcon style={{fill: "#dc004e"}}/>
                            </IconButton>
                        ) : (
                            <IconButton
                            onClick={handleLikeClick}
                            aria-label="add to favorites"
                            style={{paddingLeft: 0}}
                            >
                                <FavoriteBorderIcon />
                            </IconButton>
                        )}
                    </div>
                }
                className={styles.top}
            />
            <CardActionArea onClick={handleExpandClick}>
                {post.picture && (
                    <CardMedia className={styles.media} image={url} />
                )}
                <CardContent>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {post.content}
                    </Typography>
                </CardContent>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Comments post={props.post} />
                </Collapse>
            </CardActionArea>
        </Card>
    );
}

export default InstaPost;
