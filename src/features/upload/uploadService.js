import API from "../MainApi"

export const uploadImage = async (data) => {
    try {
        const res = await API.put('/server/upload', data);

        if (res.data) {
            localStorage.setItem('images', JSON.stringify(res.data));
        }
    
        return res.data;

    } catch (error) {
        console.log(error);
    }
}



export const deleteImage = async (id) => {
    try {
        const res = await API.delete(`/listings/delete-image/${id}`);
        if (res.data) {
            localStorage.setItem('images', JSON.stringify(res.data))
        }
    } catch (error) {
        console.log(error);
    }
}

export default { uploadImage, deleteImage }

