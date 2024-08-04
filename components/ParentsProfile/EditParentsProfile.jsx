import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import './EditProfile.css';
import "react-bootstrap";
import axios from 'axios';
import { Button } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';
import AvatarProfile from '../Avatar/AvatarProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const EditParentsProfile = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [PasswordMessage, setPasswordMessage] = useState("");
  const [ConfirmedPasswordMessage, setConfirmedPasswordMessage] = useState("");
  const [MotherFnameMessage, setMotherFnameMessage] = useState("");
  const [MotherLnameMessage, setMotherLnameMessage] = useState("");
  const [FatherFnameMessage, setFatherFnameMessage] = useState("");
  const [FatherLnameMessage, setFatherLnameMessage] = useState("");
  const [PhoneNbMessage, setPhoneNbMessage] = useState("");
  const [AddressMessage, setAddressMessage] = useState("");
  const [avatar, setAvatar] = useState(userData?.AvatarUrl || '');

  function checkInputs() {
    setEmailMessage(""); 
    setMotherFnameMessage(""); 
    setMotherLnameMessage("");
    setFatherFnameMessage(""); 
    setFatherLnameMessage(""); 
    setPhoneNbMessage(""); 
    setAddressMessage("");
    setConfirmedPasswordMessage("");

    if (formData.Email.length === 0) {
      setEmailMessage("email cannot be empty");
      setMessageType("error3");
    }
    else if (formData.MotherFname.length === 0) {
      setMotherFnameMessage("mother first name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.MotherLname.length === 0) {
      setMotherLnameMessage("mother last name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.FatherFname.length === 0) {
      setFatherFnameMessage("father first name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.FatherLname.length === 0) {
      setFatherLnameMessage("father last name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.PhoneNumber.length === 0 || formData.Phonenb === 0) {
      setPhoneNbMessage("phone number cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.Address.length === 0) {
      setAddressMessage("address cannot be empty");
      setMessageType("error3");
    }
  }

  const getMessageIcon = () => {
    switch (messageType) {
      case "error1":
      case "error3":
        return <ErrorOutlineIcon style={{ color: 'red', verticalAlign: 'middle' }} />;
      case "warning":
        return <WarningAmberIcon style={{ color: 'red', verticalAlign: 'middle' }} />;
      case "success":
        return <CheckCircleOutlineIcon style={{ color: 'green', verticalAlign: 'middle' }} />;
      default:
        return null;
    }
  };

  const [formData, setFormData] = useState({
    Email: '',
    MotherFname: '',
    MotherLname: '',
    FatherFname: '',
    FatherLname: '',
    PhoneNumber: 0,
    Address:'',
    AvatarUrl: avatar
  });

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

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Parent info is updated',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          setFormData({
            Email: userData.Email || '',
            MotherFname: userData.MotherFname || '',
            MotherLname: userData.MotherLname || '',
            FatherFname: userData.FatherFname || '',
            FatherLname: userData.FatherLname || '',
            PhoneNumber: userData.PhoneNumber || 0,
            Address: userData.Address || '',
            AvatarUrl: userData.AvatarUrl || ''
          });
        } else {
          navigate('/EditParentsProfile');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`https://localhost:44360/api/Test/UploadAvatar/${userData.Id}`, formData);

      if (response.status === 200) {
        const avatarUrl = response.data; // Full URL now

        setAvatar(avatarUrl);

        const Data = {
          Email: userData.Email,
          Password: userData.Password
        };

        const getUserInfoUrl = "https://localhost:44360/api/Test/GetUserInfo";
        axios.post(getUserInfoUrl, Data)
          .then((userInfoResult) => {
            sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
          });

        Swal.fire({
          title: 'Avatar Updated!',
          text: 'Avatar has been successfully updated.',
          confirmButtonColor: "#005077"
        });
      } else {
        throw new Error('Error uploading avatar');
      }
    } catch (error) {
      console.error('Error uploading avatar:', error);
      Swal.fire({
        title: 'Oops...',
        text: 'Failed to update avatar!',
        confirmButtonColor: "#005077"
      });
    }
  };

  const handleRemoveProfile = async () => {
    try {
      const response = await axios.post(`https://localhost:44360/api/Test/RemoveAvatar/${userData.Id}`);
      
      if (response.status === 200) {
        setAvatar(null);
        const Data = {
          Email: userData.Email,
          Password: userData.Password,
        };

        const getUserInfoUrl = 'https://localhost:44360/api/Test/GetUserInfo';
        axios.post(getUserInfoUrl, Data).then((userInfoResult) => {
          sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
        }); // Update state to reflect removal
        Swal.fire({
          title: 'Success!',
          text: 'removed avatar succesfully!',
          confirmButtonColor: "#005077"
        }); // Optionally show success message
      } else {
        throw new Error('Error removing avatar');
      }
    } catch (error) {
      console.error('Error removing avatar:', error);
      Swal.fire({
        title: 'Oops...',
        text: 'Failed to remove avatar!',
        confirmButtonColor: "#005077"
      });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    checkInputs();
    const data = {
      ...formData
    };
    axios.put(`https://localhost:44360/api/Test/UpdateParent`, data)
      .then((response) => {
        if (response.data === "Data updated") {
          PopUp();
          const Data = {
            Email: userData.Email,
            Password: userData.Password
          };
  
          const getUserInfoUrl = "https://localhost:44360/api/Test/GetUserInfo";
          axios.post(getUserInfoUrl, Data)
            .then((userInfoResult) => {
              sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
            });
          navigate('/myprofile');
        }
      })
      .catch((error) => {
        alert('Error updating parent info:', error);
      });
  };

  return (
    <div>
      <div style={{ position: 'absolute', left: '50%', top: '35%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ marginLeft: "10%", justifyContent: "space-between" }} className='form-wrapper'>
          <AvatarProfile
            sx={{ position: 'relative', left: '17%', width: "180px", height: "180px", marginTop: "30%" }}
            avatar={avatar} name={userData.MotherFname} // Use the state variable directly
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
          <Button onClick={handleRemoveProfile} variant="contained" style={{ marginTop: '-10px', marginLeft: '10px', background: '#005770' }}>
            <DeleteIcon />Remove Profile
          </Button>
          <br />
          <TextField
            required
            name='MotherFname'
            value={formData.MotherFname}
            onChange={handleChange}
            id="outlined-required"
            label="Mother's First Name"
            margin="dense"
            sx={{ marginRight: "20px" }}
          />
          
          {MotherFnameMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{MotherFnameMessage}
            </p>
          )}
          <TextField
            required
            name='MotherLname'
            value={formData.MotherLname}
            onChange={handleChange}
            id="outlined-required"
            label="Mother's Last Name"
            margin="dense"
            sx={{ marginRight: "20px" }}
          /><br />
          {MotherLnameMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{MotherLnameMessage}
            </p>
          )}
          <TextField
            required
            name='FatherFname'
            value={formData.FatherFname}
            onChange={handleChange}
            id="outlined-required"
            label="Father's First Name"
            margin="dense"
            sx={{ marginRight: "20px" }}
          />
          {FatherFnameMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{FatherFnameMessage}
            </p>
          )}
          <TextField
            required
            name='FatherLname'
            value={formData.FatherLname}
            onChange={handleChange}
            id="outlined-required"
            label="Father's Last Name"
            margin="dense"
            sx={{ marginRight: "20px" }}
          /><br />
          {FatherLnameMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{FatherLnameMessage}
            </p>
          )}
          <TextField
            required
            name='PhoneNumber'
            value={formData.PhoneNumber}
            onChange={handleChange}
            id="outlined-required"
            label="Contact Number"
            margin="dense"
            sx={{ marginRight: "20px" }}
          />
          {PhoneNbMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{PhoneNbMessage}
            </p>
          )}
          <TextField
            required
            name='Email'
            value={formData.Email}
            onChange={handleChange}
            id="outlined-required"
            label="Email"
            margin="dense"
            sx={{ marginRight: "20px" }}
          /><br />
          {EmailMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{EmailMessage}
            </p>
          )}
          <TextField
            required
            name='Address'
            value={formData.Address}
            onChange={handleChange}
            id="outlined-required"
            label="Address"
            margin="dense"
            sx={{ width: '582px' }}
          />
          {AddressMessage && (
            <p style={{ color: 'red', fontSize: '14px' }}>
              {getMessageIcon()}{AddressMessage}
            </p>
          )}
        </div>
        <div>
          <Button sx={styleObj} onClick={() => navigate('/home')} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} sx={styleObj} style={{ marginRight: '10px' }} variant="contained">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditParentsProfile;
