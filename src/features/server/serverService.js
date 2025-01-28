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

const updateServer = async (data, id) => {
    const res = await API.put(`/servers/${id}`, data);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}
const getCurrentServerMember = async (id) => {
    const res = await API.put(`/servers/current-member/${id}`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const deleteServer = async (id) => {
    const res = await API.delete(`/servers/${id}/new-server`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}
const leaveServer = async (id) => {
    const res = await API.delete(`/servers/${id}/leave-server`);
    console.log(res);

    if (res.data) {
        return res.data;
    }

    return res.data;
}

const inviteCodeServer = async (data) => {
    const res = await API.put(`/servers/`, data);
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
    inviteCodeServer,
    getCurrentServerMember,

}


export default serverService;

