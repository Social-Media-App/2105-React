import axios from "axios";
import { IUser, ISignUpUser, IPost, IComment } from "./stateStructures";
import { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

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
    displayComments,
    addComment
};

//Allowing use to send our credentials / cookies
const instance = axios.create({
    withCredentials: true
  });


  //EXAMPLE OF A SERVICE REQUEST TO THE BACKEND
  async function axiosLogin(username:string, password:string) {
    const axiosResponse : any = await axios.post(`${userServiceUrl}/login-service/login`, {
        "username": username,
        "password": password
    })
    const axiosData : IUser = axiosResponse.data;
    console.log(axiosData);
    return axiosData;
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

//DISPLAY COMMENTS (400 ERROR)
async function displayComments(Post: IPost, postId: number) {
     const response: any = await instance.get(`${postServiceUrl}/comment/getcomment`); {
       postId = Post.postId 
    };
    const axiosData = response.data;

    console.log("axiosdata: ", axiosData);
    
}

//ADD A COMMENT (500 ERROR)
async function addComment(Comment: IComment, Post: IPost){
    const axiosResponse : any = await axios.post(`${postServiceUrl}/comment/newcomment`, 
    {
        commentId: Comment.commentId,
        Post: {
            postId : Post.postId,
            userId : Post.postOwner.userId,
            content : Post.content,
            picture : Post.picture
        },
        userId: Comment.userId.userId,
        comment: Comment.comment      
    } 
);
    const axiosData = axiosResponse.data;
    console.log(axiosData);

}


export const url:string = `http://localhost:9082`;
export const userServiceUrl:string = `http://localhost:9005`;
export const postServiceUrl:string = `http://localhost:9008`;