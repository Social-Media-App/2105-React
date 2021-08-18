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
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Storage } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import {RootState} from '../../redux/store';
import { updateUser } from "../../redux/actons";
import { IUser } from "../../redux/stateStructures"


const useStyles = makeStyles((theme) => ({
    fab: {
        position: "fixed",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    paper: {
        position: "absolute",
        width: 600,
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

    img1: {
        width: 300,
        height: 200,
        marginBottom: 50,
    },
}));


export default function UpdateInfo() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [imageURI, setimageURI] = React.useState("");
    const [backImageURI, setBackImageURI] = React.useState("");    
    const [imgKey, setImgKey] = React.useState("");
    const [backImg, setBackImg] = React.useState("");
    const viewinguser = useSelector((state:RootState) => state.auth.user);
    const dispatch = useDispatch();
    const jwt = useSelector((state:RootState) => state.auth.jwt);
    const user = useSelector((state:RootState) => state.auth.user)
    
    
    const initialFormData = {
        username: user.username,
        firstname: user.firstName,
        middlename: user.middleName,
        lastname: user.lastName,
        email: user.email,
    };
    const [formData, updateFormData] = React.useState(initialFormData);
    
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        updateFormData(initialFormData);
        setimageURI("");
        setBackImageURI("");
        setImgKey(user.profilePicture!);
        setBackImg(user.backgroundPicture!);
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

            console.log('proflie image connected!!! file-name: ', file.name)
        }
    }

    let backImgfile = { name: "" };
    async function onBackPicChange(event: React.ChangeEvent<HTMLInputElement>) {
        console.log('should here!!')
        if (event.target.files) {
            backImgfile = event.target.files[0];
            const backResult = await Storage.put(backImgfile.name, backImgfile);
            setBackImageURI(URL.createObjectURL(backImgfile));
            setBackImg(backImgfile.name);

            console.log('background connected !!!backFile-name: ', backImgfile.name)

        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log("formData: ", formData);
        console.log("imgKey: ", imgKey);
        console.log("backimgKey: ", backImg);
        const user:IUser = {
            userId: viewinguser.userId,
            firstName: formData.firstname,
            middleName: formData.middlename,
            password: " ",
            lastName: formData.lastname,
            username: formData.username,
            email: formData.email,
            profilePicture: imgKey,
            backgroundPicture: backImg,
        }
        console.log(user);
        dispatch(updateUser(user, jwt));
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
                            style={{ backgroundColor: "white" }}
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Button>
                    </Grid>
                </Grid>
                <h2 style={{ marginTop: 0, textAlign: "center" }}>Update Info</h2>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} justifyContent="center" alignItems="center">
                        <Grid item xs={4} style={{textAlign: "center"}}>
                            <TextField
                                id="firstname"
                                label="First Name"
                                placeholder="First Name"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={4} style={{textAlign: "center"}}>
                            <TextField
                                id="middlename"
                                label="Middle Name"
                                placeholder="Middle Name"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={4} style={{textAlign: "center"}}>
                            <TextField
                                id="lastname"
                                label="Last Name"
                                placeholder="Last Name"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={10} style={{textAlign: "center"}}>
                            <TextField
                                id="username"
                                label="Username"
                                placeholder="Username"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={10} style={{textAlign: "center"}}>
                            <TextField
                                id="email"
                                label="Email"
                                placeholder="Email"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                />
                        </Grid>



                        <div>
                        <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <p>Profile Image</p>
                            <PhotoCamera style={{ padding: "10px"}} />
                        </IconButton>
                    </label>
                    <Input
                        id="icon-button-file"
                        type="file"
                        onChange={onPicChange}
                        style={{ display: "none"}}
                    />
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    {imageURI && <img src={imageURI}  style={{width:100, height:100, marginBottom:0}}/>}
                    </div>




                    <div>
                    <label htmlFor="back-icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <p>Background Image</p>
                            <PhotoCamera style={{ padding: "10px" }} />
                        </IconButton>
                    </label>                 
                    <Input
                        id="back-icon-button-file"
                        type="file"
                        onChange={onBackPicChange}
                        style={{ display: "none" }}
                    />
                    {/* eslint-disable-next-line jsx-a11y/alt-text */}
                    {backImageURI && <img src={backImageURI}  style={{width:100, height:100, marginBottom:0}}/>}
                    </div>


                    
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        fullWidth
                    >
                        Update!
                    </Button>
                    </Grid>
                </form>
            </Paper>
        </Grid>
    );

    return (
        <>
            <Fab
                color="primary"
                aria-label="edit"
                className={classes.fab}
                onClick={handleOpen}
            >
                <EditIcon />
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
