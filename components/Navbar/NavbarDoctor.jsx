import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import React, { useState } from "react";
import LogOutAlert from "../Alerts/LogOutAlert"
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerComp from "./HeaderDrawer";
import { AvatarProfile } from '../Avatar/AvatarProfile';
import {IconButton, InputAdornment } from '@mui/material';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import DrDrawer from './DrDrawer';


const NavbarDoctor = () => {
  const [value, setValue] = useState("Home");
  const theme = useTheme();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  

  const navigate = useNavigate();
  const profilestyle={
    "&:hover":{
      cursor: "pointer"},

      marginLeft: "auto",
      "&:focus": {
      outline: "none"
    }
    
  }

  const changestyle = {
    "&:focus":{
      outline: "none"
    }
  }

  const [notifications, setNotifications] = useState(false);
    const Notification = ({ notification, setNotification }) => {
        return (
          <InputAdornment position="end">
            <IconButton onClick={() => setNotification(!notification)}>
              {notification ? <NotificationsActiveIcon  sx={changestyle}  /> : < NotificationsOffIcon  sx={changestyle} />}
            </IconButton>
          </InputAdornment>
        );
      };

  return (
    <React.Fragment>
      <AppBar sx={{ background: "#005077" }}>
        <Toolbar> 
          {isMatch ? (
            <>
              <Typography variant="contained" className="Title" sx={{ fontSize: "1.75rem", paddingLeft: "5%" ,textDecoration:"none", color:"#EFAE7D"}}>
                Child Guardian
              </Typography>
              <DrDrawer />
            </>
          ) : (
            <>
              <Typography variant="contained" className="Title" sx={{ fontSize: "1.4rem", paddingLeft: "1.5%", textDecoration:"none", color:"#EFAE7D"}}>
                Child Guardian
              </Typography>
              <Tabs
                style={{marginLeft: "auto"}}
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab value ="Home" onClick={()=>{navigate("/ArticlePage")}} sx={changestyle} label="Home"/>
                <Tab value ="Q&A" onClick={()=>{navigate("/drqna")}} sx={changestyle} label="Q&A"/>
                <Tab value ="Contact Us" onClick={()=>{navigate("/ContactAfterLogin")}} sx={changestyle}  label="Contact Us"/>
                <Tab value ="About Us" onClick={()=>{navigate("/AboutUs")}} sx={changestyle} label="About Us"/>
              </Tabs>

              
              
              <Button sx={profilestyle} onClick={() => navigate('/drprofile')}> 
                  <AvatarProfile avatar={userData.AvatarUrl} />
              </Button>
  
              
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavbarDoctor;