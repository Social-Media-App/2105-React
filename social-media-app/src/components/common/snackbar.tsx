import React from "react";
import { Paper, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    paper: {
        width: "75%",
        height: 90,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
        marginTop: 50,
        marginBottom: 50,
        backgroundColor: "#dc004e",
    },
    text: {
        color: "white",
    }
}));

const SnackbarPaper = () => {
    const classes = useStyles();
    return (
        <>
            <Paper elevation={6} color="primary" className={classes.paper}>
                <Typography variant="h2" className={classes.text} >SnackBar!</Typography>
            </Paper>
        </>
    );
};

export default SnackbarPaper;
