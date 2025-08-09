// REQUESTS COMPONENT - COMMENTED OUT (Friend request functionality disabled)
/*
import React, { useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
    const [requests, setRequests] = useState([
        {
            id: 1,
            name: "John Doe",
            avatar: "https://via.placeholder.com/50",
            mutualFriends: 5
        },
    ]);

    const navigate = useNavigate();

    const onBack = () => {
        navigate("/")
    }

    const handleAccept = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };

    const handleDecline = (id) => {
        setRequests(requests.filter(request => request.id !== id));
    };

    return (
        <div className="p-6 bg-[#161717]  min-h-screen">

            <div className='flex items-center gap-x-5 '>

                <div onClick={onBack}><IoArrowBackOutline size={25} /></div>
                <div className="text-2xl font-bold text-white ">Friend Requests</div>

            </div>

            {requests.length === 0 ? (
                <p className="text-center mt-5 text-gray-400 text-lg">No pending requests</p>
            ) : (
                <div className="space-y-4 mt-5">
                    {requests.map(request => (
                        <div key={request.id} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                            <div className="flex items-center space-x-4">
                                <img
                                    src={request.avatar}
                                    alt={request.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div>
                                    <h4 className="text-white font-medium">{request.name}</h4>
                                    <p className="text-gray-400 text-sm">{request.mutualFriends} mutual friends</p>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="px-2 py-1 bg-white text-green-600 rounded-md hover:bg-green-600 hover:text-white transition-colors"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleDecline(request.id)}
                                    className="px-2 py-1 bg-white text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"
                                >
                                    Decline
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Requests
*/

// Empty component since friend request functionality is disabled
import React from 'react'
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

const Requests = () => {
    const navigate = useNavigate();

    const onBack = () => {
        navigate("/")
    }

    return (
        <div className="p-6 bg-[#161717] min-h-screen">
            <div className='flex items-center gap-x-5'>
                <div onClick={onBack}><IoArrowBackOutline size={25} /></div>
                <div className="text-2xl font-bold text-white">Friend Requests</div>
            </div>
            <p className="text-center mt-5 text-gray-400 text-lg">Friend request functionality is disabled</p>
        </div>
    )
}

export default Requests
