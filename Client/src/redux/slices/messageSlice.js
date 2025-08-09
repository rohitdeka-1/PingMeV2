import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[],
        loading: false  
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload;
            state.loading = false;
        },
        addMessage:(state,action)=>{
            state.messages.push(action.payload);
        },
        setLoading:(state,action)=>{
            state.loading = action.payload;
        },
        clearMessages:(state)=>{
            state.messages = [];
            state.loading = false;
        }
    }
})


export const {setMessages, addMessage, setLoading, clearMessages} = messageSlice.actions;
export default messageSlice.reducer;