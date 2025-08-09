import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../../../hooks/useGetRealTimeMsg.jsx';

const Message = ({ message }) => {
    const scroll = useRef();
    useGetRealTimeMessage();
    const { authUser, selectedUser } = useSelector(store => store.user);
    const { messages, loading } = useSelector(store => store.message);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#25d366] mx-auto mb-2"></div>
                    <p className="text-gray-400">Loading messages...</p>
                </div>
            </div>
        );
    }

    if (!messages || messages.length === 0) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">No messages yet. Start a conversation!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {messages?.map((msg) => (
                <div
                    key={msg._id}
                    ref={scroll}
                    className={`chat ${msg.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}
                >
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="User avatar"
                                src={
                                    msg.senderId === authUser?._id
                                        ? authUser?.profilePhoto
                                        : selectedUser?.profilePhoto
                                }
                            />
                        </div>
                    </div>
                    <div className="chat-footer ">
                        <time className="text-xs opacity-50 text-white">
                            {new Date(msg.createdAt).toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </time>
                    </div>
                    <div className={`chat-bubble ${msg.senderId === authUser?._id ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}>
                        {msg.message}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Message
