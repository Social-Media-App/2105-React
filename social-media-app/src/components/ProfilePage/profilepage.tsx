import { Grid } from "@material-ui/core";
import Post from "../common/post";
import CreatePostIcon from "../HomePage/createpostIcon";
import { IPost, IUser, IPostDetails } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import PostContainer from "../common/PostContainer";
import Snackbar from "../common/snackbar";
import { useSelector } from "react-redux"
import {RootState} from '../../redux/store';
import {useLocation, useParams} from 'react-router-dom';
import { useState, useEffect, useReducer } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Storage } from "aws-amplify";
import Button from "@material-ui/core/Button";
import { Divider } from '@material-ui/core';
import UpdateInfo from "./UpdateInfo"
import PrimarySearchAppBar from '../navbar/navbar'

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%"
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    header: {
        paddingTop: "20px",
        fontWeight: 600,
        marginBottom: "20px",
    },
    info: {
        paddingTop: "20px",
        fontWeight: 600,
        marginBottom: "20px",
        marginLeft: "20px"
    },
    profilePicture: {

        height: "300px",
        width: "300px",
        borderRadius: "150px",
        margin: "0 auto",
        marginTop: "20px",
        align: "center"

    },
    userBackground: {
        height: "400px",
        width: "100%"
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    button: {
        width: "25%",
        marginTop: "20px",
        marginBottom: "20px"
    },
    postbutton: {
        width: "80%",
    },
    holdbuttons: {
        width: "80%",
        display:"flex"
    },
    revealButton: {
        width: "100%",
    },
    paper2: {
        marginTop: "20px",
        width: "30%",
        alignItems: "left",
        justifyContent: "left",
        marginBottom: "20px",
        borderWidth: "10px",
        textAlign: "center"

    },
}));


function ProfilePage() {
    const postList = useSelector((state:RootState) => state.posts.posts);
    let myAny :any;
    
    //const viewinguser = useSelector((state:RootState) => state.user)
    const viewinguser = useSelector((state:RootState) => state.auth.user);
    const [images, setImages] = useState();
    const location = useLocation();
    //let myAny1 :any = location.state;
    const [postHidden, setPostHidden] = useState(false);
    const classes = useStyles();
    const [img1, setImg1] = useState(myAny);
    const [img2, setImg2] = useState(myAny);
    const users = useSelector((state:RootState) => state.allUsers.users);
    let id:any;
    id = useParams();

    const [user, setUser] = useState(location.state as IUser);
    const [postListLiked, setPostListLiked] = useState(postList);
    const [postListMade, setPostListMade] = useState(postList);
    const [postListRead, setPostListRead] = useState(postList);
    

    useEffect(() => {
        users.map(userme=> {if(userme.username === id.userId) {setUser(userme);} })
    }, [id, users]);
    
    useEffect(() => {
        getImage();
        setPostListLiked(postList.filter((post)=> post.likeNumber.some(like => like.userId===user.userId)))  
        setPostListMade(postList.filter((post)=> post.post.userId === user.userId))  
        setPostListRead(postListMade);
        
    }
    , [user])

    useEffect(() => {
        setPostListLiked(postList.filter((post)=> post.likeNumber.some(like => like.userId===user.userId)))  
    }, [postList]);

    useEffect(() => {
        setPostListMade(postList.filter((post)=> post.post.userId === user.userId))  
        setPostListRead(postListMade);
    }, [postList]);

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useEffect(() => {
        forceUpdate();

    }, []);
    

    async function getImage() {
        console.log(user)
       const image = await Storage.get(user.profilePicture!);
       const imageb = await Storage.get(user.backgroundPicture!);
       setImg1(image);
       setImg2(imageb);
    }
    const getMadePosts = () => {
        setPostListRead(postListMade);
        setPostHidden(false)
    }
    const getLikedPosts = () => {
        setPostListRead(postListLiked);
        setPostHidden(false);
    }
    const getBookmarkedPosts = () => {
        console.log("Not Implemented");
        setPostHidden(false);
    }


    
    // useEffect(() => {
    //     dispatch(getAllPosts());
    // }, [dispatch]);



    return (
        <>
            <PrimarySearchAppBar />
            <Snackbar />

            <Grid container justifyContent="center" alignItems="flex-start">
            

            <Paper className={classes.paper} variant="outlined" style = {{backgroundImage:`url(${img2})`, backgroundSize: "100%" }}>
  
                <Paper className={classes.paper2} variant="outlined">      

                        <img  className={classes.profilePicture}  src={img1} alt="" />
                <Typography
                    align="left"
                    noWrap={true}
                    variant="h5"
                    className={classes.info}
                    >
                    Username:{user.username}
                </Typography>
                <Typography
                    align="left"
                    noWrap={true}
                    variant="h5"
                    className={classes.info}
                    >
                    Name:{user.middleName ? user.firstName + " " + user.middleName : user.firstName} {user.lastName}
                </Typography>
                <Typography
                    align="left"
                    noWrap={true}
                    variant="h5"
                    className={classes.info}
                    >
                    Email:{user.email}
                </Typography>
                </Paper>
                {
                user.userId ==  viewinguser.userId ? 
                <UpdateInfo/>
                : ""}
                 </Paper>
                    <div className={classes.holdbuttons}>
    
                        <Button type="submit" variant="contained" color="primary" className={classes.revealButton} onClick={getMadePosts}>
                            Made Posts
                        </Button>
                        <Button type="submit" variant="contained" color="primary" className={classes.revealButton} onClick={getLikedPosts}>
                            Liked Posts
                        </Button> 
                        <Button type="submit" variant="contained" color="primary" className={classes.revealButton} onClick={getBookmarkedPosts}>
                            Bookmarked Posts
                        </Button>  
                    </div>
                        
                    
                {
                postHidden ? ""
                    : 
                <Grid container justifyContent="center" alignItems="flex-start">
                    <Grid item xs={8} sm={8}>
                    {/* <Typography
                        align="center"
                        noWrap={true}
                        variant="h5"
                        className={classes.header}
                        >
                    </Typography> */}
                        <PostContainer postListDetails={postListRead} sort={0}/>
                    </Grid>
                    </Grid>
                    }

                {
                postHidden ? ""
                    : 
                    <Button type="submit" variant="contained" color="primary" className={classes.postbutton} onClick={()=>{setPostHidden(true)}}>
                        Hide Posts
                    </Button>
                }
            </Grid>
        </>
    );
}

export default ProfilePage;