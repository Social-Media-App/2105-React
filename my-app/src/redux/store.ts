import { applyMiddleware, createStore, combineReducers } from "redux";
import {usersReducer , authReducer, postReducer} from "./reducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

//All reducers combined into a root reducer to apply middleware, If you make a new reducer put it here
const rootReducer = combineReducers({
  auth: authReducer,
  allUsers: usersReducer,
  posts: postReducer
});

//Store creation this currently has dev tools on top of it to see store in the browser
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

//create-react-app redux boilerplate
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
