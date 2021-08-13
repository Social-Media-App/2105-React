import axios from 'axios';
import { IUser } from '../../redux/stateStructures'
import { userServiceUrl } from '../../redux/service';


 export const axiosLogin = async (username:string, password:string) => {
    const axiosResponse : any = await axios.post(`${userServiceUrl}/login-service/login`, {
        "username": username,
        "password": password
    })
    const axiosData : IUser = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
}