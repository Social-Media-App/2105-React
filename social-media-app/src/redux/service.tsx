import axios from "axios";

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
  async function login(username: String, password: String) {
    const response = await instance.post(
        `http://localhost:9002/instafriends/api/user/login` ,
        {
            username: username,
            password: password
        }
    );
    const axiosData = response.data;
    console.log(axiosData);
    if(axiosData.username != null) {
        return axiosData;
    }
    throw new Error("Incorrect Password");
}