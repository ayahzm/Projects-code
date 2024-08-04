import React, { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button
} from "@mui/material";
import Swal from 'sweetalert2';
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
const AdminDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();
  const buttonstyle={
    marginTop:"300%",
    backgroundColor:'#005077',
    color:"white",
    marginLeft:'25%',
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
  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
        <ListItemButton onClick={()=>{navigate("/ArticleManagement")}} >
              <ListItemIcon>
                <ListItemText>Article Management</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={()=>{navigate("/DoctorRequests")}}>
              <ListItemIcon>
                <ListItemText>Doctor Requests</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={()=>{navigate("/AboutUsAdmin")}}>
              <ListItemIcon>
                <ListItemText>About Us</ListItemText>
              </ListItemIcon>
            </ListItemButton>

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

export default AdminDrawer;