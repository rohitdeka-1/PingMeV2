import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Chat from "./components/Home/Chat/Chat";
import Profile from "./components/Home/Components/Profile";
import { setSocket, setOnlineUsers } from "./redux/slices/socketSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/chat",
    element: <Chat />
  }, 
  {
    path: "/profile/:userId",
    element: <Profile />
  }
])


function App() {
 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    if(authUser){
      const socket = io('https://pingme-hgvk.onrender.com',{
        query: {
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers',(onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });

      return ()=>socket.close();

    } else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser])

  return (

    <div className='h-screen '>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            theme: {
              primary: '#25d366',
            },
          },
          error: {
            duration: 4000,
          },
        }}
      />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
