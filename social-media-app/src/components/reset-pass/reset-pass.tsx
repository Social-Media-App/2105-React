import React, { useState, SyntheticEvent } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { axiosResetPassword } from './reset-pass-helper';

function Alert(props : any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link to="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  //initializes token and username from the uri
  const myUri = window.location.pathname;
  const myArr : string[] = myUri.split('/')
  myArr.shift();
  const token = myArr[1];
  const username = myArr[2];
  
  const [match, setMatch] = useState(true);
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openWrongToken, setOpenWrongToken] = React.useState(false);
  const [openSamePassword, setOpenSamePassword] = React.useState(false);

  const handleError = () => {
    setOpenError(true);
  };

  const handleErrorClose = (event : any , reason : string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenError(false);
  };
  const handleSuccess = () => {
    setOpenSuccess(true);
  };

  const handleSuccessClose = (event : any , reason : string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess(false);
  };
  const handleWrongTokenClose = (event : any , reason : string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenWrongToken(false);
  };
  const handleSamePasswordClose = (event : any , reason : string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSamePassword(false);
  };

  //passwords accepted from the input fields
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePassword = (eve: any) => {
    setPassword(eve.target.value);
  };

  const handleConfirmPassword = (eve: any) => {
    setConfirmPassword(eve.target.value);
  };

  const handleResetPassword = async (eve : SyntheticEvent) => {
    eve.preventDefault();
    if(password!==confirmPassword){
        setMatch(false);
        return;
    }
    console.log(token)
    console.log(username)
    console.log(password)
    setMatch(true);
    const resetSuccess : number = await axiosResetPassword(token, username, password);
    // setSuccess(resetSuccess);
    // let resetSuccess = -1;
    if(resetSuccess===-3)setOpenSamePassword(true);
    if(resetSuccess===-2)setOpenWrongToken(true);
    if(resetSuccess===-1)handleError();
    if(resetSuccess===1)handleSuccess();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Reset password
        </Typography>
        <form className={classes.form} noValidate>
        {match===false?<h3 style={{color:'red', textAlign:'center'}}>Passwords do not match!</h3>:null}
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={handlePassword}
            autoComplete="current-password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPassword}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleResetPassword}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
            </Grid>
            <Grid item>
              <Link 
              to='/login' 
              >
                {"Return to login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar open={openError} autoHideDuration={3000} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error">
          An error occured!
        </Alert>
      </Snackbar>
      <Snackbar open={openWrongToken}autoHideDuration={3000} onClose={handleWrongTokenClose}>
        <Alert onClose={handleWrongTokenClose} severity="error">
          Token ented is invalid!
        </Alert>
      </Snackbar>
      <Snackbar open={openSamePassword} autoHideDuration={3000} onClose={handleSamePasswordClose}>
        <Alert onClose={handleSamePasswordClose} severity="error">
          Password matches previous password! Please select a new password.
        </Alert>
      </Snackbar>
      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success">
          Password reset successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}