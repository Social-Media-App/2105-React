import React from "react";
import {
    Paper,
    Slide,
    Button,
    InputLabel,
    makeStyles,
    Typography,
    CircularProgress,
    Input,
    TextField,
    Grid
} from "@material-ui/core";
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';


const useStyles = makeStyles(() => ({
    paper: {
        // minHeight: "100%",
        width: "100%",
        height: "500px",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",

        "&:hover": {
            boxShadow: "0px 24px 36px rgba(131,153,167,0.99)"
        }
    },
    header: {
        paddingTop: "10px",
        fontWeight: 600,
    },
    subheader: {
    marginBottom: 10,
    },
    button: {
        width: "100%",
    }
}));

const initialFormData = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
};

const SignUpForm = () => {
    const classes = useStyles();

    const [passwordMatchError, setPasswordMatchError] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);

    const [formData, updateFormData] = React.useState(initialFormData);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        updateFormData({
            ...formData,
            [event.target.id]: event.target.value.trim(),
        });
    };
    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData);
    };

    const handleVisibility = () => {
        setHidePassword(!hidePassword);
    }

    const passwordMatch = () => formData.password === formData.passwordConfirm;

    return (
        <>
            <Paper className={classes.paper}>
                <Typography
                    align="center"
                    noWrap={true}
                    variant="h5"
                    className={classes.header}
                >
                    Create A New Account
                </Typography>
                <Typography align="center" noWrap={true} variant="h6" className={classes.subheader}>
                    It's quick and easy.
                </Typography>
                <form onSubmit={handleFormSubmit}>
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={5} style={{textAlign: "center"}}>
                            <TextField
                                id="firstname"
                                label="First Name"
                                placeholder="First Name"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={5} style={{textAlign: "center"}}>
                            <TextField
                                id="lastname"
                                label="Last Name"
                                placeholder="Last Name"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                required
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
                                required
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
                                required
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={5} style={{textAlign: "center"}}>
                            <TextField
                                id="password"
                                label="Password"
                                placeholder="Password"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                type={hidePassword ? "password" : "input"}
                                required
                                InputProps={{
                                    endAdornment:
                                    <VisibilityIcon onClick={handleVisibility}></VisibilityIcon>,
                                }}
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={5} style={{textAlign: "center"}}>
                            <TextField
                                id="passwordConfirm"
                                label="Confirm Password"
                                placeholder="Password"
                                margin="dense"
                                variant="outlined"
                                fullWidth
                                type={hidePassword ? "password" : "input"}
                                required
                                InputProps={{
                                    endAdornment:
                                    <VisibilityIcon onClick={handleVisibility}></VisibilityIcon>,
                                    }}
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item xs={10}>
                            <Button type="submit" variant="contained" color="primary" className={classes.button}>
                                Sign Up!
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    <Grid item xs={10} style={{textAlign: "center"}}>
                        <Typography>
                            By clicking Sign Up, you agree to our Terms of Service, Data
                            Policy and Cookies Policy. You may receive SMS Notifications
                            from us and can opt out at any time.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{textAlign: "center"}}>
                        {/* <Link to="/">Already have an account?</Link> */}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default SignUpForm;
