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
import SideBar from './SideBar';
import axios from 'axios';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
const EditProfile = () => {

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
  const [visible, setVisible] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [FirstNameMessage,setFirstNameMessage ] = useState("");
  const [LastNameMessage, setLastNameMessage] = useState("");
  const [MajorMessage, setMajorMessage] = useState("");
  const [UniversityMessage, setUniversityMessage] = useState("");
  const [CountryMessage, setCountryMessage] = useState("");
  const [BirthYearMessage, setBirthYearMessage] = useState("");
  const [YearOfGraduationMessage, setYearOfGraduationMessage] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Id:0,
    Email:'',
    FirstName: '',
    LastName: '',
    Major: '',
    University: '',
    Country: '',
    // Gender: '',
    BirthYear:0,
    YearOfGraduation:0
  });

  function checkInputs() {
    setEmailMessage("");
    setFirstNameMessage(""); 
    setLastNameMessage("");
    setMajorMessage(""); 
    setUniversityMessage(""); 
    setCountryMessage("");
    setBirthYearMessage("");
    setYearOfGraduationMessage("");

    if (formData.Email.length === 0) {
      setEmailMessage("email cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.FirstName.length === 0) {
      setFirstNameMessage("First name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.LastName.length === 0) {
      setLastNameMessage("Last name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.Major.length === 0) {
      setMajorMessage("Major cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.University.length === 0) {
      setUniversityMessage("University name cannot be empty");
      setMessageType("error3");
    } 
    else if (formData.Country.length === 0) {
      setCountryMessage("Country name cannot be empty");
      setMessageType("error3");
    }
    else if (formData.BirthYear.length === 0) {
      setBirthYearMessage("BirthYear cannot be empty");
      setMessageType("error3");
    }
    else if (formData.YearOfGraduation.length === 0) {
      setYearOfGraduationMessage("Year of graduation cannot be empty");
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
      
    }));
  };
  console.log(userData);
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        if (userData) {
          setFormData({
            Id: userData.Id || 0,
            Email: userData.Email || '',
            FirstName: userData.FirstName || '',
            LastName: userData.LastName || '',
            Major: userData.Major || '',
            University: userData.University || '',
            Country: userData.Country || '',
            // Gender: userData.Gender || '',
            BirthYear: userData.BirthYear || 0,
            YearOfGraduation: userData.YearOfGraduation || 0
          });
        } else {
          // alert('Parent data is null.');
          navigate('/drprofile');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchData();
}, [navigate]);

  const handleSubmit = (e) => {
      e.preventDefault();
      checkInputs();
      const data = {
          ...formData
      };
      axios.put(`https://localhost:44360/api/doctor/UpdateDoctorInfo`, data)
          .then((response) => {
            if(response.data==="Data updated"){
              PopUp();
              const Data = {
                Email: userData.Email,
                Password: userData.Password,
              };
      
              const getUserInfoUrl = 'https://localhost:44360/api/Test/GetUserInfo2';
              axios.post(getUserInfoUrl, Data).then((userInfoResult) => {
                sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
              });
              navigate('/drprofile');
            }
              
          })
          
  };

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

        const getUserInfoUrl = 'https://localhost:44360/api/Test/GetUserInfo2';
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

        const getUserInfoUrl = 'https://localhost:44360/api/Test/GetUserInfo2';
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



  const EndAdornment = ({ visible, setVisible }) => (
    <InputAdornment position="end">
      <IconButton onClick={() => setVisible(!visible)}>
        {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div>
      <SideBar />

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '55%',
          transform: 'translate(-40%, -50%)',
        }}
      >
        <AvatarProfile
          avatar={avatar}
          sx={{ width: '150px', height: '150px', marginBottom: '20px' }}
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

        <div className="form-wrapper">
          
          <TextField
            required
            fullWidth
            name='Email'
            value= {formData.Email}
            onChange={handleChange}
            id="outlined-required"
            label="Email"
            margin="dense"
            sx={{ width: '732px' }}
          />
          <TextField
          required
          name='FirstName'
          value= {formData.FirstName}
          onChange={handleChange}
          id="outlined-required"
          label="First Name"
          margin="dense"
          sx={{marginRight:"20px", width:'356px'}}
        />
        {FirstNameMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{FirstNameMessage}
                  </p>
                )}
        <TextField
          required
          name='LastName'
          value= {formData.LastName}
          onChange={handleChange}
          id="outlined-required"
          label="Last Name"
          margin="dense"
          sx={{ width:'356px'}}
        />
        {LastNameMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{LastNameMessage}
                  </p>
                )}
        <TextField
          required
          name='BirthYear'
          value= {formData.BirthYear}
          onChange={handleChange}
          fullWidth
          id="outlined-required"
          label="Birth Year"
          margin="dense"
          sx={{ width:'732px'}}
          placeholder='YYYY'
        />
        {BirthYearMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{BirthYearMessage}
                  </p>
                )}
        <TextField
          required
          fullWidth
          name='Country'
          value= {formData.Country}
          onChange={handleChange}
          id="outlined-required"
          label="Country"
          margin="dense"
          sx={{ width:'732px'}}
        />
        {CountryMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{CountryMessage}
                  </p>
                )}
        <TextField
          required
          fullWidth
          name='University'
          value= {formData.University}
          onChange={handleChange}
          id="outlined-required"
          label="University"
          margin="dense"
          sx={{ width:'732px'}}
        /><br/>
        {UniversityMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{UniversityMessage}
                  </p>
                )}
        <TextField
          required
          fullWidth
          name='Major'
          value= {formData.Major}
          onChange={handleChange}
          id="outlined-required"
          label="Major"
          margin="dense"
          sx={{ marginRight:"20px", width:'356px'}}
        />
        {MajorMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{MajorMessage}
                  </p>
                )}
        <TextField
          required
          fullWidth
          name='YearOfGraduation'
          value= {formData.YearOfGraduation}
          onChange={handleChange}
          id="outlined-required"
          label="Year of graduation"
          margin="dense"
          sx={{ width:'356px'}}
          placeholder='YYYY'
        />
        {YearOfGraduationMessage && (
                  <p style={{textAlign:'left', color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{YearOfGraduationMessage}
                  </p>
                )}
          <br />
        </div>
        <div>
          <Button sx={styleObj} onClick={()=>navigate('/ArticlePage')} variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} sx={styleObj} style={{ marginRight: '10px' }} variant="contained">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
