import { legacy_createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";

const myStore = legacy_createStore(reducer, applyMiddleware(thunk));

export default myStore;