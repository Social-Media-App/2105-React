import React, { SyntheticEvent } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link, Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useEffect } from "react";
import Snackbar from "../common/snackbar";
import { userLogin } from "../../redux/actons";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from '../../redux/store';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    paper2: {
        width: "100%",
        height: "400px",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",

        "&:hover": {
            boxShadow: "0px 10px 36px rgba(131,153,167,0.7)",
        },
    },
}));

interface IProps {
    // theme : any
}

export default function LoginPage(props: IProps) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const [isDesktop, setIsDesktop] = useState(window.innerWidth);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(true);
    const isLoggedIn = useSelector((state:RootState)=>state.auth.isLoggedIn);

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

    const handleLogin = async (eve: SyntheticEvent) => {
        eve.preventDefault();
        console.log("Username: " + username);
        console.log("Password: " + password);
        const user = await dispatch(userLogin(username, password));
        setIsValid(false);
    };

    if(isLoggedIn){
        console.log(isLoggedIn);
        return <Redirect to="/homepage" />;
    }

    return (
        <>
            <Snackbar />
            <Grid
                style={{ width: "100%" }}
                container
                justifyContent="center"
                spacing={3}
            >
                <Grid item xs={10} sm={8} md={5} lg={4}>
                    <Paper className={classes.paper2} variant="outlined">
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
                                        control={
                                            <Checkbox
                                                value="remember"
                                                color="primary"
                                            />
                                        }
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
                                            <Link to="/send-email">
                                                Forgot password?
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Link to="/register">
                                                {
                                                    "Don't have an account? Sign Up"
                                                }
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </form>
                            </div>
                        </Container>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
}
