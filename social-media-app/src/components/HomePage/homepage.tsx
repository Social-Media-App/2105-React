import { Grid } from "@material-ui/core";
import Post from "../common/post";
import CreatePostIcon from "./createpostIcon";
import { IPost, IUser } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import PostContainer from "../common/PostContainer";
import Snackbar from "../common/snackbar";
import { useSelector, useDispatch } from "react-redux"
import {RootState} from '../../redux/store';
import { useEffect } from 'react'
import { getAllPosts } from '../../redux/actons'

const user: IUser = {
    userId: 1,
    username: "string",
    password: "string",
    firstName: "string",
    middleName: "string",
    lastName: "string",
    email: "string",
    profilePicture: "string",
    backgroundPicture: "string",
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

function HomePage() {
    const dispatch = useDispatch();
    const postList = useSelector((state:RootState) => state.posts.posts)
    
    useEffect(() => {
        dispatch(getAllPosts());
    }, [dispatch]);
    

    return (
        <>
            <Snackbar />
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={8}>
                    <PostContainer postList={postList} />
                </Grid>
            </Grid>
            <CreatePostIcon ></CreatePostIcon>
        </>
    );
}

export default HomePage;
