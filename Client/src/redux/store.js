import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice.js"
import friendReducer from "./slices/friendSlice.js"
import messageReducer from "./slices/messageSlice.js"
import socketReducer from "./slices/socketSlice.js"

const store = configureStore({
    reducer:{
        user: userReducer,
        friend: friendReducer,
        message: messageReducer,
        socket: socketReducer
    }
})

export default store;