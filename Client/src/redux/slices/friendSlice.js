// FRIEND SLICE - COMMENTED OUT
/*
import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name: "friends",
    initialState: {
        friendsList: [],           
        pendingRequests: [],
        loading: false,
        error: null 
    },
    reducers: {
        setFriendsList: (state, action) => {
            state.friendsList = action.payload;  
            state.loading = false;
        },
        setPendingRequests: (state, action) => { 
            state.pendingRequests = action.payload;
            state.loading = false;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;         
        },
        setError: (state, action) => {
            state.error = action.payload;           
            state.loading = false;
        },
         
        addFriendRequest: (state, action) => {
           
            state.sentRequests = state.sentRequests || [];
            state.sentRequests.push(action.payload);
        },
        removePendingRequest: (state, action) => {
           
            state.pendingRequests = state.pendingRequests.filter(
                req => req.id !== action.payload
            );
        },
        clearError: (state) => {
            state.error = null;
        }
    }
});

 
export const { 
    setFriendsList, 
    setPendingRequests,   
    setLoading, 
    setError,
    addFriendRequest,
    removePendingRequest,
    clearError
} = friendSlice.actions;

export default friendSlice.reducer;
*/

// Empty slice since friend functionality is disabled
import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
    name: "friends",
    initialState: {
        disabled: true
    },
    reducers: {}
});

export default friendSlice.reducer;