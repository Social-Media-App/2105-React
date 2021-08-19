import React from "react";
import { CardContent, Box, Button, Grid, TextField } from "@material-ui/core";
import { IPostDetails } from "../../redux/stateStructures";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getComments } from "../../redux/actons";
import { service } from "../../redux/service";
import { IComment } from "../../redux/stateStructures";

export default function Comments(props: { post: IPostDetails }) {
    // const dispatch = useDispatch();
    // const [coms, setComs] = useState([] as IComment[]);

    // const getComs = async () => {
    //     // const res: IComment[] = await service.getComments(props.post);
    //     // setComs(res);
    // };

    // useEffect(() => {
    //     // dispatch(getComments(props.post));
    //     console.log(props.post.comments);
        
    //     getComs();
    // },[]);

    return (
        <CardContent>
            {props.post.comments.map((comment) => (
                <div key={comment.commentId}>
                    <Grid item>
                        <h4 style={{ margin: 0, textAlign: "left" }}>
                            {comment.commentedBy.username}
                        </h4>
                        <p style={{ textAlign: "left", marginTop: 0}}>{comment.comment}</p>
                    </Grid>
                </div>
            ))}
        </CardContent>
    );
}
