import { constants } from './actionTypes';
import { service } from "./service";
import { AppDispatch } from "./store";
import { ISignUpUser, ICreatePost, IUser } from "./stateStructures"

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


export const registerAccount = (User: ISignUpUser) => async (dispatch: AppDispatch) => {
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

export const createPost = (post:ICreatePost) => async (dispatch: AppDispatch) => {
    try {
        const res = await service.createPost(post);
        dispatch({
            type: constants.POSTS_CREATE_POST,
            payload: res,
        });
    } catch (e) {
        console.log(e);
    }
};


export const updateUser = (user:IUser, jwt:string) => async (dispatch: AppDispatch) => {
    try {
        const res = await service.updateUser(user, jwt);
        dispatch({
            type: constants.UPDATE_PROFILE_REQUEST,
            payload: res,
        });
    } catch (e) {
        console.log(e);
    }
};