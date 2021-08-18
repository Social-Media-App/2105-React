import { Grid } from "@material-ui/core";
import Post from "../common/post";
import CreatePostIcon from "../HomePage/createpostIcon";
import { IPost, IUser } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import PostContainer from "../common/PostContainer";
import Snackbar from "../common/snackbar";
import { useSelector } from "react-redux"
import {RootState} from '../../redux/store';
import {useLocation} from 'react-router-dom';
import { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Storage } from "aws-amplify";
import Button from "@material-ui/core/Button";
import { Divider } from '@material-ui/core';
import UpdateInfo from "./UpdateInfo"
import PrimarySearchAppBar from '../navbar/navbar'


const breakpointColumnsObj5 = {
    default: 5,
    1500: 4,
    1200: 3,
    900: 2,
    600: 1,
};

const breakpointColumnsObj = {
    default: 3,
    900: 2,
    600: 1,
};

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
    const [postHidden, setPostHidden] = useState(true);
    const [user, setUser]  = useState(location.state as IUser);
    const classes = useStyles();
    const [img1, setImg1] = useState(myAny);
    const [img2, setImg2] = useState(myAny);


    useEffect(() => {
        getImage();
      }, []);

      async function getImages(imgToSendd:string) {
      console.log("inside getImages function ");
  
        const imageKeyss:any = await Storage.list(imgToSendd);
        const imageKeyss2:any = await Promise.all(
          imageKeyss.map(async (k:any) => {
            const signedUrl = await Storage.get(k.key);
            return signedUrl;
          })
        );
        console.log("profile  ",imageKeyss2);
        setImages(imageKeyss2); 
       return(imageKeyss2);
    }  

    async function getImage() {
       const image = await Storage.get(user.profilePicture!);
       const imageb = await Storage.get(user.backgroundPicture!);
       setImg1(image);
       setImg2(imageb);
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
                    
                {
                postHidden ? ""
                    : 
                <Grid container justifyContent="center" alignItems="flex-start">
                    <Grid item xs={10} sm={4}>
                    <Typography
                        align="center"
                        noWrap={true}
                        variant="h5"
                        className={classes.header}
                        >
                    Posts I Made
                    </Typography>
                        <PostContainer postListDetails={postList} />
                    </Grid>
                    <Divider orientation="vertical" flexItem />
                    <Grid item xs={10} sm={4}>
                        <Typography
                            align="center"
                            noWrap={true}
                            variant="h5"
                            className={classes.header}
                            >
                        Posts I Liked
                        </Typography>
                        <PostContainer postListDetails={postList} />
                    </Grid>
                    </Grid>
                    }
                {
                postHidden ? 
                <Button type="submit" variant="contained" color="primary" className={classes.postbutton} onClick={()=>{setPostHidden(false)}}>
                                Reveal Posts
                </Button> : <Button type="submit" variant="contained" color="primary" className={classes.postbutton} onClick={()=>{setPostHidden(true)}}>
                                Hide Posts
                </Button>}
                    
            </Grid>
        </>
    );
}

export default ProfilePage;