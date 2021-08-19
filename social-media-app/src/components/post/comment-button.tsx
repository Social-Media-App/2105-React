import React from "react";
import {
    IconButton,
    Grid,
    Paper,
    Button,
    TextField,
    Input,
    makeStyles,
    Modal
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import CloseIcon from "@material-ui/icons/Close";
import {useDispatch} from 'react-redux'
import {useState} from 'react'
import { IUser, IPost} from '../../redux/stateStructures'
import {makeComment} from '../../redux/actons'

const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    form: {
        textAlign: "center",
    },
    img: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
}));

export default function CommentButton(props:{post:IPost, user:IUser}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");

    const [open, setOpen] = React.useState(false);

    const handleSubmit = (event: any) => { 
        // console.log("handling submit"+props.user);
        dispatch(makeComment(comment,props.post,props.user))
        handleClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value.trim())
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const body = (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ height: "80vh" }}
        >
            <Paper elevation={10} className={classes.paper}>
                <Grid container justifyContent="flex-end">
                    <Grid item xs={1}>
                        <Button
                            style={{
                                backgroundColor: "white",
                                minWidth: "10px",
                            }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
                <h2 style={{ marginTop: 0 }}>Commenting</h2>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <TextField
                        label="What's on your mind?"
                        placeholder="Message"
                        fullWidth
                        id="message"
                        name="message"
                        multiline
                        rows={4}
                        variant="outlined"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                    >
                        Create Post
                    </Button>
                </form>
            </Paper>
        </Grid>
    );
    return (
        <>
            <IconButton
                onClick={handleOpen}
                aria-label="add to favorites"
                style={{ paddingRight: 0, paddingLeft: 0, paddingBottom: 10 }}
            >
                <ChatIcon style={{ fill: "#666666" }} />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </>
    );
}
