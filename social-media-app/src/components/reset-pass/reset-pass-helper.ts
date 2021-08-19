import axios from 'axios';
import { url } from '../../redux/service';


export const axiosResetPassword = async (token : string, username:string, password:string) => {
    const axiosResponse : any = await axios.post(`${url}/login-service/resetpw`, {
        "resetToken": token,
        "username": username,
        "password": password
    })
    const axiosData : number = axiosResponse.data;
    console.log(axiosData)
    return axiosData;
}