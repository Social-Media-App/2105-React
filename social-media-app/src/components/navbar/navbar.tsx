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
  const classes = useStyles();
  const [profileEl, setProfileEl] = React.useState(null);
  const [logoutEl, setLogoutEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [aboutEl, setAboutEl] = React.useState(false);
  const isMenuOpen = Boolean(profileEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  const handleProfileMenuOpen = (event: any) => {
    setProfileEl(event.currentTarget);
  };
  const handleAboutMenuOpen = (event: any) => {
    setAboutEl(true);
  };
  const handleLogoutMenuOpen = (event: any) => {
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
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

      <MenuItem onClick={handleProfileMenuOpen}>
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
    history.push(uri)
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
              onClick={()=>handleLink("/path")}
              >SNACKBAR</Button>
              
              {/* <img src= style={{width:'20px', height:'20px', borderRadius:'10px'}} alt="" /> */}
            </div>

            <div className={classes.search} >
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className="topNavBarContainer">
              <div className="topNavBarLinks">
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/path")}
              >HomePage</Button>
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/path")}
              >Profile</Button>
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/path")}
              >About</Button>
              <Button 
              style={{color:'white'}}
              onClick={()=>handleLink("/path")}
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
                  src={
                    "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png"
                  }
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