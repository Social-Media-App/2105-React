import axios from 'axios';
import { url } from '../../redux/service'

// const instance = axios.create({
//     withCredentials:true
// })

export const sendEmail = async (username : string) => {
    
    const axiosResponse : any =  await axios.post(`${url}/login-service/send-email`,{
        'username':`${username}`
    });

    const axiosData : number = axiosResponse.data;
    
    return axiosData;

}


