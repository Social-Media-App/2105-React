import axios from 'axios';
import { url } from '../../redux/service'


export const sendEmail = async (username : string) => {

    const axiosResponse : any = axios.post(`${url}/user-service/send-email`,{
        username:`${username}`
    });
    
    const axiosData : number = await axiosResponse.data;
    
    return axiosData;

}


