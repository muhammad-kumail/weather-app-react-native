import axios from "axios";

export const apiKey = 'd81461b8f2eb46e08d3163645230907';

export default jwtAxios = axios.create({
    baseURL: 'https://api.weatherapi.com/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
})