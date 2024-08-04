import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
export default function LogOutAlert() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleLogout=() => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <React.Fragment>
      <Button sx={{marginLeft:"20%", marginTop:"20%"}} title='Log out' variant="contained" onClick={handleClickOpen} ><LogoutIcon /></Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle sx={{fontSize:"20px"}} id="alert-dialog-title">
          {"Are you sure?"}
        </DialogTitle>
        <DialogActions>
          <Button sx={{paddingTop:"0"}} onClick={handleLogout}>yes</Button>
          <Button sx={{paddingRight:"25%", paddingTop:"0"}} onClick={handleClose} autoFocus>
            no
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
