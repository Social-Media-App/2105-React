import axios from "axios";
import { IUser, IPost, IPostDetails, ILike } from "./stateStructures";

//Used for ease of exporting, these are the different functions in the file
export const service = {
    axiosLogin,
    // forgotPassword,
    // updateProfileImg,
    likePost,
    // unlikePost,
    register,
    getAllPosts,
    getAllUsers,
    createPost,
    updateUser,
    getJwt
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

async function getJwt(username:string, password:string) {
    const axiosResponse : any = await instance.post(url+'/login-service/authenticate', {
        "username": username,
        "password": password
    })
    const axiosData : any = axiosResponse.data;
    console.log(axiosData.jwtToken);
    return axiosData.jwtToken;
}

async function register(User: IUser) {
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

async function getAllPosts() {
    const axiosResponse : any = await instance.get(url+'/post/getpostsdetails')
    const axiosData : IPostDetails[] = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
}

async function getAllUsers(varToken:string) {
    const axiosResponse : any = await instance.get(url+'/user-service/getallusers', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + varToken
        }})
    const axiosData : IUser[] = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
}

async function createPost(post:IPost) {
    console.log("post: "+post.picture);
    const axiosResponse : any = await instance.post(url+'/post/createpost', {
        content: post.content,
        picture: post.picture,
        userId: post.userId,
        postOwner: post.postOwner,
    })

    const axiosData : IPost = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
}

async function likePost(like:ILike) {
    const axiosResponse : any = await instance.post(url+'/likes/makeLike', {
        userId: like.userId,
        post: like.post
    })
    const axiosData : any = axiosResponse.data;
    console.log(axiosData);
    if(axiosData){
        return axiosData;
    }
    throw new Error("Unable to like");
}
async function updateUser(user:IUser, varToken:string) {
/*     console.log("creatingpostiwht"+post.content);
    console.log("creatingpostiwht"+post.postImage);
    console.log("creatingpostiwht"+post.userId);
    console.log("creatingpostiwht"+post.postOwner); */

    const axiosResponse : any = await instance.post(url+'/user-service/update', {
        userId: user.userId,
        username: user.username,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        backgroundPicture: user.backgroundPicture,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + varToken
      }})

    const axiosData : IUser = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
}


export const url:string = `http://localhost:9082`;
export const userServiceUrl:string = `http://localhost:63147`;
export const postServiceUrl:string = `http://localhost:9008`;