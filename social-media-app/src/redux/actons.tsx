import { constants } from './actionTypes';
import { service } from "./service";
import { AppDispatch } from "./store";

//Actions are what you dispatch from your components, this file contains all the actions you can dispatched

export const userLogin = (username: string, password: string) => async (
    dispatch: AppDispatch
): Promise<any> => {
    try {
        //dispatch action types corresponding to what is happening in your application to update the redux store
        dispatch({ type: constants.LOGIN_REQUEST });
        const res = await service.login(username, password); //Use the service to make requests to the database
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
