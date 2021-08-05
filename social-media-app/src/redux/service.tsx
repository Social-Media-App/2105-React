import axios from "axios";
import { IUser } from "./stateStructures";

//Used for ease of exporting, these are the different functions in the file
export const service = {
    login,
    // forgotPassword,
    // updateProfileImg,
    // likePost,
    // unlikePost,
    // register,
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
  async function login(username: String, password: String):Promise<IUser> {
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