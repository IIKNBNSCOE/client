import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./services/userslice"
const store= configureStore({
    reducer:{
        user:userReducer
    }
})
export default store