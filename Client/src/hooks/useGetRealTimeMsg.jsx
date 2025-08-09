import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { addMessage } from "../redux/slices/messageSlice.js";

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            dispatch(addMessage(newMessage));
        });
        return () => socket?.off("newMessage");
    },[socket, dispatch]);
};
export default useGetRealTimeMessage;