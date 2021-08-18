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
import { getAllPosts, getAllUsers } from '../../redux/actons'
import PrimarySearchAppBar from '../navbar/navbar'

function HomePage() {
    const dispatch = useDispatch();
    const postList = useSelector((state:RootState) => state.posts.posts)
    const jwt = useSelector((state:RootState) => state.auth.jwt)
    
    useEffect(() => {
        dispatch(getAllPosts());
        dispatch(getAllUsers(jwt));
    }, [dispatch, jwt]);
    

    return (
        <>
            <PrimarySearchAppBar />
            <Snackbar />
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={8}>
                    <PostContainer postListDetails={postList} />
                </Grid>
            </Grid>
            <CreatePostIcon ></CreatePostIcon>
        </>
    );
}

export default HomePage;
