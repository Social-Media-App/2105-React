import axios from 'axios';
import { userServiceUrl } from '../../redux/service';


export const axiosResetPassword = async (token : string, username:string, password:string) => {
    const axiosResponse : any = await axios.put(`${userServiceUrl}/login-service/reset-pass`, {
        "resetToken": token,
        "username": username,
        "password": password
    })
    const axiosData : number = axiosResponse.data;
    console.log(axiosData)
    return axiosData;
}