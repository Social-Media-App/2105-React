// SUPPORTING STATE MODELS
export interface IUser{
    userID: number;
    username: string;
    password: string;
    firstname: string;
    middlename: string;
    lastname: string;
    userEmail:string;
    profilePhoto: string;
    backgroundPhoto: string;
}

export interface IPost{
    postId: number;
    postWrittenContent: string;
    postImage: string;
    postOwner: IUser;
    datePosted: Date;
    groupId: number;
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

