import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../Axios/axiosInsatance.js';
import toast from 'react-hot-toast';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  const navigate = useNavigate();
  const { userId } = useParams();  

  const handleMessage = () =>{
    navigate(`/chat`);
  }
 
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) {
        console.log('No userId found in URL params');
        return;
      }
      
      console.log('Fetching user profile for userId:', userId);
      setUserLoading(true);
      try {
        const response = await api.get(`/users/${userId}`);
        console.log('API Response:', response.data);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        console.error('Error response:', error.response?.data);
        toast.error('Failed to load user profile');
        navigate(-1);  
      } finally {
        setUserLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  if (userLoading) {
    return (
      <div className="min-h-screen bg-[#161717] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#25d366] mx-auto"></div>
          <p className="mt-4 text-white">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#161717] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-2">User not found</p>
          <p className="text-gray-400 mb-4">User ID: {userId || 'No ID provided'}</p>
          <button 
            onClick={handleBack}
            className="mt-4 px-4 py-2 bg-[#25d366] text-white rounded-lg hover:bg-[#20bc5a]"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161717] text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#161717] z-50 border-b border-slate-600">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={handleBack}
            className="text-2xl hover:text-[#25d366] transition-colors"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Profile</h1>
          <div></div>
        </div>
      </div>

      {/* Profile content */}
      <div className="pt-20 p-6 flex flex-col items-center">
        {/* Profile photo */}
        <div className="mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#25d366]">
            <img
              src={
                user.profilePhoto 
                 
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name and username */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{user.fullname}</h2>
          <p className="text-gray-400 text-lg">@{user.username}</p>
        </div>
        <div>
            <button onClick={handleMessage} className='rounded-2xl font-bold bg-green-700 p-3 px-7 '>
                Message
            </button>
        </div>

        {/* About section */}
        <div className="mt-8 w-full max-w-sm">
          <div className="bg-[#2a2a2a] rounded-lg p-4">
            <h3 className="text-lg font-medium mb-3">About</h3>
            <div className="space-y-2 text-gray-300">
              <p>📧 {user.email || 'Email not available'}</p>
              <p>📅 Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
