import { constants } from "./actionTypes";
import { AnyAction } from "redux";
import { IUser, IPost } from './stateStructures'

//Initial state for each reducer
const loginInitialState = {
    isRegistering: false,
    registered: false,
    isLoggedIn: false,
    loggingIn: false,
    user: {} as IUser,
};

const userInitialState = {
    usersLoading: false,
    usersLoaded: false,
    users: [] as IUser[],
};

const postInitialState = {
    postsLoading: false,
    postsLoaded: false,
    posts: [] as IPost[],
};

//All Reducers

//Auth Reducer
export const authReducer = (
    state = loginInitialState,
    action: AnyAction
): typeof loginInitialState => {
    switch (action.type) {
        case constants.LOGIN_REQUEST:
            return {
                ...state,
                loggingIn: true,
            };
        case constants.LOGIN_SUCCESS:
            console.log("in sucess reducer" + action.payload);
            return {
                ...state,
                user: action.payload,
                isLoggedIn: true,
                loggingIn: false,
            };
        case constants.LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                loggingIn: false,
                user: {} as IUser,
            };
        case constants.REGISTER_REQUEST:
            return {
                ...state,
                isRegistering: true,
            };
        case constants.REGISTER_SUCCESS:
            return {
                ...state,
                isRegistering: false,
                registered: true,
            };
        case constants.REGISTER_FAILURE:
            return {
                ...state,
                isRegistering: false,
            };
        default:
            return state;
    }
};

//Users Reducer
export const usersReducer = (
    state = userInitialState,
    action: AnyAction
): typeof userInitialState => {
    switch (action.type) {
        // case constants.USERS_GETALL_REQUEST:
        //     return {
        //         ...state,
        //         usersLoading: true,
        //     };
        default:
            return state;
    }
};

//Post Reducer
export const postReducer = (
    state = postInitialState,
    action: AnyAction
): typeof postInitialState => {
    switch (action.type) {
        case constants.POSTS_GETALL_REQUEST:
            return {
                ...state,
                postsLoading: true,
            };
        case constants.POSTS_GETALL_SUCCESS:
            return {
                ...state,
                postsLoading: false,
                posts: action.payload
            };
        case constants.POSTS_GETALL_FAILURE:
            return {
                ...state,
                postsLoading: false,
            };        
            case constants.POSTS_CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload],
            };
        default:
            return state;
    }
};
