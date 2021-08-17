// SUPPORTING STATE MODELS
export interface IUser{
    userId?: number;
    username: string;
    password: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    email:string;
    profilePicture?: string;
    backgroundPicture?: string;
}

export interface IPostDetails{
    post: IPost,
    comments: IComment[],
    likeNumber: ILike[]
}

export interface IPost{
    postId?: number;
    content?: string;
    picture?: string;
    date?: string;
    groupId?: number;
    autoDeleteDate?: string;
    userId: number;
    postOwner: IUser;
}

export interface IComment{
    commentId?: number;
    post: IPost;
    comment: string;
    userId: IUser;
}

export interface ILike{
    likesId: number;
    userId: number;
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

