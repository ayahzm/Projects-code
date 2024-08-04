import React, { useState,useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './EditProfile.css';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { AvatarProfile } from '../Avatar/AvatarProfile';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from 'sweetalert2';
import AdminSideBar from './AdminSideBar';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
const AdminProfile = () => {

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Doctor Info is Updated!',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [avatar, setAvatar] = useState(userData?.AvatarUrl || '');
  const navigate = useNavigate();

  console.log(userData);
  
  const styleObj = {
    "&:hover": {
      backgroundColor: "#EFAE7D"
    },
    backgroundColor:"#EFAE7D",
    float: "right",
    marginTop:"2%",
    "&:focus":{
      outline: "none"
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append('file', file);
      console.log(userData);
      const response = await axios.post(
        `https://localhost:44360/api/doctor/UploadAvatar/${userData.Id}`,
        formData
      );

      if (response.status === 200) {
        const avatarUrl = response.data; // Full URL now

        setAvatar(avatarUrl);

        const Data = {
          Email: userData.Email,
          Password: userData.Password,
        };

        const getUserInfoUrl = 'https://localhost:44360/api/Test/GetUserInfo3';
        axios.post(getUserInfoUrl, Data).then((userInfoResult) => {
          sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
        });

        Swal.fire({
          title: 'Avatar Updated!',
          text: 'Avatar has been successfully updated.',
          confirmButtonColor: '#005077',
        });
      } else {
        throw new Error('Error uploading avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update avatar!',
        confirmButtonColor: '#005077',
      });
    }
  };

  const handleRemoveProfile = async () => {
    try {
      const response = await axios.delete(`https://localhost:44360/api/doctor/RemoveAvatar/${userData.Id}`);

      if (response.status === 200) {
        setAvatar(null);
        const Data = {
          Email: userData.Email,
          Password: userData.Password,
        };

        const getUserInfoUrl = 'https://localhost:44360/api/Test/GetUserInfo3';
        axios.post(getUserInfoUrl, Data).then((userInfoResult) => {
          sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
        }); // Remove avatar locally
        Swal.fire({
          title: 'Avatar Removed!',
          text: 'Avatar has been successfully removed.',
          confirmButtonColor: '#005077',
        });
      } else {
        throw new Error('Error removing avatar');
      }
    } catch (error) {
      console.error('Error removing avatar:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to remove avatar!',
        confirmButtonColor: '#005077',
      });
    }
  };


  return (
    <div>
<AdminSideBar/>
      <div
        style={{
            position: 'absolute', left: '55%', top: '23%',
            transform: 'translate(-50%, -50%)'
          }}
      >
        <AvatarProfile
          avatar={avatar}
          sx={{ width: '110px', height: '110px', marginBottom: '15px',ml:"35%"}}
        />

        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          style={{ marginBottom: '10px', background: '#005770' }}
        >
          <AccountCircleIcon />
          Upload Profile
          <input
            type="file"
            onChange={(e) => handleFileChange(e)}
            style={{ display: 'none' }}
          />
        </Button>
        <Button
          onClick={handleRemoveProfile}
          variant="contained"
          style={{ marginTop: '-10px', marginLeft: '10px', background: '#005770' }}
        >
          <DeleteIcon />
          Remove Profile
        </Button>

        
      </div>
    </div>
  );
};

export default AdminProfile;
