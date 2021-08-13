import React, { useState, SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { sendEmail } from "./send-email-helper";
import { useEffect } from "react";
// import { sendEmail } from './send-email-helper'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="#">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(0);

  useEffect(()=>{

  },[isValid])

  const handleUsername = (eve: any) => {
    setUsername(eve.target.value);
  };

  const handleEmail = async (eve: SyntheticEvent) => {
    eve.preventDefault();

    console.log("Username: " + username);
    const user : any = await sendEmail(username);
    (user===-1?setIsValid(-1):setIsValid(1));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Forgot password
        </Typography>
        {isValid===1?<h5 style={{color:'green'}}>Reset email was sent</h5>:null}
        {isValid===-1?<h5 style={{color:'red'}}>Username not found</h5>:null}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={username}
            onChange={handleUsername}
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleEmail}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link 
              to='/login' 
              >
                {"Return to login page"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
