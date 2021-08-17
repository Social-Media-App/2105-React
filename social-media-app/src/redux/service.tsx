import axios from "axios";
import { IUser, IPost, IComment } from "./stateStructures";
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
  getAllPosts,
  // getAllUsers,
  createPost,
  // update,
  displayComments,
  addComment,
};

//Allowing use to send our credentials / cookies
const instance = axios.create({
  // withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

//EXAMPLE OF A SERVICE REQUEST TO THE BACKEND
async function axiosLogin(username: string, password: string) {
  const axiosResponse: any = await instance.post(url + "/login-service/login", {
    username: username,
    password: password,
  });
  const axiosData: IUser = axiosResponse.data;
  console.log(axiosData);
  return axiosData;
}

async function register(User: IUser) {
  const response = await instance.post(url + "/login-service/signup", {
    username: User.username,
    password: User.password,
    firstName: User.firstName,
    lastName: User.lastName,
    email: User.email,
    profilePicture: User.profilePicture,
    backgroundPicture: User.backgroundPicture,
  });
  const axiosData = response.data;
  console.log(axiosData);
  if (axiosData.username != null) {
    return axiosData;
  }
  throw new Error("Unable to Create Account");
}

//DISPLAY COMMENTS (400 ERROR)
async function displayComments(Post: IPost, postId: number) {
  const response: any = await instance.get(url + "/comment/getcomment");
  {
    postId = Post.postId!;
  }
  const axiosData = response.data;

  console.log("axiosdata: ", axiosData);
}

//ADD A COMMENT (500 ERROR)
async function addComment(Comment: IComment, Post: IPost) {
  console.log(Comment);
  console.log("checkpoint 1");
  const axiosResponse: any = await axios.post(url + "/comment/newcomment", {
    comment: Comment.comment,
    userId: Comment.userId.userId,
    post: {
      postId: Post.postId,
    },
  });
  const axiosData = axiosResponse.data;
  console.log(axiosData);
}

async function getAllPosts() {
  const axiosResponse: any = await instance.get(url + "/post/getallposts");
  const axiosData: IPost[] = axiosResponse.data;
  console.log(axiosData);
  return axiosData;
}

async function createPost(post: IPost) {
  console.log("post: " + post.picture);
  const axiosResponse: any = await instance.post(url + "/post//createpost", {
    content: post.content,
    picture: post.picture,
    userId: post.userId,
    postOwner: post.postOwner,
  });

  const axiosData: IPost = axiosResponse.data;
  console.log(axiosData);
  return axiosData;
}

export const url: string = `http://localhost:9082`;
export const userServiceUrl: string = `http://localhost:63147`;
export const postServiceUrl: string = `http://localhost:9008`;
