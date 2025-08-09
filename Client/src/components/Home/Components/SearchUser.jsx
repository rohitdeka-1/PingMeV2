import React, { useState, useEffect } from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import api from "../../../Axios/axiosInsatance.js";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from "../../../redux/slices/userSlice";
import { useNavigate } from 'react-router-dom';

const SearchUser = ({ onBack }) => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [debouncedSearch, setDebouncedSearch] = useState(search);
    console.log(users)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { onlineUsers } = useSelector(store => store.socket);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 300);

        return () => clearTimeout(timer);
    }, [search]);

    const handleUserClick = (user) => {
        navigate(`/profile/${user._id}`);
        dispatch(setSelectedUser(user))
        onBack();
    };

    useEffect(() => {
        const fetchUsers = async () => {
            if (debouncedSearch.trim() === '') {
                setUsers([]);
                return;
            }
            setLoading(true);
            try {
                const { data } = await api.get(`/users/search?search=${debouncedSearch}`);
                setUsers(data.otherUsers || []);
            } catch (err) {
                console.error('Error fetching users:', err);
                console.error('Error response:', err.response?.data);
                setUsers([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [debouncedSearch]);

    return (
        <div className='flex flex-col bg-[#161717]'>
            <div className='flex items-center pt-5 pb-2 px-5 gap-3'>
                <button onClick={onBack}>
                    <IoArrowBackOutline />
                </button>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search User'
                    className='bg-[#2e2f2f] placeholder:text-lg p-2 px-4 rounded-3xl w-full text-white'
                />
            </div>
            <div className='border-b border-slate-600'></div>

 
            <div className="px-5 mt-4 max-h-[calc(100vh-120px)] overflow-y-auto">
                {loading && (
                    <div className="text-gray-400 py-4">Searching...</div>
                )}

                {!loading && search.trim() !== '' && users.length === 0 && (
                    <div className="text-gray-400 py-4">No users found</div>
                )}

                {!loading && Array.isArray(users) && users.map(user => {
                    const isOnline = onlineUsers.includes(user._id);
                    return (
                    <div key={user._id} onClick={() => handleUserClick(user)} className='flex items-center py-3 text-white border-b border-gray-700 hover:bg-gray-800 cursor-pointer rounded px-2'>
                        <div className='relative mr-3'>
                            <div className='w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center'>
                                {user.profilePhoto ? (
                                    <img src={`${user.profilePhoto}`} alt={user.fullname} className='w-full h-full rounded-full' />
                                ) : (
                                    <span className='text-white font-semibold'>
                                        {user.fullname?.charAt(0).toUpperCase()}
                                    </span>
                                )}
                            </div>
                            {isOnline && (
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-gray-800 rounded-full"></div>
                            )}
                        </div>
                        <div className='flex-1'>
                            <div className='font-medium'>{user.fullname}</div>
                            <div className='text-sm text-gray-400 flex items-center gap-2'>
                                <span>@{user.username}</span>
                                {isOnline && (
                                    <span className="text-green-400 text-xs flex items-center gap-1">
                                        Online
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
    );
};

export default SearchUser;
