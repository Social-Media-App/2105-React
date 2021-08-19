import React from "react";
import veggies from "./kitten.jpg";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { fontSize } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%"
    },
    avatar: {
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    header: {
        paddingTop: "20px",
        fontWeight: 600,
        marginBottom: "20px",
    },
    info: {
        paddingTop: "20px",
        fontWeight: 600,
        marginBottom: "20px",
        marginLeft: "20px",
        fontSize: "100px"
    },
    profilePicture: {

        height: "300px",
        width: "300px",
        borderRadius: "150px",
        margin: "0 auto",
        marginTop: "20px",
        align: "center"

    },
    userBackground: {
        height: "400px",
        width: "100%"
    },
    submit: {
        margin: theme.spacing(2, 0, 1),
    },
    button: {
        width: "25%",
        marginTop: "20px",
        marginBottom: "20px"
    },
    postbutton: {
        width: "80%",
    },
    holdbuttons: {
        width: "80%",
        display:"flex"
    },
    revealButton: {
        width: "100%",
    },
    paper2: {
        width: "50%",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: "10px",
        textAlign: "center",
        color: "black",
        margin: "0",
        position: "absolute",
        top: "45%",
        left: "40%",
        transform: "translate(-50%, -50%)"

    },
}));

function About() {
  const classes = useStyles();
  const history = useHistory();

  const gohome = () => {
    history.push("/home");
  };
  return (
    <div
      className="bg_image"
      style={{
        backgroundImage: "url(" + veggies + ")",
        backgroundSize: "cover",
        height: "100vh",
        textAlign: "center",
        color: "#f5f5f5",
        alignItems: "center",
        
      }}
    >
      <Paper className={classes.paper2} variant="outlined">
        <Typography
          align="center"
          noWrap={true}
          variant="h5"
          className={classes.info}
        
        >
        404 NOT FOUND
        </Typography>

      <h1>STILL GROWING</h1>
      <Button 
        className={classes.button}
        type="submit"
        variant="contained"
        color="primary"
        onClick={gohome}
        >
        Return to Home
      </Button>
    </Paper>
    </div>
  );
}

export default About;
