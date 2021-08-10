import React from "react";
import { useState, useEffect } from "react";
import { Fab, makeStyles, Modal, Button, Paper, Grid, TextField, IconButton, Input, InputLabel } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from "@material-ui/icons/Close";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { Storage } from "aws-amplify";

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    postTextInput: {
        fontSize: 14,
        width:'100%'
      },
    paper: {
        position: "absolute",
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    }
  }));



  interface IProps{
    userInState: any
  }

const initialFormData = {
    message: ""
};

    const CreatePost = () => {

    let myKey:any = null;

    let key:string = " ";
    
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [formData, updateFormData] = React.useState(initialFormData);

    const [text, setText] = React.useState('');

    const [images, setImages] = useState([])
    const [edit, setEdit] = useState(false)


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,
            [event.target.id]: event.target.value.trim(),
        });
    };


    const handleOpen = () => {
        setOpen(true);
    
    };

    const handleClose = () => {
        setOpen(false);
        
        fetchImages()
       
    };

    useEffect(() => {
        fetchImages()

      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])



    let file = {name:""};
    async function onPicChange(event: React.ChangeEvent<HTMLInputElement>) {
        if(event.target.files) {
            file = event.target.files[0];
            const result = await Storage.put(file.name, file);
            console.log('result: ',result);
            
            myKey=result;
            // const url:any = await Storage.get(result);
            console.log('myKey in onPicChange ', myKey["key"])

            key = myKey["key"];
            fetchImages()
        }
    }


    async function fetchImages(){
  
        //await axiosFetcher()
     

         console.log("myKey: " + myKey)
     
         console.log("fetching string key : " + key)

         let imageKeys = await Storage.list(`${key}`)
     
         console.log('imageKeys 1: ', imageKeys)
     
          imageKeys = await Promise.all(imageKeys.map(async (k:any) => {
     
                  const key = await Storage.get(k.key)
     
                  return key
              }))
     
          console.log('imageKeys 2: ', imageKeys)
          setImages(imageKeys) 
       }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(formData);
        // console.log(file.name);
        // dispatch(createPost(formData.message, file.name));
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
                <Grid>
                    <Button
                         //variant="contained"
                        style={{backgroundColor: "white",alignItems: "right"}}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </Button>
                    <h2>Create A Post!</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        className={classes.postTextInput}
                        label={`What's on your mind?`}
                        placeholder="Message"
                        fullWidth
                        id="message"
                        name="message"
                        multiline
                        rows={4}
                        defaultValue=""
                        variant="outlined"
                        // label="Message of Post"
                        // placeholder="Message"
                        // fullWidth
                        // id="message"
                        // name="message"
                        onChange={handleChange}
                        
                    />
                    <label htmlFor="icon-button-file">
                        <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                        >
                            <p>Add An Image</p>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <Input
                        // accept="image/*"
                        id="icon-button-file"
                        type="file"
                         style={{display:"none"}}
                        onChange={onPicChange}
                    />
                    {
                        images.map(image => (

                         // eslint-disable-next-line jsx-a11y/alt-text
                         <img src={image} key={image} style={{width:300, height:200, marginBottom:10}} />
                        ))
                     }
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
            <Fab color="primary" aria-label="add" className={classes.fab} onClick={handleOpen}>
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

export default CreatePost;