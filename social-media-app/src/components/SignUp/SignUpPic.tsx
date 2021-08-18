import React from "react";
import {
    Paper,
    makeStyles,
    Hidden,
} from "@material-ui/core";
import img from "../../assets/signupimg.png";

const useStyles = makeStyles(() => ({
    paper: {
        // minHeight: "100%",
        width: "100%",
        height: "600px",
        borderRadius: "5px",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",

        "&:hover": {
            boxShadow: "0px 10px 36px rgba(131,153,167,0.7)",
        },
    },
    img: {
        height: "90%",
        width: "90%",
    },
}));

const SignUpPic = () => {
    const classes = useStyles();

    return (
        <>
            <Hidden smDown>
                <Paper className={classes.paper} variant="outlined">
                    <img src={img} alt="" className={classes.img} />
                </Paper>
            </Hidden>
        </>
    );
};

export default SignUpPic;
