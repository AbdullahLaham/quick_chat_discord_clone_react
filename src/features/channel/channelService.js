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
    const res = await API.put(`/channels/${id}`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const deleteChannel = async (id) => {
    const res = await API.delete(`/channels/${id}`);
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
    createChannel,

}


export default contactService;

