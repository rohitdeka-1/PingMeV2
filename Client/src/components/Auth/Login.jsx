import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import api from "../../Axios/axiosInsatance.js"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../redux/slices/userSlice.js';

const Login = () => {

  const [user, setUser] = useState({
    identity: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);


    try {
      const response = await api.post("/auth/login", user);
      console.log('API Response:', response);

      if (response.data.success) {
        dispatch(setAuthUser(response.data))
        toast.success(response.data.message);
        navigate("/")
      }
    } catch (err) {
      console.error("Login Error:", err);
      console.error("Error Response:", err.response?.data);
      console.error("Error Status:", err.response?.status);


      const errorMessage = err.response?.data?.error ||
        err.response?.data?.message ||
        'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Welcome back!</h2>
            <p className="text-gray-400">Login to enter</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-800 w-[95%] mx-auto rounded-2xl shadow-2xl p-6 space-y-5 border border-gray-700">
            <div>
              <input
                onChange={(e) => setUser({ ...user, identity: e.target.value })}
                value={user.identity}
                autoComplete='current-username'
                type="text"
                className="w-full px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Email or username"
              />
            </div>

            <div>
              <input onChange={(e) => setUser({ ...user, password: e.target.value })}
                value={user.password}
                type="password"
                autoComplete="current-password"
                className="w-full px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#25d366] text-white py-3 px-4 rounded-full font-medium hover:bg-[#20bc5a] transition-colors duration-200 mt-6 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            <div className="text-center mt-4">
              <Link
                to="/forgot-password"
                className="text-sm text-[#25d366] hover:text-[#20bc5a] transition-colors"
              >
                Forgot password?
              </Link>
            </div>
          </form>

          <div className="text-center px-4 mt-5 text-gray-500 text-sm">
            <p>By signing in, you agree to our Terms & Privacy Policy</p>
          </div>

          <div className="flex items-center my-1">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-3">New to PingMe?</p>
            <Link
              to="/register"
              className="inline-block border-2 border-[#25d366] text-[#25d366] py-2 px-6 rounded-full font-medium hover:bg-[#25d366] hover:text-white transition-colors duration-200"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login