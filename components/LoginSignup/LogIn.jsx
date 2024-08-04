import React, { useState } from 'react'
import './LoginSignup.css'
import {IconButton, InputAdornment } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';

const Login = () => {

  const navigate= useNavigate();

  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleEmailChange = (value)=>{
    setEmail(value);
  }
  const handlePasswordChange = (value)=>{
    setPassword(value);
  }


  const ParentPopUp = () => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Parent user is valid',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const DoctorPopUp = () => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Doctor user is valid',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const AdminPopUp = () => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Admin account is valid',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  function checkInput() {
    setMessage1(""); 
    setMessage2("");

    if (email.length === 0)
     {
      setMessage1("email cannot be empty");
      setMessageType("error3");
    } 
    else if(password.length === 0){
      setMessage2("password cannot be empty");
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
  const handleLogin = () => {
  const loginData = {
    Email: email,
    Password: password
  };

  checkInput();
  
  const loginUrl = "https://localhost:44360/api/Test/Login";
  axios.post(loginUrl, loginData)
  
    .then((loginResult) => {
      
      if (loginResult.data === "Parent user is valid" || loginResult.data === "Doctor user is valid"||loginResult.data === "Admin acc is valid" ) {
            
        if (loginResult.data === "Parent user is valid") {
              const getUserInfoUrl = "https://localhost:44360/api/Test/GetUserInfo";
              axios.post(getUserInfoUrl, loginData)
              .then((userInfoResult) => {
              sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
              ParentPopUp();
              console.log(userInfoResult);
              navigate("/home");})

            } else if (loginResult.data === "Doctor user is valid") {
              const getUserInfoUrl2 = "https://localhost:44360/api/Test/GetUserInfo2";
              axios.post(getUserInfoUrl2, loginData)
              .then((userInfoResult) => {
              sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
              DoctorPopUp();
              console.log(userInfoResult);
              navigate("/ArticlePage");})
            }
            else if (loginResult.data === "Admin acc is valid") {
              console.log(loginResult.data);
              const getUserInfoUrl3 = "https://localhost:44360/api/Test/GetUserInfo3";
              axios.post(getUserInfoUrl3, loginData)
              .then((userInfoResult) => {
              sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));})
              AdminPopUp();
              navigate('/ArticleManagement');
            }

      } 
      else if(loginResult.data==="User is not valid"){
        setMessage3("Password is incorrect");
      }
    })
    .catch((loginError) => {
      alert(loginError);
    });
};


  const passstyle={
    "&:focus":{
      outline:"none"
     }, marginRight:"25px"
  }

    const [passwordVisible, setPasswordVisible] = useState(true);
    const PasswordInput = ({ visible, setVisible }) => {
        return (
          <InputAdornment position="end">
            <IconButton sx={passstyle} onClick={() => setVisible(!visible)}>
              {visible ? <VisibilityOffIcon  /> : <RemoveRedEyeIcon />}
            </IconButton>
          </InputAdornment>
        );
      };

      const Data = {
        Email: email
      };

  return (
    <div className='container' style={{
        position: 'absolute', left: '50%', top: '25%',
        transform: 'translate(-50%, -50%)', marginTop:"200px"
    }}>
        <div className='h'>
            <div className="text">Login</div>
            <div className="underline"></div>
        </div>
        <div className="inputs" style={{flexDirection:"column"}}> 
            <div className="input">
                <EmailIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="email" placeholder='Email *' onChange={(e) => handleEmailChange(e.target.value)}/>
            </div>
            {message1 && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            {getMessageIcon()}{message1}
          </p>
        )}
            <div className="input">
                <LockIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type={passwordVisible ? 'password' : 'text'} placeholder='Password *' onChange={(e) => handlePasswordChange(e.target.value)}
                />
                <PasswordInput visible={passwordVisible} setVisible={setPasswordVisible} />
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
        
            {/* <div className="forgot-password">Forgot your password? <span onClick={()=>navigate('/forgotpass', { state: { Data } })}>Click here</span></div> */}
            {/* <div><p>or</p></div>
            <div className="input">
                <GoogleIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>  
                <input type="google" placeholder='Continue with Google account'/>
            </div> */}
            <div className="submit-container">
               <button onClick={() => handleLogin()} className="account">Continue</button>
            </div>
        </div>
    </div>
  )
}

export default Login