import React, { useEffect } from 'react';
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from '../redux/slices/userSlice.js';
import api from "../Axios/axiosInsatance.js" 

const useGetOtherUsers = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const res = await api.get(`/users`);
                dispatch(setOtherUsers(res.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    }, [])

}

export default useGetOtherUsers