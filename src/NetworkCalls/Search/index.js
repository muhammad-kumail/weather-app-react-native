import axios from 'axios'
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
export const geoLocation = () => {
    return new Promise(async (resolve, reject) => {
        await axios.get('https://geolocation-db.com/json/').then(res => {
            axios.get(`https://api.ipgeolocation.io/ipgeo?apiKey=2cda7f5ef3ee4be1bf759ba15e5d668e&ip=${res.data?.IPv4}`).then(res =>{
                resolve({ result: res.data , message: 'Fetch current location successfull', success: true })
            }).catch(err=>{
                reject({ result: err , message: 'Fetch current location failed (1)', success: false })
            })
          }).catch(err=>{
            reject({ result: err , message: 'Fetch current location failed', success: false })
          });
    })
}
