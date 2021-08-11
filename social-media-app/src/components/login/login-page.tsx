import React, { SyntheticEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/rev-logo-2.png";
import { axiosLogin } from './login-helper';

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

interface IProps {
  // theme : any
}

export default function LoginPage(props: IProps) {
  const classes = useStyles();

  const [isDesktop, setIsDesktop] = useState(window.innerWidth);
  const [isValid, setIsValid] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (eve: any) => {
    setUsername(eve.target.value);
  };

  const handlePassword = (eve: any) => {
    setPassword(eve.target.value);
  };
  
  useEffect(() => {
    function handleResize() {
      setIsDesktop(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
  }, [isDesktop]);

  const handleLogin = async (eve : SyntheticEvent) => {
    eve.preventDefault();

    console.log("Username: " + username);
    console.log("Password: " + password);
    // const user = await axiosLogin(username, password);
    // (user.userID===-1?setIsValid(-1):setIsValid(1));
  }

  return (
    <>
      {isDesktop > 1200 ? (
        <Grid style={{ width: "100%" }} container justifyContent="center" spacing={3}>
          <Grid item xs={7}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
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
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                  <Grid container>
                    <Grid item xs>
                      <Link to='/send-email'>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link 
                      to='/register'
                      >
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </Grid>
          <Grid item xs={5}>
            <img
              style={{ maxWidth: "500px", marginTop: "150px", alignItems:'center' }}
              src={logo}
              alt={""}
            />
          </Grid>
        </Grid>
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <img
              style={{ maxWidth: "150px", marginTop: "0px" }}
              src={logo}
              alt={""}
            />
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
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
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link 
                  to='/send-email' 
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link 
                  to='/register' 
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      )}
    </>
  );
}
