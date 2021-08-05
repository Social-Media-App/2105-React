import { constants } from "./actionTypes";
import { AnyAction } from 'redux'


//Initial state for each reducer
const loginInitialState = {
    isRegistering: false,
    registered: false,
    isLoggedIn: false,
    loggingIn: false,
    user: {},
};

const userInitialState = {
    usersLoading: false,
    usersLoaded: false,
    users: [],
};

const postInitialState = {
    postsLoading: false,
    postsLoaded: false,
    posts: [],
};

//All Reducers


//Auth Reducer
export const authReducer = (state = loginInitialState, action: AnyAction):typeof loginInitialState => {
    console.log("in loginreducer" + action.type);
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
            };
        default:
            return state;
    }
};


//Users Reducer
export const usersReducer = (state = userInitialState, action: AnyAction):typeof userInitialState => {
    console.log("in userreducer" + action);
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
export const postReducer = (state = postInitialState, action: AnyAction):typeof postInitialState => {
    console.log("in postreducer" + action);
    switch (action.type) {
    //     case constants.POSTS_GETALL_REQUEST:
    //         return {
    //             ...state,
    //             postsLoading: true,
    //         };
        default:
            return state;
    }
};