import Post from "./post";
import { IPost, IPostDetails } from "../../redux/stateStructures";
import Masonry from "react-masonry-css";
import "./masonry.css"

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

function HomePage(props:{postListDetails:IPostDetails[]}) {

    // function findIfLiked(post: IPost) {
    //     return post.likes.some(like => like.userId===user.userId);
    // }

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
                {props.postListDetails.map((postDetail) => (
                    <div key={postDetail.post.postId}>
                        <Post
                            post={postDetail.post}
                            liked={true}
                        />
                    </div>
                ))}
            </Masonry>
        </>
    );
}

export default HomePage;
