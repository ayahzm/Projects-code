import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from "react";
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
import { IconButton, InputAdornment } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DrawerComp from "./HeaderDrawer";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import AdminDrawer from './AdminDrawer';
import { AvatarProfile } from '../Avatar/AvatarProfile';
import Swal from 'sweetalert2';

const NavBarAdmin = () => {
  const [value, setValue] = useState("Article Management");
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const handleLogout = () => {
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
    });
  };

  const profilestyle = {
    "&:hover": {
      cursor: "pointer"
    },
    marginLeft: "auto",
    "&:focus": {
      outline: "none"
    }
  };

  const changestyle = {
    "&:focus": {
      outline: "none"
    }
  };

  const navigate = useNavigate();

  const [notifications, setNotifications] = useState(false);
  const Notification = ({ notification, setNotification }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setNotification(!notification)}>
          {notification ? <NotificationsActiveIcon style={{ color: 'white' }} /> : <NotificationsOffIcon style={{ color: 'white' }} />}
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
              <Typography variant="contained" className="Title" sx={{ fontSize: "1.75rem", paddingLeft: "5%", textDecoration: "none", color: "#EFAE7D" }}>
                Child Guardian
              </Typography>
              <AdminDrawer />
            </>
          ) : (
            <>
              <Typography variant="contained" className="Title" sx={{ fontSize: "1.4rem", paddingLeft: "1.5%", textDecoration: "none", color: "#EFAE7D" }}>
                Child Guardian
              </Typography>
              <Tabs
                sx={{ marginLeft: "auto" }}
                indicatorColor="primary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab value="Article Management" onClick={() => { navigate("/ArticleManagement") }} sx={changestyle} label="Article Management" />
                <Tab value="Doctor Requests" onClick={() => { navigate("/DoctorRequests") }} sx={changestyle} label="Doctor Requests" />
                <Tab value="About Us" onClick={() => { navigate("/AboutUsAdmin") }} sx={changestyle} label="About Us" />
              </Tabs>

              {userData ? (
  <Button sx={profilestyle} onClick={() => navigate('/adminprofile')}>
    <AvatarProfile avatar={userData.AvatarUrl} />
  </Button>
) : (
  <Button sx={profilestyle} onClick={() => navigate('/adminprofile')}>
    <AvatarProfile  />
  </Button>
)}

              
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavBarAdmin;
