import axios from "axios";

export const apiKey = 'df5cfeca9c8648429dd153230231608';

export default jwtAxios = axios.create({
    baseURL: 'https://api.weatherapi.com/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
})