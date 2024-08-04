import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PasswordIcon from '@mui/icons-material/Password';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import NavbarAfterLogIn from '../Navbar/NavbarAfterLogIn';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import useMediaQuery from '@mui/material/useMediaQuery';
import Swal from 'sweetalert2';
const drawerWidth = 240; 

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  
  

  const handleLogout=() => {
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    }
    else {
      setOpen(true);
    }
  }, [isSmallScreen]);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <div><NavbarAfterLogIn /></div>
      </AppBar>
      <Drawer variant="permanent" open={open} style={{ width: '300px' }}>
        <DrawerHeader>
          {/* Drawer Header content */}
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem onClick={() => { navigate("/myprofile") }} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{
                color: "#005077",
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "#005077"
                }}
              >
                <SupervisedUserCircleIcon onClick={handleDrawerOpen} />
              </ListItemIcon>
              <ListItemText primary={'Parents Profile'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => { navigate("/ChildrenProfile") }} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{
                color: "#005077",
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "#005077"
                }}
              >
                <ChildCareIcon onClick={handleDrawerOpen} />
              </ListItemIcon>
              <ListItemText primary='Children Profile' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
          
          <ListItem onClick={() => { navigate("/ChangePassword") }} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{
                color: "#005077",
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "#005077"
                }}
              >
                <PasswordIcon onClick={handleDrawerOpen} />
              </ListItemIcon>
              <ListItemText primary={'Change Password'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => { navigate("/LikedArticles") }} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{
                color: "#005077",
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "#005077"
                }}
              >
                <FavoriteIcon onClick={handleDrawerOpen} />
              </ListItemIcon>
              <ListItemText primary={'Liked Articles'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem onClick={() => { navigate("/AskedQuestions") }} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{
                color: "#005077",
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "#005077"
                }}
              >
                <QuestionAnswerIcon onClick={handleDrawerOpen} />
              </ListItemIcon>
              <ListItemText primary={'Asked Questions'} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <Divider />
          <ListItem onClick={handleLogout} disablePadding sx={{ display: 'block' }}>
            <ListItemButton 
              sx={{
                color: "#005077",
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  color: "#005077"
                }}
              >
                <LogoutIcon onClick={handleDrawerOpen} />
              </ListItemIcon>
              <ListItemText primary='Log out' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
      </Box>
    </Box>
  );
}
