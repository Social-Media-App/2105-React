import Post from "./post";
import { IPost, IPostDetails } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import "./masonry.css"
import { useSelector} from 'react-redux'
import { RootState } from '../../redux/store' 
import { TransitionGroup } from 'react-transition-group';
import Fade from '@material-ui/core/Fade';

const breakpointColumnsObj5 = {
    default: 4,
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

interface IProps{
    sort:number;
    postListDetails:IPostDetails[]
}

function HomePage(props:IProps) {

    const user = useSelector((state: RootState) => state.auth.user);

    function findIfLiked(post: IPostDetails) {
        return post.likeNumber.some(like => like.userId===user.userId);
    }

    function handleSortNewestFirst(){
        return(
            props.postListDetails.slice(0).reverse().map((postDetail) => (
                <div key={postDetail.post.postId}>
                    <Post
                        post={postDetail}
                        liked={findIfLiked(postDetail)}
                        />
                </div>
            ))
        );
    }

    function handleSortOldestFirst(){
        return(
            props.postListDetails.slice(0).map((postDetail) => (
                <div key={postDetail.post.postId}>
                    <Post
                        post={postDetail}
                        liked={findIfLiked(postDetail)}
                        />
                </div>
            ))
        );
    }

    function handleSortLiked(){
        return(
            props.postListDetails.slice(0).map((postDetail) => (
                findIfLiked(postDetail) && (
                <div key={postDetail.post.postId}>
                    <Post
                        post={postDetail}
                        liked={findIfLiked(postDetail)}
                        />
                </div>)
            ))
        );
    }

    return (
        < >
            <Masonry
                breakpointCols={
                    props.postListDetails.length < 5
                    ? breakpointColumnsObj
                    : breakpointColumnsObj5
                }
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >

                {props.sort===0?handleSortNewestFirst():null}
                {props.sort===1?handleSortOldestFirst():null}
                {props.sort===2?handleSortLiked():null}

                {/* {props.postListDetails.slice(0).reverse().map((postDetail) => (
                    <div key={postDetail.post.postId}>
                        <Post
                            post={postDetail}
                            liked={findIfLiked(postDetail)}
                            />
                    </div>
                ))}
                {props.postListDetails.slice(0).reverse().map((postDetail) => (
                    <div key={postDetail.post.postId}>
                        <Post
                            post={postDetail}
                            liked={findIfLiked(postDetail)}
                            />
                    </div>
                ))}
                {props.postListDetails.slice(0).reverse().map((postDetail) => (
                    <div key={postDetail.post.postId}>
                        <Post
                            post={postDetail}
                            liked={findIfLiked(postDetail)}
                            />
                    </div>
                ))} */}
            </Masonry>
        </>
    );
}

export default HomePage;
