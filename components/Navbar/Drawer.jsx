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
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
const DrawerComp = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const buttonstyle={
    width:"80px",
    backgroundColor:'#005077',
    color:"white",
    marginLeft:'15%',
    marginTop:"450%",
    '&:hover':{
      color:'#005077',
      backgroundColor:"#d0dff0"
    },
    "&:focus":{
      outline: 'none'
    }
  }

  return (
    <React.Fragment>
      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
        <ListItemButton href="#front" onClick={()=>{navigate("/")}} >
              <ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton href="#services" onClick={()=>{navigate("/")}}>
              <ListItemIcon>
                <ListItemText>Services</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton href="#aboutus" onClick={()=>{navigate("/")}}>
              <ListItemIcon>
                <ListItemText>About us</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <ListItemButton href="#contact" onClick={()=>{navigate("/")}}>
              <ListItemIcon>
                <ListItemText>Contact us</ListItemText>
              </ListItemIcon>
            </ListItemButton>
            <Button onClick={()=>navigate('/login')} sx={buttonstyle}>
              Log in      
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