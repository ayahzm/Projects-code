import React, { useState,useEffect } from 'react';
import EditParentsProfile from './EditParentsProfile';
import {Box,Backdrop,Modal,Fade,Card,CardActions,
  CardContent,Button,Typography,
  FormControlLabel,Switch,Grid,Paper} from '@mui/material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import "./EditProfile.css"
import SideBar from './SideBar';
import AddChild from './AddChild';
import ChildrenProfileList from './ChildrenProfileList';
import axios from 'axios';
function ChildrenProfile() {

 
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:700,
    bgcolor: 'background.paper',
    border: '2px',
    boxShadow: 4,
    p: 4,
  };
  const [data, setData] = useState([]);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  const fetchData = async () => {
    try {
      const result = await axios.get(`https://localhost:44360/api/child/GetAllChildren?id=${parseInt(userData.Id)}`);
      setData(result.data.map(child => ({
        ...child,
        age: calculateAge(child.BirthYear),
        avatar: null,
        popoverOpen: false,
        avatarPopoverOpen: false,
        avatarAnchorEl: null,
        anchorEl: null
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const calculateAge = (birthyear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthyear;
  };
   useEffect(() => {
    fetchData();
  }, []);
  return(
    <div>

    <div style={{ height:"38vw",
      position: 'absolute', left: '50%', top: '30%',
      transform: 'translate(-50%, -13%)'
  }}>
      
      <div style={{display:"flex",flexWrap:"wrap",justifyContent:"space-around",marginLeft:"200px"}}>
      
      

        <ChildrenProfileList data={data} />
      
      </div>
      </div>
    
    </div>
    
  );
};

export default ChildrenProfile;