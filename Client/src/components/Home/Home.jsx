import React, { useEffect, useRef, useState } from 'react';
import SearchUser from './Components/SearchUser'; 
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/slices/userSlice';
import api from "../../Axios/axiosInsatance.js";
import toast from 'react-hot-toast';
import List from './Components/List.jsx';
import MessageCards from './Components/MessageCards.jsx';
import useGetOtherUsers from '../../hooks/useGetOtherUsers.jsx';
 

const Home = () => {
  const [searchIcon, setSearchIcon] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(false);

  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     try {
  //       const res = await api.get("/users"); 
  //       console.log(res)
  //       setUsers(res.data || []);
  //     } catch (error) {
  //       console.error("Error fetching users:", error);
  //       toast.error("Failed to load users");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUsers();
  // }, []);

  useGetOtherUsers();
  const {otherUsers} = useSelector(store=>store.user);
  if (!otherUsers) return;


  const handleSearchClick = () => setSearchIcon(!searchIcon);

  const handleOptionClick = async (option) => {
    switch (option) {
      case "Logout":
        try {
          const res = await api.get(`/auth/logout`);
          dispatch(setAuthUser(null));
          toast.success(res.data.message);
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
        }
        break;
      case "Profile":
        if (authUser?._id) {
          navigate(`/profile/${authUser._id}`);
        }
        break;
      case "Settings":
        navigate("/settings");
        break;
      case "Developers":
        navigate("/developers");
        break;
      default:
        console.warn("Unknown option:", option);
    }
  };

  return (
    <div className="min-h-screen bg-[#161717] flex flex-col text-white">
      <div className="fixed top-0 left-0 right-0 bg-[#161717] z-50">
        {searchIcon ? (
          <SearchUser onBack={handleSearchClick} />
        ) : (
          <>
            <div className='flex justify-between items-center pt-6 pb-3 px-5 text-2xl font-bold'>
              <div>PingMe</div>
              <div ref={menuRef} className='relative flex gap-4 items-center'>
                <HiMiniMagnifyingGlass onClick={handleSearchClick} className='cursor-pointer' />
                <BsThreeDotsVertical onClick={() => setShowOptions(!showOptions)} className='cursor-pointer' />
                {showOptions && (
                  <div className='absolute font-light top-10 right-1 bg-[#1e1e1e] border border-gray-600 rounded-md text-lg'>
                    <div className='px-4 py-2 hover:bg-gray-700 cursor-pointer' onClick={() => handleOptionClick("Developers")}>
                      Developers
                    </div>
                    <div className='px-4 py-2 hover:bg-gray-700 cursor-pointer' onClick={() => handleOptionClick("Settings")}>
                      Settings
                    </div>
                    <div className='px-4 py-2 hover:bg-red-700 cursor-pointer' onClick={() => handleOptionClick("Logout")}>
                      Logout
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='border-b border-slate-600'></div>
          </>
        )}
      </div>

      <div className="flex flex-col flex-1 gap-y-2 overflow-y-auto" style={{ marginTop: searchIcon ? '0' : '80px' }}>
        {!searchIcon && (
          <>
            <List />
             
            <div className='px-4'>
              {loading ? (
                <p className="text-gray-400">Loading users...</p>
              ) : (
                otherUsers.map((user) => (
                  <MessageCards key={user._id} user={user} />
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
