import axios from "axios";
import { IUser, ISignUpUser } from "./stateStructures";

//Used for ease of exporting, these are the different functions in the file
export const service = {
    login,
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
    withCredentials: true
  });


  //EXAMPLE OF A SERVICE REQUEST TO THE BACKEND
  async function login(username: String, password: String):Promise<IUser|null> {
    const response = await instance.post(
        "http://localhost:9002/instafriends/api/user/login" ,
        {
            username: username,
            password: password
        }
    );
    const axiosData:IUser = response.data;
    console.log(axiosData);
    if(axiosData.username != null) {
        return axiosData;
    }
    return null;
}

async function register(User: ISignUpUser) {
    const response = await instance.post(
        `http://localhost:9005/login-service/signup` ,
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



export const url:string = `http://localhost:9082`