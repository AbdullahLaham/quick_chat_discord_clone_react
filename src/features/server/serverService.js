import axios from "axios";
import API from '../MainApi'
import Cookies from 'cookies-js'

const getServers = async () => {
    const res = await API.get(`/servers`);
    console.log(res, 'servers');

    if (res.data) {
        return res.data;
    }

    return res.data;
}


const getCurrentServer = async (serverId) => {
    const res = await API.get(`/servers/${serverId}`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}



const createServer = async (data) => {
    const res = await API.post(`/servers/new-server`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const updateServer = async (data) => {
    const res = await API.post(`/servers/new-server`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const deleteServer = async (data) => {
    const res = await API.post(`/servers/new-server`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}
const leaveServer = async (data) => {
    const res = await API.post(`/servers/new-server`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const inviteCodeServer = async (data) => {
    const res = await API.post(`/servers/new-server`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const serverService = {
    getServers,
    getCurrentServer,
    createServer,
    updateServer,
    deleteServer,
    leaveServer,
    inviteCodeServer

}


export default serverService;

