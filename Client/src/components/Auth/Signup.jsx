import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import api from "../../Axios/axiosInsatance.js"
import { useState } from 'react';

const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }) 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sending signup data:', user);

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    try {
        const { confirmPassword, ...userDataToSend } = user;

      const response = await api.post("/auth/signup", userDataToSend);

      if (response.data.success) {
        navigate("/login")
        toast.success("Signup successful!");
        setUser({
          fullname: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: ""
        });
      }
    } catch (err) {
      console.log("Error:", err);
      toast.error(err.response?.data?.error || err.response?.data?.message || 'Signup failed');
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          <div className="text-center mb-8">
            <h2 className="text-2xl font-medium text-white mb-2">Welcome To PingMe!</h2>
            <p className="text-gray-400">Register</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-gray-800 w-[95%] mx-auto rounded-2xl shadow-2xl p-6 space-y-4 border border-gray-700">

            <div>
              <input value={user.fullname}
                onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                autoComplete="current-fullname"
                type="text"
                className="w-full px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Full Name"
              />
            </div>

            <div>
              <input value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                autoComplete="current-username"
                type="text"
                className="w-full px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Username"
              />
            </div>
            
            <div>
              <input value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                autoComplete="current"
                type="email"
                className="w-full px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Email"
              />
            </div>

            <div className='flex gap-x-1'>
              <input value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                autoComplete="current"
                type="password"
                className="w-full flex-1 px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Password"
              />

              <input value={user.confirmPassword}
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                autoComplete="current"
                type="password"
                className="w-full flex-1 px-4 py-3 border-b-2 border-gray-600 focus:border-[#25d366] outline-none transition-colors bg-transparent text-white placeholder-gray-400"
                placeholder="Confirm password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#25d366] text-white py-3 px-4 rounded-full font-medium hover:bg-[#20bc5a] transition-colors duration-200 mt-6 shadow-lg"
            >
              Register
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
          
          <div className="text-center mt-5 px-4 text-gray-500 text-sm">
            <p>By signing in, you agree to our Terms & Privacy Policy</p>
          </div>

          <div className="flex items-center my-1">
            <div className="flex-1 border-t border-gray-600"></div>
            <span className="px-4 text-gray-400 text-sm">or</span>
            <div className="flex-1 border-t border-gray-600"></div>
          </div>

          <div className="text-center">
            <p className="text-gray-400 mb-3">Already have an account?</p>
            <Link
              to="/login"
              className="inline-block border-2 border-[#25d366] text-[#25d366] py-2 px-6 rounded-full font-medium hover:bg-[#25d366] hover:text-white transition-colors duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup