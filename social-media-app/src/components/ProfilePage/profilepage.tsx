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
import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const user: IUser = {
    userId: 1,
    username: "string",
    password: "string",
    firstname: "string",
    middlename: "string",
    lastname: "string",
    userEmail: "string",
    profilePhoto: "string",
    backgroundPhoto: "string",
};

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
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    paper2: {
        width: "100%",
        height: "400px",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",

        "&:hover": {
            boxShadow: "0px 10px 36px rgba(131,153,167,0.7)",
        },
    },
}));


function ProfilePage() {
    const postList = useSelector((state:RootState) => state.posts.posts);
    //const viewinguser = useSelector((state:RootState) => state.user)
    const viewinguser = useSelector((state:RootState) => state.auth.user);
    const location = useLocation();
    const {user, setUser}: any = useState(location.state);
    const classes = useStyles();

    
    // useEffect(() => {
    //     dispatch(getAllPosts());
    // }, [dispatch]);



    return (
        <>
            <Snackbar />
            <Paper className={classes.paper} variant="outlined">
                <Typography
                    align="center"
                    noWrap={true}
                    variant="h5"
                    className={classes.header}
                >
                    Profile:{viewinguser.firstname} {viewinguser.user?.lastName}
                </Typography>
                <Typography
                    align="center"
                    noWrap={true}
                    variant="h5"
                    className={classes.header}
                >
                    Name:{}
                </Typography>
                <Typography
                    align="center"
                    noWrap={true}
                    variant="h5"
                    className={classes.header}
                >
                    Profile:{}
                </Typography>




            </Paper>


            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={8}>
                    <PostContainer postList={postList} />
                </Grid>
            </Grid>
        </>
    );
}

export default ProfilePage;