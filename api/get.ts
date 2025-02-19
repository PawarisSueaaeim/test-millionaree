import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_PHOTO_API;

export const getPhotoList = async (page: string|null, limit: string|null) => {
    try {
        const response = await axios.get(`${baseURL}v2/list?page=${page}&limit=${limit}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};