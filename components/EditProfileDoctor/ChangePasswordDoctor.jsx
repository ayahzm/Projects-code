import React, { useState, useEffect } from 'react';
import { Button, IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';

const ChangePasswordDoctor = () => {

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Password is changed!',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const navigate = useNavigate();
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(userData);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (!userData) {
      navigate('/ChangePasswordDoctor');
    }
  }, [navigate, userData]);

  const styleObj = {
    "&:hover": {
      backgroundColor: "#EFAE7D"
    },
    backgroundColor: "#EFAE7D",
    float: "right",
    marginTop: "5%",
    "&:focus": {
      outline: "none"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword();
    
    if (formData.currentPassword !== userData.Password) {
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      return;
    }
    else{
      const data = {
      Id: userData.Id,
      Password: formData.newPassword
    };
    axios.put(`https://localhost:44360/api/doctor/UpdateDrPass`, data)
      .then((response) => {
        if(response.data==="Password updated"){
          PopUp();
        }
        
      })
      .catch((error) => {
        alert('Error updating password:', error);
      });
    }
    
  };

  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [passwordVisible3, setPasswordVisible3] = useState(false);
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [messageType, setMessageType] = useState("");

  const PasswordInput = ({ notVisible, setVisible }) => {
    return (
      <InputAdornment position="end">
        <IconButton onClick={() => setVisible(!notVisible)}>
          {notVisible ? <RemoveRedEyeIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </InputAdornment>
    );
  };

  function checkPassword() {
    setMessage1(""); 
    setMessage2(""); 
    setMessage3(""); 
    setMessage4("");

    if (formData.currentPassword !== userData.Password) {
      setMessage4("Current Password is not correct");
      setMessageType("warning");
    }
    else if (formData.newPassword.length === 0) {
      setMessage3("Password cannot be empty");
      setMessageType("error3");
    } else if (formData.newPassword.length < 8) {
      setMessage2("Your password should be more than 8 characters");
      setMessageType("warning");
    } else if (formData.newPassword !== formData.confirmPassword) {
      setMessage1("Passwords don't match");
      setMessageType("error1");
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

  return (
    <div>
      <div style={{
        position: 'absolute', left: '55%', top: '56%',
        transform: 'translate(-50%, -50%)'
      }}>
        <div className="input" style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <input type={passwordVisible3 ? 'text' : 'password'} placeholder='Current Password *'
            name='currentPassword' value={formData.currentPassword} onChange={handleChange} />
          <PasswordInput notVisible={passwordVisible3} setVisible={setPasswordVisible3} />
        </div>
        {message4 && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getMessageIcon()}{message4}
          </p>
        )}

        <div className="input" style={{ paddingLeft: '20px', marginBottom: '15px' }}>
          <input type={passwordVisible1 ? 'text' : 'password'} placeholder='New Password *'
            name='newPassword' value={formData.newPassword} onChange={handleChange} />
          <PasswordInput notVisible={passwordVisible1} setVisible={setPasswordVisible1} />
        </div>
        {message2 && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getMessageIcon()}{message2}
          </p>
        )}
        {message3 && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getMessageIcon()}{message3}
          </p>
        )}

        <div className="input" style={{ paddingLeft: '20px' }}>
          <input type={passwordVisible2 ? 'text' : 'password'} placeholder='Confirm New Password *'
            name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
          <PasswordInput notVisible={passwordVisible2} setVisible={setPasswordVisible2} />
        </div>
        {message1 && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getMessageIcon()}{message1}
          </p>
        )}

        <Button onClick={() => navigate('/home')} sx={styleObj} variant="contained">
          Cancel
        </Button>
        <Button sx={styleObj} style={{ marginRight: '10px' }} variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  )
}
export default ChangePasswordDoctor;
