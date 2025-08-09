import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    timeout: 10000,
    withCredentials: true,  
    headers: {
        'Content-Type': 'application/json',
    }
});

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401 && 
            !window.location.pathname.includes('/login') &&
            !error.config?.url?.includes('/auth/login')) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;

