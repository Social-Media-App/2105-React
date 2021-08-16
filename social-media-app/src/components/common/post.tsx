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
} from "@material-ui/core";
import { blueGrey, grey, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import { Storage } from "aws-amplify";
import { IPost } from "../../redux/stateStructures";
import { BrowserRouter as Link } from "react-router-dom";
import { CardActions } from "@material-ui/core";
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

interface IProps {
    post: IPost;
    liked: boolean;
    bookmarked: boolean;
}
const useStyles = makeStyles(() => ({
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
}));

//Pass a post in as a prop and a boolean value if the current user liked the post
function InstaPost(props: IProps) {
    const dispatch = useDispatch();
    const post = props.post;
    const styles = useStyles();
    const [liked, toggleLike] = useState(props.liked);
    const [bookmarked, toggleBookmark] = useState(props.bookmarked);

    const [url, setURL] = useState(post.postImage);

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

    const handleBookmarkedClick = (event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        // if(liked) {
        //     dispatch(unlikePost(post));
        // } else {
        //     dispatch(likePost(post));
        // }
        toggleLike(!bookmarked);
    };

    useEffect(() => {
        getPostPicture(post.postImage);
    }, [post.postImage]);

    const getPostPicture = async (profileImg: string) => {
        console.log("getting img" + profileImg);
        Storage.get(profileImg)
            .then((url: any) => {
                var myRequest = new Request(url);
                console.log(myRequest);
                fetch(myRequest).then(function(response) {
                    console.log(response);

                    if (response.status === 200) {
                        setURL(url);
                    }
                });
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <Card className={styles.root} variant="outlined">
                <CardActionArea>
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
                                    {/* <BookmarkIcon/> */}
                                    <FavoriteIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={handleLikeClick}
                                    aria-label="add to favorites"
                                >
                                    {/* <BookmarkBorderIcon/> */}
                                    <FavoriteBorderIcon />
                                </IconButton>
                            ) 
                        }
                        // eslint-disable-next-line react/jsx-no-duplicate-props
                        // action={
                        //     bookmarked ? (
                        //         <IconButton
                        //             onClick={handleBookmarkedClick}
                        //             aria-label="add to favorites"
                        //         >
                        //             <BookmarkIcon/>
                        //         </IconButton>
                        //     ) : (
                        //         <IconButton
                        //             onClick={handleBookmarkedClick}
                        //             aria-label="add to favorites"
                        //         >
                        //             <BookmarkBorderIcon/>
                        //         </IconButton>
                        //     ) 
                        // }
                        className={styles.top}
                    />
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
    );
}

export default InstaPost;
