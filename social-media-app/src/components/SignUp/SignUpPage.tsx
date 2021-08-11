import React from "react";
import { Grid, Hidden } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import logo from "../../assets/rev-logo.png";

const SignUpPage = () => {
    return (
        <>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                style={{ height: "100vh" }}
            >
                <Hidden lgUp mdUp>
                    <Grid item xs={12} style={{ textAlign: "center" }}>
                        <img src={logo} alt={""} />
                    </Grid>
                </Hidden>
                <Grid item xs={10} md={6} lg={4}>
                    <SignUpForm />
                </Grid>
                <Hidden only={["xs","sm"]}>
                    <Grid md={4} lg={4} style={{ textAlign: "center" }}>
                        <img src={logo} alt={""} />
                    </Grid>
                </Hidden>
            </Grid>
        </>
    );
};

export default SignUpPage;
