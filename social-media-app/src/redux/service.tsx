import axios from "axios";
import { IUser, ISignUpUser } from "./stateStructures";

//Used for ease of exporting, these are the different functions in the file
export const service = {
    axiosLogin,
    // forgotPassword,
    // updateProfileImg,
    // likePost,
    // unlikePost,
    register,
    // getAllPosts,
    // getAllUsers,
    // createPost,
    // update,
};

//Allowing use to send our credentials / cookies
const instance = axios.create({
    // withCredentials: true,
    headers: {
        'Access-Control-Allow-Origin': '*',
      }
  });


  //EXAMPLE OF A SERVICE REQUEST TO THE BACKEND
  async function axiosLogin(username:string, password:string) {
    const axiosResponse : any = await instance.post(url+'/login-service/login', {
        "username": username,
        "password": password
    })
    const axiosData : IUser = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
}

async function register(User: ISignUpUser) {
    const response = await instance.post(
        url+'/login-service/signup' ,
        {
            username: User.username,
            password: User.password,
            firstName: User.firstName,
            lastName: User.lastName,
            email: User.email,
            profilePicture: User.profilePicture,
            backgroundPicture: User.backgroundPicture,
        }
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData.username != null) {
        return axiosData;
    }
    throw new Error("Unable to Create Account");
}


export const url:string = `http://localhost:9082`;
export const userServiceUrl:string = `http://localhost:63147`;
export const postServiceUrl:string = `http://localhost:9008`;