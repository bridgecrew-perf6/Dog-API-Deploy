import { applyMiddleware, compose, createStore } from "redux";
import reducer from "./reducer";
import thunk from "redux-thunk";
import { configureStore } from '@reduxjs/toolkit'

const middleware = [thunk]


const store = configureStore({
    reducer: reducer,
    middleware,
})
  
export default store;
