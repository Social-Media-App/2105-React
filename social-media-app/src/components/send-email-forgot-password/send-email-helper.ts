import axios from 'axios';
import { userServiceUrl } from '../../redux/service'

// const instance = axios.create({
//     withCredentials:true
// })

export const sendEmail = async (username : string) => {
    
    const axiosResponse : any =  await axios.post(`${userServiceUrl}/login-service/send-email`,{
        'username':`${username}`
    });

    const axiosData : number = axiosResponse.data;
    
    return axiosData;

}


