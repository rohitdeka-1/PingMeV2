import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import api from "../../../Axios/axiosInsatance.js"
import { setMessages } from '../../../redux/slices/messageSlice';
import { IoIosSend } from "react-icons/io";


const Input = () => {
  const [message,setMessage] = useState("");
  const dispatch = useDispatch();
  const {selectedUser} = useSelector(store=>store.user);
  const {messages} = useSelector(store=>store.message);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const res = await api.post(`message/send/${selectedUser?._id}`,{message});
      console.log(res);
      dispatch(setMessages([...messages,res.data.newMessage]))
    }catch(err){
      console.error(err);
    } finally{
      setMessage("")
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-transparent  p-4">
        <div className="flex items-center gap-2">
          <input
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
            type="text"
            placeholder="Message"
            className="flex-1 bg-[#232626] text-white border border-gray-600 rounded-full px-4 py-3 focus:outline-none focus:border-[#25d366]"
          />
          <button type='submit' className="bg-[#ffffff] text-white p-2 rounded-full hover:bg-[#20bc5a] transition-colors">
            <IoIosSend color='black' size={30} />
          </button>
        </div>
      </form>    
    </div>
  )
}

export default Input
