import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedUser } from "../../../redux/slices/userSlice";
 

const MessageCards = ({user}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {onlineUsers} = useSelector(store=>store.socket);
  const isOnline =onlineUsers.includes(user._id);

  const handleCardClick = () => {
    dispatch(setSelectedUser(user));
    
    navigate("/chat");
  };

  return (
    <>
      <div
        onClick={handleCardClick}
        className={`flex items-center gap-3 py-3  rounded-lg cursor-pointer transition-colors  hover:bg-base-300"}`}
      >

        <div className={`avatar ${isOnline ? `avatar-online` : `` }`}>
          <div className="w-12 rounded-full">
            <img
              src={
                user?.profilePhoto ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                  user?.fullName || "User"
                )}`
              }
              alt="user-profile"
            />
          </div>
        </div>

        <div className="flex-1">
          <p className="font-semibold text-lg">{user?.fullname}</p>
          <p className="text-gray-400 text-sm">@{user?.username}</p>
       
        </div>
      </div>
    </>
  );
};

export default MessageCards;
