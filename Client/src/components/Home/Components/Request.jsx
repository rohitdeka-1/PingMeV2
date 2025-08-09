// REQUEST COMPONENT - COMMENTED OUT (Friend request functionality disabled)
/*
import React, { useEffect } from 'react'
import { FaUserPlus } from 'react-icons/fa'
import api from "../../../Axios/axiosInsatance.js"
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setPendingRequests, setLoading, setError } from '../../../redux/slices/friendSlice';

const Request = () => {
    const dispatch = useDispatch();
    const { pendingRequests, loading, error } = useSelector(store => store.friend);
 
    const requestCount = pendingRequests?.length || 0;

    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/requests")
    }

    useEffect(() => {
        const fetchRequestCount = async () => {
            try {
                dispatch(setLoading(true));
                const { data } = await api.get('/friend/pending-requests');
                console.log(data);
                dispatch(setPendingRequests(data.requests || []));
                
            } catch (error) {
                console.error('Error fetching request count:', error);
                dispatch(setError(error.response?.data?.message || 'Failed to fetch requests'));
            } finally {
                dispatch(setLoading(false));
            }
        }

        if (!pendingRequests.length && !loading) {
            fetchRequestCount();
        }
    }, [])

    return (
        <div
            className="flex items-center justify-between p-4 bg-base-200 hover:bg-base-300 rounded-lg cursor-pointer transition-colors duration-200  "
            onClick={handleClick}
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <FaUserPlus className="text-primary-content" size={18} />
                </div>
                <div>
                    <h4 className="font-medium text-base-content">Requests</h4>
                    <p className="text-sm text-base-content/70">
                        {loading ? 'Loading...' : `${requestCount} pending`}
                    </p>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
            </div>

            {requestCount > 0 && (
                <div className="badge text-md badge-primary font-semibold rounded-lg py-4 p-3">
                    {requestCount > 99 ? '99+' : requestCount}
                </div>
            )}
        </div>
    )
}

export default Request
*/

// Empty component since friend request functionality is disabled
import React from 'react'

const Request = () => {
    return null; // Component disabled
}

export default Request
