import logger from "redux-logger";
import rootReducer from "./reducer";
import { createStore, applyMiddleware } from "redux";

export default createStore(rootReducer, applyMiddleware(logger));