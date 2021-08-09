import axios from 'axios';


export const sendEmail = async (username : string) => {

    const axiosResponse : any = axios.get(`http://localhost:8080/user-service/${username}`);

    const axiosData : number = await axiosResponse.data;
    
    return axiosData;

}


