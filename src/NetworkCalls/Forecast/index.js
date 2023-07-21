import jwtAxios, { apiKey } from '../BaseURL'
export const forecast = (searchQuery, days, aqi = 'no', alerts = 'no') => {
    return new Promise(async (resolve, reject) => {
        await jwtAxios.get(`/forecast.json?key=${apiKey}&q=${searchQuery}&days=${days}&aqi=${aqi}&alerts=${alerts}`)
            .then(res => {
                resolve({ result: res.data, message: 'Forecast Data fetch', success: true })
            }).catch(err => {
                reject({ result: err, message: 'Error in forecast data', success: false })
            })
    })
}