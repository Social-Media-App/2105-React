import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
// import { Storage } from "aws-amplify";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    position: "sticky",
    top: "74px",
    minWidth: "275",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

interface IProps {
  userInState: any;
}

const Photo = (props: IProps) => {
  const classes = useStyles();

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  let myKey: any = props.userInState.currentUser.profilePhoto;

  async function fetchImages() {
    await axiosFetcher();
    console.log("myKey: " + myKey);
    let imageKeys = await Storage.list(`${myKey}`);
    console.log("imageKeys 1: ", imageKeys);

    imageKeys = await Promise.all(
      imageKeys.map(async (k: any) => {
        const key = await Storage.get(k.key);
        return key;
      })
    );

    console.log("imageKeys 2: ", imageKeys);
    setImages(imageKeys);
  }

  let axiosFetcher = async () => {
    const axiosPayLoad = await axios.get(
      `http://localhost:8080/RevatureSocialNetwork/api/user/getphoto/${props.userInState.currentUser.username}`
    );

    const axiosData = axiosPayLoad.data;

    console.log("axiosdata: ", axiosData);

    myKey = axiosData;
  };

  async function onChange(e: any) {
    const file = e.target.files[0];
    const result = await Storage.put(file.name, file);
    console.log("result", result);

    axios
      .post(
        "http://localhost:8080/RevatureSocialNetwork/api/user/postphoto",
        result
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    await axiosFetcher();
    fetchImages();
  }

  return (
    <>
      {images.map((image) => (
        <img
          src={image}
          key={image}
          style={{ width: "100%", marginTop: "10px", position: "sticky" }}
        />
      ))}
    </>
  );
};

export default Photo;