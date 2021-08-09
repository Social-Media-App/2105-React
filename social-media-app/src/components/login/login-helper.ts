import axios from 'axios';
import { IUser } from '../../redux/stateStructures'


 export const axiosLogin = async (username:string, password:string) => {
    const axiosResponse : any = axios.post(`http://localhost:9082/user-service/login`, {
        "username": username,
        "password": password
    })
    const axiosData : IUser =  await axiosResponse.data;
    return axiosData;
}