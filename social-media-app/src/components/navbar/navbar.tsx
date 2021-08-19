import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import "./navbar.css";
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { useSelector } from "react-redux";
import {RootState} from '../../redux/store';
import SearchUsersList from './searchusers';
import { FullscreenExitTwoTone } from "@material-ui/icons";
import { useState, useEffect } from 'react' 
import { Storage } from "aws-amplify";
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/actons'

const useStyles = makeStyles((theme) => ({
  bkcolor: {
    backgroundColor: "black",
  },
  grow: {
    flexGrow: 1,
    backgroundColor: "black",
    display: "flex",
    alignitems: "center",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    display: "flex",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [profileEl, setProfileEl] = React.useState(null);
  const [logoutEl, setLogoutEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [aboutEl, setAboutEl] = React.useState(false);
  const viewinguser = useSelector((state:RootState) => state.auth.user);
  const isMenuOpen = Boolean(profileEl);
  const users = useSelector((state:RootState) => state.allUsers.users);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const user = useSelector((state: RootState) => state.auth.user);

  const history = useHistory();

  const [profileUrl, setProfileUrl] = useState(user.profilePicture);

  useEffect(() => {
          getUserProfileImg(profileUrl!);
  });

  const getUserProfileImg = async (ProfileImg: string) => {
      if(ProfileImg){
          Storage.get(ProfileImg)
          .then((url: any) => {
              var myRequest = new Request(url);
              fetch(myRequest).then(function(response) {
                  if (response.status === 200) {
                      setProfileUrl(url);
                  }
              });
          })
          .catch((err) => console.log(err));
      }
  };

  const handleProfileMenuOpen = (event: any) => {
    setProfileEl(event.currentTarget);
    if(profileEl)
      handleLink("/profile");
    // history.push("/profile");
  };
  const handleHomeMenuOpen = (event: any) => {
    setProfileEl(event.currentTarget);
    handleLink("/home");
    // history.push("/profile");
  };
  const handleAboutMenuOpen = (event: any) => {
    setLogoutEl(event.currentTarget);
    handleLink("/about");
    // setAboutEl(true);
  };
  const handleLogoutMenuOpen = (event: any) => {
    handleLogout();
    setLogoutEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    //setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setProfileEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: any) => {
    event.preventDefault()
    //setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    dispatch(logout())
  }

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={profileEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>Profile</MenuItem>
      <MenuItem onClick={handleHomeMenuOpen}>Home</MenuItem>
      <MenuItem onClick={handleAboutMenuOpen}>About</MenuItem>
      <MenuItem onClick={handleLogoutMenuOpen}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit"></IconButton>s{" "}
      </MenuItem>

      <MenuItem onClick={handleMobileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  function handleLink (uri:string){
    if(uri === "/profile")
      history.push({pathname: uri + '/' + viewinguser.username, state: viewinguser});
    else
      history.push(uri);
  }

  return (
    <div>
      <div className={classes.grow}>
        <AppBar
          position="static"
          className={classes.bkcolor}
          title="Hello username,"
        >
          <Toolbar>
            <br />
            <div
              style={{ fontWeight: "bold", fontSize: "20px" }}
              className="topNavBarLeft"
            >
              <Button 
              style={{fontSize:'20px', fontWeight:'bold', color:'white'}}
              onClick={()=>handleLink("/home")}
              >SNACKBAR</Button>
            </div>

            <div className={classes.search} >
              {/* <div className={classes.searchIcon}>
                <SearchIcon />
              </div> */}


              <SearchUsersList listUsers = {users}/>
              {/* <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              /> */}
            </div>
            <div className="topNavBarContainer">
              <div className="topNavBarLinks">
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/home")}
              >HomePage</Button>
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/profile")}
              >Profile</Button>
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/path")}
              >About</Button>
              <Button 
              style={{color:'white'}}
              onClick={handleLogout}
              >Logout</Button>
              </div>
            </div>

            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <img
                  className="topLogoImg"
                  src={profileUrl}
                  width="60px"
                  height="60px"
                  alt=""
                />
              </IconButton>
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </div>
    </div>
  );
}