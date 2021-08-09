import axios from 'axios';


export const axiosResetPassword = async (token : string, username:string, password:string) => {
    const axiosResponse : any = axios.put(`http://localhost:9082/user-service/reset-pass`, {
        "token": token,
        "username": username,
        "password": password
    })
    const axiosData : number =  await axiosResponse.data;
    return axiosData;
}