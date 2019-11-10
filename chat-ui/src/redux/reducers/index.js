import { combineReducers } from "redux";
import chats from "./chatReducer";

const rootReducer = combineReducers({
    chats
});

export default rootReducer;