import React from "react";
import {
    Fab,
    makeStyles,
    Modal,
    Button,
    Paper,
    Grid,
    TextField,
    IconButton,
    Input,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Storage } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../redux/actons";
import { RootState } from "../../redux/store";
import { IPost, IUser } from "../../redux/stateStructures";

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

const initialFormData = {
    message: "",
};

export default function CreatePostIcon() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const user: IUser = useSelector((state: RootState) => state.auth.user);

    const [open, setOpen] = React.useState(false);
    const [formData, updateFormData] = React.useState(initialFormData);
    const [imageURI, setimageURI] = React.useState("");
    const [imgKey, setImgKey] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        updateFormData(initialFormData);
        setimageURI("");
        setImgKey("");
        setOpen(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,
            [event.target.id]: event.target.value.trim(),
        });
    };

    let file = { name: "" };
    async function onPicChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) {
            file = event.target.files[0];
            const result = await Storage.put(file.name, file);
            setimageURI(URL.createObjectURL(file));
            setImgKey(file.name);
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("formData: ", formData);
        console.log("imgKey: ", imgKey);
        const post: IPost = {
            content: formData.message,
            picture: imgKey,
            userId: user.userId!,
            postOwner: user,
        };
        if (!formData.message && !imgKey) {
            handleClose();
            return;
        }
        console.log(post);
        dispatch(createPost(post));
        handleClose();
    }

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
                <h2 style={{ marginTop: 0 }}>Create A Post!</h2>
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
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <p>Add An Image</p>
                            <PhotoCamera style={{ padding: "10px" }} />
                        </IconButton>
                    </label>
                    <Input
                        id="icon-button-file"
                        type="file"
                        onChange={onPicChange}
                        style={{ display: "none" }}
                    />
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    {imageURI && <img src={imageURI} className={classes.img} />}
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
            <Fab
                color="primary"
                aria-label="add"
                className={classes.fab}
                onClick={handleOpen}
            >
                <AddIcon />
            </Fab>
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