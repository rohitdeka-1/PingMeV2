import React, { useEffect } from 'react'
import api from "../Axios/axiosInsatance.js"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setMessages, setLoading, clearMessages } from '../redux/slices/messageSlice.js'
 

const useGetMessages = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector(store => store.user);
    
    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) {
                console.log('No selected user found');
                dispatch(clearMessages());  
                return;
            }
            
            dispatch(clearMessages());
            dispatch(setLoading(true));
            
            try {
                const res = await api.get(`/message/${selectedUser?._id}`);
                console.log('Messages API Response:', res.data.messages);
                if (res.data.success) {
                    dispatch(setMessages(res.data.messages || []));
                }
            } catch (err) {
                console.error('Error fetching messages:', err);
                dispatch(clearMessages());  
            } finally {
                dispatch(setLoading(false));
            }
        }
        
        fetchMessages();
    }, [selectedUser?._id, dispatch])
}

export default useGetMessages
