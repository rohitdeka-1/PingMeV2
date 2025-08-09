import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import Message from "./Message";
import Input from "./Input";
import useGetMessages from "../../../hooks/useGetMessages";
import { setSelectedUser } from "../../../redux/slices/userSlice";

const Chat = () => {
  const { selectedUser } = useSelector(store => store.user);
  const { onlineUsers } = useSelector(store => store.socket);
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const isUserOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  const handleClick = () => {
    dispatch(setSelectedUser(null));
  }

  const handleBackClick = () => {
    navigate("/");
  };
  useGetMessages();
  return (
    <div className="flex flex-col h-screen bg-[#161717] text-white">
      {/* HEader */}
      <div onClick={handleClick} className="fixed top-0 left-0 right-0 bg-[#161717] z-50 flex items-center gap-3 py-2 mt-2 px-2 border-b border-slate-600">
        <IoArrowBackOutline
          onClick={handleBackClick}
          className="text-2xl cursor-pointer hover:text-[#25d366] transition-colors"
        />
        {selectedUser && (
          <>
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    selectedUser?.profilePhoto
                  }
                  alt="user-profile"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-lg">
                {selectedUser?.fullname}
              </h3>
              <p className="text-sm text-gray-400">
                {isUserOnline ? (
                  <span className="text-green-400 flex items-center gap-1">
                     
                    Online
                  </span>
                ) : (
                  'Offline'
                )}
              </p>
            </div>
          </>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4" style={{ marginTop: '80px', marginBottom: '80px' }}>
        {selectedUser ? (
          <Message />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">No user selected</p>
          </div>
        )}
      </div>

      <Input />
    </div>
  );
};

export default Chat;
