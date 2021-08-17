// SUPPORTING STATE MODELS
export interface IUser{
    userId: number;
    username: string;
    password: string;
    firstName: string;
    middleName: string;
    lastName: string;
    email:string;
    profilePicture: string;
    backgroundPicture: string;
}

export interface ISignUpUser{
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email:string;
    profilePicture: string;
    backgroundPicture: string;
}

export interface IPost{
    postId: number;
    content: string;
    picture: string;
    postOwner: IUser;
    datePosted: Date;
    groupId: number;
}

export interface ICreatePost{
    content: string;
    postImage: string;
    userId: number;
    postOwner: IUser;
}

export interface IComment{
    commentId: number;
    commentedPost: IPost;
    commentContent: string;
    commentAuthor: IUser;
}

export interface IReply{
    replyId: number;
    replyingToComment: IComment;
    replyContent: string;
    replyAuthor: IUser;
}

export interface IGroup{
    groupId: number;
    groupName: string;
    groupCreator: IUser;
    groupMembers: IUser[];
}

enum EventStatus {
    Open = "Open",
    Closed = "Closed",
}

export interface IEvent{
    eventId: number;
    eventDate: Date;
    eventName: string;
    attendingUsers: IUser[];
    status: EventStatus;
    location: string;
}

