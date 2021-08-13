import React, { useState, SyntheticEvent } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";
import { sendEmail } from "./send-email-helper";
import SnackbarPaper from "../common/snackbar";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
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
    paper2: {
        width: "100%",
        height: "300px",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",

        "&:hover": {
            boxShadow: "0px 10px 36px rgba(131,153,167,0.7)",
        },
    },
}));

export default function SignIn() {
    const history = useHistory();
    const classes = useStyles();

    const [username, setUsername] = useState("");

    const handleUsername = (eve: any) => {
        setUsername(eve.target.value);
    };

    const handleEmail = async (eve: SyntheticEvent) => {
        eve.preventDefault();

        console.log("Username: " + username);
        const user = await sendEmail(username);
        console.log(user);
        // (user.userID===-1?setIsValid(-1):setIsValid(1));
    };

    return (
        <>
            <SnackbarPaper />
            <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={9} sm={7} md={5} lg={3} >
                    <Paper className={classes.paper2} variant="outlined">
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    Forgot password
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
                                        <Grid item xs></Grid>
                                        <Grid item>
                                            <Link to="/login">
                                                {"Return to login page"}
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
