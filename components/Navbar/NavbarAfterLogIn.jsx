import { useNavigate } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  Button
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerComp from "./HeaderDrawer";
import AvatarProfile from '../Avatar/AvatarProfile';
const NavbarAfterLogIn = () => {
  const [value, setValue] = useState("Home");

  const theme = useTheme();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    JSON.parse(sessionStorage.getItem('userData'));
  }, [userData]);
  

  const changestyle = {
    "&:focus":{
      outline: "none"
    }
  }

  const profilestyle={
    "&:hover":{
      cursor: "pointer"},

      "&:focus":{
        outline: "none"
      },
      borderRadius:"50%",
      marginLeft: "auto"
    
  }

  const navigate= useNavigate();
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#005077" }}>
        <Toolbar> 
          {isMatch ? (
            <>
              <Typography variant="contained" className="Title" sx={{ fontSize: "1.75rem", paddingLeft: "5%" ,textDecoration:"none", color:"#EFAE7D"}}>
                Child Guardian
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Typography variant="contained" className="Title" sx={{ fontSize: "1.4rem", paddingLeft: "1.5%", textDecoration:"none", color:"#EFAE7D"}}>
                Child Guardian
              </Typography>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab value ="Home" onClick={()=>{navigate("/home")}} sx={changestyle} label="Home" />
                <Tab value ="medicine" onClick={()=>{navigate("/medicine")}} sx={changestyle} label="Medicine" />
                <Tab value ="qna" onClick={()=>{navigate("/qna")}} sx={changestyle} label="Q&A" />
                <Tab value ="diagnose" onClick={()=>{navigate("/diagnose")}} sx={changestyle} label="Diagnose" />
                <Tab value ="contact" onClick={()=>{navigate("/ContactUsParent")}} sx={changestyle} label="Contact Us" />
                <Tab value ="aboutus" onClick={()=>{navigate("/AboutUsParent")}} sx={changestyle} label="About Us" />
              </Tabs>
              <Button sx={profilestyle} onClick={()=>{navigate("/myprofile")}}><AvatarProfile avatar={userData.AvatarUrl}  
               variant="contained" /></Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavbarAfterLogIn;