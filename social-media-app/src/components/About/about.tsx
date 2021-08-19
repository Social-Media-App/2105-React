import { Grid } from "@material-ui/core";
import Post from "../common/post";
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
            {/* <div backgroundImage = "url()">
                
                <h1>STILL GROWING</h1>


            </div> */}
            
        </>
    );
}

export default HomePage;