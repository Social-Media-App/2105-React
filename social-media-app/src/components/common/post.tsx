import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { blueGrey, grey, red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { useState, useEffect } from "react";
import axios from 'axios';
//import { likePost, unlikePost } from "../../../redux/actons";
import { Storage } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import {IPost} from "../../redux/stateStructures";

interface IProps {
    post: IPost
    liked: boolean
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
        padding: "5px"
    }
}));

//Pass a post in as a prop and a boolean value if the current user liked the post
function InstaPost(props:IProps) {
    const dispatch = useDispatch();
    const post = props.post;
    const styles = useStyles();
    const [liked, toggleLike] = useState(props.liked);
    
    const [url, setURL] = useState(post.postImage);
    
    const handleLikeClick = () => {
        // if(liked) {
            //     dispatch(unlikePost(post));
        // } else {
        //     dispatch(likePost(post));  
        // }
        toggleLike(!liked);
    };


    useEffect(() => {
        getPostPicture(post.postImage);
    },[post.postImage]);

    const getPostPicture = async (profileImg: string) => {
        console.log("getting img"+profileImg);
        Storage.get(profileImg)
            .then((url:any) => {
                var myRequest = new Request(url);
                console.log(myRequest);
                fetch(myRequest).then(function (response) {
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
        </Card>
        </>
    );
}

export default InstaPost;
