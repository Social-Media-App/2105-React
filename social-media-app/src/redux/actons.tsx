import { constants } from './actionTypes';
import { service } from "./service";
import { AppDispatch } from "./store";
import { IComment, IPost, IUser} from "../redux/stateStructures"
import axios from 'axios';


//Actions are what you dispatch from your components, this file contains all the actions you can dispatched

export const userLogin = (username: string, password: string) => async (
    dispatch: AppDispatch
) => {
    try {
        //dispatch action types corresponding to what is happening in your application to update the redux store
        dispatch({ type: constants.LOGIN_REQUEST });
        const res = await service.axiosLogin(username, password); //Use the service to make requests to the database
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res, //param/action.payload to the reducer
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.LOGIN_FAILURE,
            payload: [], //param/action.payload to the reducer
        });
    }
};


export const registerAccount = (User: IUser) => async (dispatch: AppDispatch) => {
    try {
        console.log("registerAccount action");
        dispatch({ type: constants.REGISTER_REQUEST });
        const res = await service.register(User);
        dispatch({ type: constants.REGISTER_SUCCESS });
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.REGISTER_FAILURE,
        });
    }
};

//DISPLAY COMMENTS (400 ERROR)
export const displayComments = (Post: IPost, postId: number) => async (dispatch: AppDispatch) => {
    try{
        console.log("display comments action");
        dispatch({ type: constants.POSTS_GETCOMMENTS_REQUEST});
        const res = await service.displayComments(Post, postId);
        dispatch ({ type: constants.POSTS_GETCOMMENTS_SUCCESS});
        dispatch({
            type: constants.POSTS_GETCOMMENTS_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.POSTS_GETALL_FAILURE,
        });
    }
}

//ADD A COMMENT (500 ERROR)
export const addComment = (Comment: IComment, Post: IPost) => async (dispatch: AppDispatch) => {
    try{
        console.log("display comments action");
        dispatch({ type: constants.POSTS_ADDCOMMENT_REQUEST});
        console.log('checkpoint 3')
        console.log(Post)
        const res = await service.addComment(Comment, Post);
        dispatch ({ type: constants.POSTS_ADDCOMMENT_SUCCESS});
        dispatch({
            type: constants.POSTS_ADDCOMMENT_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.POSTS_ADDCOMMENT_FAILURE,
        });
    }
}
            
export const getAllPosts = () => async (dispatch: AppDispatch) => {
    try {
        console.log("registerAccount action");
        dispatch({ type: constants.POSTS_GETALL_REQUEST });
        const res = await service.getAllPosts();
        dispatch({
            type: constants.POSTS_GETALL_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.POSTS_GETALL_FAILURE,
        });
    }
}

export const createPost = (post: IPost) => async (dispatch: AppDispatch) => {
    try {
        const res = await service.createPost(post);
        dispatch({
            type: constants.POSTS_CREATE_POST,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.POSTS_ADDCOMMENT_FAILURE,
        });
    }
}

