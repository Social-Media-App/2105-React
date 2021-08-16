import Post from "./post";
import { IPost, IUser } from "../../redux/stateStructures";
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

function HomePage(props:{postList:IPost[]}) {
    return (
        < >
            <Masonry
                breakpointCols={
                    props.postList.length < 5
                    ? breakpointColumnsObj
                    : breakpointColumnsObj5
                }
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {props.postList.map((post) => (
                    <div key={post.postId}>
                        <Post
                            post={post}
                            liked={true}
                        />
                    </div>
                ))}
            </Masonry>
        </>
    );
}

export default HomePage;
