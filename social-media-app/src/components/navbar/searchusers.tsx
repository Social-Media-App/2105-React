import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { IUser } from "../../redux/stateStructures";
import Select from "react-select";
import { useSelector } from "react-redux";
import * as ReactRedux from "react-redux";
// import * as Redux from 'redux';
//import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { RootState } from "../../redux/store";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core";
//import sample from './fire.mp4';

interface IProps {
  listUsers: IUser[];
}

interface SearchUser {
  value: IUser;
  label: string;
}

const useStyles = makeStyles(() => ({
    root: {
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "green"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
          borderColor: "purple"
        },
        "& .MuiOutlinedInput-input": {
          color: "green"
        },
        "&:hover .MuiOutlinedInput-input": {
          color: "red"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
          color: "purple"
        },
        "& .MuiInputLabel-outlined": {
          color: "green"
        },
        "&:hover .MuiInputLabel-outlined": {
          color: "red"
        },
        "& .MuiInputLabel-outlined.Mui-focused": {
          color: "purple"
        }
      }
}));

const SearchUsersList: React.FunctionComponent<IProps> = (props: IProps) => {
    const classes = useStyles();
  const history = useHistory();
  const searchArr: SearchUser[] = props.listUsers.map((user) => {
    return { value: user, label: user.firstName + " " + user.lastName };
  });
  const [searchingUser, setSearchingUser] = useState<any>({});

  const handleChange = (event:ChangeEvent<{}>, value:IUser | null) => {
    //event.preventDefault();
    console.log(event);
    console.log(value);
    console.log("in handle chnage")
    setSearchingUser(value);
    
};

const handleSubmit = (e:SyntheticEvent) => {
    e.preventDefault();
    console.log("in handle submit")
    findUserProfile();
};

  const findUserProfile = () => {
    console.log(searchingUser)
    history.push({ pathname: `/profile/${searchingUser.username}`, state: searchingUser });
    console.log("in Find user")
  };

  return (
    <div className="searchBarOnTop">
      {/* <button onClick={findUserProfile}>Find</button>
             <Select
               options={searchArr}
               className="searchInput"
               onChange={setSearchingUser}
               isSearchable
             /> */}
      <form>
        <Autocomplete
          id="combo-box-demo"
          options={props.listUsers}
          getOptionLabel={(option) => option.firstName + " " + option.lastName}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
                //e.preventDefault();
                console.log("Something Please")
                handleSubmit(e);
            }}}
          onChange={handleChange}
          style={{ width: 300, outlineColor: "white", color: "white" }}
          renderInput={(params) => (
            <TextField {...params} label="Search" /* variant="outlined" */ 
            className={classes.root}
            style={{color:'white', backgroundColor:'rgba(255, 255, 255, 0.70)', borderRadius:'5px'}} />
          )}
        />
        <button type="submit" style={{ display: "none" }} onClick = {handleSubmit}></button>
      </form>
    </div>
  );
};

export default SearchUsersList;
