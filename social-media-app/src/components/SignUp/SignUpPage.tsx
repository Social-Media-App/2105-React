import React from "react";
import { Grid } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import SnackbarPaper from "../common/snackbar";
import SignUpPic from "./SignUpPic";

const SignUpPage = () => {
    return (
        <>
            <SnackbarPaper />
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
                spacing={3}
            >
                <Grid item xs={11} md={5} lg={4}>
                    <SignUpForm />
                </Grid>
                <Grid item xs={10} md={5} lg={4}>
                    <SignUpPic />
                </Grid>
            </Grid>
        </>
    );
};

export default SignUpPage;
