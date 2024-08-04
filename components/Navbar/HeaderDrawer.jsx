import React, { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogOutAlert from "../Alerts/LogOutAlert";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import AvatarProfile from "../Avatar/AvatarProfile";
const DrawerComp = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [openDrawer, setOpenDrawer] = useState(false);
  const profilestyle={
    "&:hover":{
      cursor: "pointer"},
      marginLeft: "25%",
       marginTop:"280%",
       marginBottom:"10%",
      "&:focus":{
        outline: "none"
      },
      borderRadius:"50%",
    
  }

  const buttonstyle={
    
    backgroundColor:'#005077',
    color:"white",
    marginLeft:'20%',
    '&:hover':{
      color:'#005077',
      backgroundColor:"#d0dff0"
    },
    "&:focus":{
      outline: 'none'
    }
  }
  const handleLogout=() => {
    setOpenDrawer(false);
    Swal.fire({
      
      title: "Are you sure you want to log out?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: "#fed3b2",
      cancelButtonColor: "#005077",
      confirmButtonText: "Yes",
      color: "#005077"
    }).then((result) => {
      if (result.isConfirmed) {
      sessionStorage.clear();
      navigate('/');
        Swal.fire({
         
          title: "Success!",
          text: "You're Logged out.",
          color: "#005077",
          confirmButtonColor: "#005077"
        });
      }
    
  })};
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Drawer
        sx={{zIndex:'3000'}}
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
            <ListItemButton onClick={()=>{navigate("/home")}} >
              <ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={()=>{navigate("/medicine")}}>
              <ListItemIcon>
                <ListItemText>Medicine</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={()=>{navigate("/qna")}}>
              <ListItemIcon>
                <ListItemText>Q&A</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={()=>{navigate("/diagnose")}}>
              <ListItemIcon>
                <ListItemText>Diagnose</ListItemText>
              </ListItemIcon>
            </ListItemButton>

            <Button sx={profilestyle} onClick={()=>{navigate("/myprofile")}}><AvatarProfile avatar={userData.AvatarUrl}  
               variant="contained" /></Button>
            <Button onClick={handleLogout}  sx={buttonstyle}>
               
                    Log out 
                           
              </Button>
        </List>
      </Drawer>
      <IconButton
        sx={{ color: "white", marginLeft: "auto" }}
        onClick={() => setOpenDrawer(!openDrawer)}
      >
        <MenuIcon color="white" />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;