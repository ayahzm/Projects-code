import LogIn from "../LoginSignup/LogIn"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import StartPage from "../StartPage/StartPage";
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
import DrawerComp from "./Drawer";
const Header = () => {
  const [value, setValue] = useState("Home");
  const theme = useTheme();
  
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  

  const changestyle = {
    color: 'white',
    "&:focus":{
      outline: "none"
    }
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
                sx={{marginLeft:"auto"}}
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab value="Home" href="#front" onClick={()=>{navigate("/")}} sx={changestyle} label="Home" />
                <Tab value="Services" href="#services" onClick={()=>{navigate("/")}} sx={changestyle} label="Services" />
                <Tab value="AboutUs" href="#aboutus" onClick={()=>{navigate("/")}} sx={changestyle} label="About Us" />
                <Tab value="Contact"  onClick={()=>{navigate("/contact")}} sx={changestyle} label="Contact" />
              </Tabs>
              <Button onClick={()=>{navigate("/login")}} sx={{ marginLeft: "auto"}} variant="contained">
                 
                    Log in 
                       
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;