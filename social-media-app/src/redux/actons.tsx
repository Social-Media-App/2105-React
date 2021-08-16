import { constants } from './actionTypes';
import { service } from "./service";
import { AppDispatch } from "./store";
import { ISignUpUser } from "../redux/stateStructures"

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
    } catch (e) {
        console.log(e);
        dispatch({
            type: constants.REGISTER_FAILURE,
        });
    }
};

