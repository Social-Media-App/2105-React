import * as React from "react";
import {
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import Post from "../common/post";
import CreatePostIcon from "./createpostIcon";
import { IPost, IUser } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import PostContainer from "../common/PostContainer";
import Snackbar from "../common/snackbar";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { getAllPosts, getAllUsers } from "../../redux/actons";
import PrimarySearchAppBar from "../navbar/navbar";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const postList = useSelector((state: RootState) => state.posts.posts);
  const [sort, setSort] = React.useState(0 as number);
  const jwt = useSelector((state: RootState) => state.auth.jwt);

  useEffect(() => {
    dispatch(getAllPosts());
    dispatch(getAllUsers(jwt));
  }, [dispatch, jwt]);

  return (
    <>
      <PrimarySearchAppBar />
      <Snackbar />
      <FormControl style={{marginLeft:'74.8%'}} variant="filled" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Filter</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={sort}
          onChange={(e) => setSort(e.target.value as number)}
        >
          <MenuItem value={0}>
            <em>Newest first</em>
          </MenuItem>
          <MenuItem value={1}>Oldest first</MenuItem>
          <MenuItem value={2}>Liked posts</MenuItem>
          {/* <MenuItem value={3}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item xs={8}>
          <PostContainer postListDetails={postList} sort={sort} />
        </Grid>
      </Grid>
      <CreatePostIcon></CreatePostIcon>
    </>
  );
}

export default HomePage;
