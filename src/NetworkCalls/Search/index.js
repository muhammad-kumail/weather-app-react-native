import jwtAxios, { apiKey } from '../BaseURL'
export const searchRegion = (searchQuery, cancelToken) => {
    return new Promise(async (resolve, reject) => {
        await jwtAxios.get(`/search.json?key=${apiKey}&q=${searchQuery}`, { cancelToken: cancelToken })
            .then(res => {
                resolve({ result: res.data, message: 'Region Found Successfull', success: true })
            }).catch(err => {
                reject({ result: err, message: 'Error in finding region', success: false })
            })
    })
}