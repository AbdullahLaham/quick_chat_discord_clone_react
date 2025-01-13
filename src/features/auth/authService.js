import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'


const getAllUsers = async () => {
    const res = await API.get(`/user/all-users`);
    console.log(res);
    
    return res.data;
}

const getCurrentUser = async () => {
    const res = await API.get(`/user/get-logged-user`);
    console.log(res);
    
    return res.data;
}


const fetchUserData = async (id) => {
    const res = await API.get(`/user/${id}`);
    console.log(res);
    
    return res.data;
}


const login = async (userData) => {
    const res = await API.post(`/auth/login`, userData);
    console.log(res);
    if (res.data) {
        localStorage.setItem('auth',  JSON.stringify(res.data))
    }

    return res.data;
}


const register = async (userData) => {
    const res = await API.post(`/auth/signup`, userData);
    console.log(res);
    if (res.data) {
        localStorage.setItem('auth',  JSON.stringify(res.data))
    }

    return res.data;
}




const logout = async (userData) => {
    const res = await API.post(`/auth/logout`, userData);
    console.log(res);
    if (res.data) {
        localStorage.removeItem('auth');
    }

    return res.data;
}



const forgotPassword = async (data) => {
    const res = await API.patch(`/auth/forgot-password-token`, data);
    console.log(res);
    if (res.data) {
        return res.data;
    }

    return res.data;
}

const resetPassword = async (data) => {
    const {token, password} = data ;
    const res = await API.put(`/user/reset-password/${token}`, {password});
    console.log(res);
    if (res.data) {
        return res.data;
    }

    return res.data;
}






const updateUser = async (data) => {

    const res = await API.put(`/user/edit-user`, data);
    
    if (res.data) {
        localStorage.setItem('auth',  JSON.stringify(res.data))
        return res.data;
    }

    
    return res.data;
}





const authService = {
    fetchUserData,
    login,
    logout,
    register,
    getAllUsers,
    getCurrentUser,
    updateUser,
    forgotPassword,
    resetPassword,
}


export default authService;

