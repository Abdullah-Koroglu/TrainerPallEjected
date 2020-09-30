import axios from 'axios'
import { AsyncStorage } from 'react-native'

 const instance = axios.create({
     baseURL:"http://3.19.139.34:3000"
 })
 
 instance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
       //     console.log(config)
        }
       // console.log('token :',token)
        return config
    },
    error => {
        Promise.reject(error)
    });


 export default instance