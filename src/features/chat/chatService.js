import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getMessages = async (chatId) => {
    const res = await API.get(`/messages/${chatId}`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}




const addMessage = async (data) => {
    const res = await API.post(`/messages/`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}


const createChat = async (data) => {
    const res = await API.post(`/chat`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}



const getUserChats = async (userId) => {
    const res = await API.get(`/chat/${userId}`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}





const contactService = {
    addMessage,
    getMessages,
    createChat,
    getUserChats

}


export default contactService;

