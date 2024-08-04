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
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import NavbarDoctor from '../Navbar/NavbarDoctor';
import { useMediaQuery } from '@mui/material';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
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

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
        <NavbarDoctor sx={{backgroundColor:"#005077"}}>
          {/* <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton> */}
        </NavbarDoctor>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem onClick={()=>{navigate("/drprofile")}} disablePadding sx={{ display: 'block' }} >
              <ListItemButton 
                sx={{
                  color:"#005077",  
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
                    color:"#005077"
                  }}
                >
                    <PersonIcon onClick={handleDrawerOpen}/>
                </ListItemIcon>
                <ListItemText primary={'My Profile'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem onClick={()=>{navigate("/ChangePasswordDoctor")}} disablePadding sx={{ display: 'block' }} >
              <ListItemButton 
                sx={{
                  color:"#005077",  
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
                    color:"#005077"
                  }}
                >
                    <PasswordIcon onClick={handleDrawerOpen}/>
                </ListItemIcon>
                <ListItemText  primary={'Change Password'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            <ListItem onClick={()=>{navigate("/AnsweredQuestions")}} disablePadding sx={{ display: 'block' }} >
              <ListItemButton 
                sx={{
                  color:"#005077",  
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
                    color:"#005077"
                  }}
                >
                    <QuestionAnswerIcon/>
                </ListItemIcon>
                <ListItemText  primary={'Answered Questions'} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
        </List>
        
        <List>
           
<Divider />
            <ListItem  disablePadding sx={{ display: 'block' }} >
              <ListItemButton 
                sx={{
                  color:"#005077",  
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
                    color:"#005077"
                  }}
                >
                    <LogoutIcon onClick={handleDrawerOpen}/>
                </ListItemIcon>
                
                <ListItemText onClick={handleLogout} primary='Log out' sx={{ opacity: open ? 1 : 0 }} />
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