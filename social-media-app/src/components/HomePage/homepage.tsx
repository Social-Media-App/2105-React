import { Grid } from "@material-ui/core";
import Post from "../common/post";
import CreatePostIcon from "./createpostIcon";
import { IPost, IUser } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import PostContainer from "../common/PostContainer";
import Snackbar from "../common/snackbar";

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

const post: IPost = {
    postId: 1,
    postWrittenContent: "content",
    postImage: "angry dog.jpg",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post2: IPost = {
    postId: 2,
    postWrittenContent: "content",
    postImage: "angry dog.jpg",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post4: IPost = {
    postId: 4,
    postWrittenContent: "content",
    postImage: "cat8.jpg",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post5: IPost = {
    postId: 5,
    postWrittenContent: "content",
    postImage: "",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post6: IPost = {
    postId: 6,
    postWrittenContent: "content",
    postImage: "cat2.jpg",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post7: IPost = {
    postId: 7,
    postWrittenContent: "content",
    postImage: "",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post8: IPost = {
    postId: 8,
    postWrittenContent: "content",
    postImage: "",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
};

const post3: IPost = {
    postId: 3,
    postWrittenContent: "content",
    postImage: "",
    postOwner: user,
    datePosted: new Date(),
    groupId: 0,
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
    const postList = [post, post2, post3, post4, post5, post6, post7, post8];
    return (
        <>
            <Snackbar />
            <Grid container justifyContent="center" alignItems="flex-start">
                <Grid item xs={11}>
                    <PostContainer {...postList} />
                </Grid>
            </Grid>
            <CreatePostIcon ></CreatePostIcon>
        </>
    );
}

export default HomePage;
