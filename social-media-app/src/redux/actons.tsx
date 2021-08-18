import { constants } from "./actionTypes";
import { service } from "./service";
import { AppDispatch } from "./store";
import { IUser, IPost, IPostDetails, ILike } from "./stateStructures";

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
        const jres = await service.getJwt(username, password);
        dispatch({
            type: constants.JWT_REQUEST,
            payload: jres,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.LOGIN_FAILURE,
            payload: [], //param/action.payload to the reducer
        });
    }
};

export const registerAccount = (User: IUser) => async (
    dispatch: AppDispatch
) => {
    try {
        console.log("registerAccount action");
        dispatch({ type: constants.REGISTER_REQUEST });
        const res = await service.register(User);
        dispatch({ type: constants.REGISTER_SUCCESS });
        dispatch({
            type: constants.LOGIN_SUCCESS,
            payload: res,
        });
        const jres = await service.getJwt(User.username, User.password);
        dispatch({
            type: constants.JWT_REQUEST,
            payload: jres,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.REGISTER_FAILURE,
        });
    }
};

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
};

export const getAllUsers = (jwt: string) => async (dispatch: AppDispatch) => {
    try {
        console.log("get all users");
        dispatch({ type: constants.USERS_GETALL_REQUEST });
        const res = await service.getAllUsers(jwt);
        dispatch({
            type: constants.USERS_GETALL_SUCCESS,
            payload: res,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.USERS_GETALL_FAILURE,
        });
    }
};

export const createPost = (post: IPost) => async (dispatch: AppDispatch) => {
    try {
        const res = await service.createPost(post);
        const postDetails: IPostDetails = {
            post: res,
            comments: [],
            likeNumber: [],
        };
        dispatch({
            type: constants.POSTS_CREATE_POST,
            payload: postDetails,
        });
    } catch (e) {
        console.log(e);
    }
};

export const likePost = (like: ILike, post: IPost) => async (
    dispatch: AppDispatch
) => {
    console.log("res");
    try {
        const res = await service.likePost(like);

        dispatch({
            type: constants.POSTS_LIKE,
            payload: res,
            post: post,
        });
        console.log("res2" + res);
    } catch (e) {
        dispatch({
            type: constants.POSTS_UNLIKE,
            post: post,
            userId: like.userId,
        });
        console.log(e);
    }
};

export const updateUser = (user: IUser, users:IUser[], jwt: string) => async (
    dispatch: AppDispatch
) => {
    try {
        const res = await service.updateUser(user, jwt);
        users.push(res);
        dispatch({
            type: constants.UPDATE_PROFILE_REQUEST,
            payload: res,
        });
        dispatch({
            type: constants.UPDATE_PROFILE_REQUEST_USERS,
            payload: users,
        });
    
    } catch (e) {
        console.log(e);
    }
};

export const logout = () => async (dispatch: AppDispatch) => {
    dispatch({
        type: constants.LOGOUT,
    });
};
