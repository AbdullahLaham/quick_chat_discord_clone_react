import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getChannels = async () => {
    const res = await API.get(`/channels`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const getCurrentChannel = async (id) => {
    const res = await API.get(`/channels/get-current-channel/${id}`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}




const createChannel = async (data) => {
    const {url , ...other} = data;
    const res = await API.post(data?.url, other);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const updateChannel = async (data, id) => {
    const res = await API.put(`/${data?.url}`, data?.data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const deleteChannel = async (url) => {
    const res = await API.delete(`/${url}`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}









const contactService = {
    updateChannel,
    deleteChannel,
    getChannels,
    getCurrentChannel,
    createChannel,

}


export default contactService;

