import React, { useState , useEffect} from 'react'
import './LoginSignup.css'
import axios from 'axios';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import {IconButton, InputAdornment } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import HomeIcon from '@mui/icons-material/Home';
const Signup = () => {

  const PopUp = () => {
    Swal.fire({
      title: 'Welcome!',
      text: 'Sign up is succesful',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };


  const navigate = useNavigate();

  const [email,setEmail]= useState("");
  const [emailsList,setEmailsList]= useState([]);
  const [password,setPassword]= useState("");
  const [ConfirmedPassword,setConfirmedPassword]= useState("");
  const [motherfname,setMotherfname]= useState("");
  const [motherlname,setMotherlname]= useState("");
  const [fatherfname,setFatherfname]= useState("");
  const [fatherlname,setFatherlname]= useState("");
  const [phonenb,setPhonenb]= useState(0);
  const [address,setAddress]= useState("");

  const [messageType, setMessageType] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [PasswordMessage, setPasswordMessage] = useState("");
  const [ConfirmedPasswordMessage, setConfirmedPasswordMessage] = useState("");
  const [MotherFnameMessage,setMotherFnameMessage ] = useState("");
  const [MotherLnameMessage, setMotherLnameMessage] = useState("");
  const [FatherFnameMessage, setFatherFnameMessage] = useState("");
  const [FatherLnameMessage, setFatherLnameMessage] = useState("");
  const [PhoneNbMessage, setPhoneNbMessage] = useState("");
  const [AddressMessage, setAddressMessage] = useState("");

  const handleEmailChange = (value)=>{
    setEmail(value);
  }
  const handlePasswordChange = (value)=>{
    setPassword(value);
  }
  const handleConfirmedPasswordChange = (value)=>{
    setConfirmedPassword(value);
  }
  const handleMotherfnameChange = (value)=>{
    setMotherfname(value);
  }
  const handleMotherlnameChange = (value)=>{
    setMotherlname(value);
  }
  const handleFatherfnameChange = (value)=>{
    setFatherfname(value);
  }
  const handleFatherlnameChange = (value)=>{
    setFatherlname(value);
  }
  const handlePhonenbChange = (value)=>{
    setPhonenb(value);
  }
  const handleAddressChange = (value)=>{
    setAddress(value);
  }

  useEffect(() => {
    const getEmailsUrl = "https://localhost:44360/api/Test/GetAllEmails";
      axios.post(getEmailsUrl)
      .then((emails) => {
      setEmailsList(emails.data);
      })
}, []);
  
 

  function checkInputs() {
    let isValid = true;
    setEmailMessage(""); 
    setPasswordMessage(""); 
    setMotherFnameMessage(""); 
    setMotherLnameMessage("");
    setFatherFnameMessage(""); 
    setFatherLnameMessage(""); 
    setPhoneNbMessage(""); 
    setAddressMessage("");
    setConfirmedPasswordMessage("");

    if (email.length === 0) {
      setEmailMessage("email cannot be empty");
      setMessageType("error3");
      isValid = false;
    } 
    else if (emailsList.includes(email)) {
      setEmailMessage("email is already in use");
      setMessageType("error1");
      isValid = false;
    }
    else if (password.length === 0) {
      setPasswordMessage("password cannot be empty");
      setMessageType("error3");
      isValid = false;
    }
    else if (password.length < 8) {
      setPasswordMessage("Your password should be more than 8 characters");
      setMessageType("warning");
      isValid = false;
    } 
    else if (password !== ConfirmedPassword) {
      setConfirmedPasswordMessage("Passwords don't match");
      setMessageType("error1");
      isValid = false;
    } 
    else if (motherfname.length === 0) {
      setMotherFnameMessage("mother first name cannot be empty");
      setMessageType("error3");
      isValid = false;
    } 
    else if (motherlname.length === 0) {
      setMotherLnameMessage("mother last name cannot be empty");
      setMessageType("error3");
      isValid = false;
    } 
    else if (fatherfname.length === 0) {
      setFatherFnameMessage("father first name cannot be empty");
      setMessageType("error3");
      isValid = false;
    } 
    else if (fatherlname.length === 0) {
      setFatherLnameMessage("father last name cannot be empty");
      setMessageType("error3");
      isValid = false;
    } 
    else if (phonenb.length === 0) {
      setPhoneNbMessage("phone number cannot be empty");
      setMessageType("error3");
      isValid = false;
    } 
    else if (address.length === 0) {
      setAddressMessage("address cannot be empty");
      setMessageType("error3");
      isValid = false;
    }

    return isValid;

  }

    const handleSave =() =>{
    if (!checkInputs()) {
      return; // Stop execution if there are validation errors
    }

    const data ={
      Email : email,
      Password: password,
      MotherFname:motherfname,
      MotherLname:motherlname,
      FatherFname:fatherfname,
      FatherLname:fatherlname,
      PhoneNumber:phonenb,
      Address:address
    };
     const url= "https://localhost:44360/api/Test/Registration";
  axios.post(url,data).then((result) =>{
    if(result.data=="Data inserted"){
      const userdata = {
      Email: data.Email,
      Password: data.Password
       };
      const getUserInfoUrl = "https://localhost:44360/api/Test/GetUserInfo";
      axios.post(getUserInfoUrl, userdata)
      .then((userInfoResult) => {
      sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
      })
      PopUp();
      navigate("/home");
    }
  }).catch((error) =>{
    alert(error);
  })
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

    const passstyle={
        "&:focus":{
          outline:"none"
         }, marginRight:"25px"
      }
    const [passwordVisible1, setPasswordVisible1] = useState(true);
    const [passwordVisible2, setPasswordVisible2] = useState(true);
    const PasswordInput = ({ visible, setVisible }) => {
        return (
          <InputAdornment position="end">
            <IconButton sx={passstyle} onClick={() => setVisible(!visible)}>
              {visible ? <VisibilityOffIcon /> : <RemoveRedEyeIcon />}
            </IconButton>
          </InputAdornment>
        );
      };
  return (
    <div className='container' 
    // style={{
    //     position: 'absolute', left: '50%', top: '25%',
    //     transform: 'translate(-50%, -50%)'
    // }}
    >
        <div className='h'>
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        <div className="inputs">

            <div>
            <div className="input">
                <PersonIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input required type="text" placeholder='email *' onChange={(e) => handleEmailChange(e.target.value)} />   
            </div>
            {EmailMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{EmailMessage}
                  </p>
                )}
            </div>
            
            <div>
            <div className="input">
            <LockIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type={passwordVisible1 ? 'password' : 'text'} placeholder='Password *' onChange={(e) => handlePasswordChange(e.target.value)}/>
                <PasswordInput visible={passwordVisible1} setVisible={setPasswordVisible1} />
                
            </div>
            {PasswordMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{PasswordMessage}
                  </p>
                )}
            </div>

            <div>
            <div className="input">
            <LockIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type={passwordVisible2 ? 'password' : 'text'} placeholder='Confirm Password *' onChange={(e) => handleConfirmedPasswordChange(e.target.value)}/>
                <PasswordInput visible={passwordVisible2} setVisible={setPasswordVisible2} />
                
            </div>
            {ConfirmedPasswordMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{ConfirmedPasswordMessage}
                  </p>
                )}
            </div>


            <div>
            <div className="input">
                <PersonIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Mother's First name *" onChange={(e) => handleMotherfnameChange(e.target.value)}/>
                
            </div>
            {MotherFnameMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{MotherFnameMessage}
                  </p>
                )}
            </div>

            <div>
            <div className="input">
                <PersonIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Father's First name *" onChange={(e) => handleFatherfnameChange(e.target.value)}/>    
            </div>
            {FatherFnameMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{FatherFnameMessage}
                  </p>
                )}
            </div>

            <div>
            <div className="input">
                <PhoneIphoneIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="number" placeholder="Phone Number *" onChange={(e) => handlePhonenbChange(e.target.value)}/>
                
            </div>
            {PhoneNbMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{PhoneNbMessage}
                  </p>
                )}
            </div>

            <div>
            <div className="input">
                <PersonIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Mother's Last name *" onChange={(e) => handleMotherlnameChange(e.target.value)}/>
                
            </div>
            {MotherLnameMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{MotherLnameMessage}
                  </p>
                )}
            </div>

            <div>
            <div className="input">
                <PersonIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Father's Last name *" onChange={(e) => handleFatherlnameChange(e.target.value)}/>
                
            </div>
            {FatherLnameMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{FatherLnameMessage}
                  </p>
                )}
            </div>

            <div>
            <div className="input">
                <HomeIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input  type="text" placeholder="Address *" onChange={(e) => handleAddressChange(e.target.value)} required/>
                
            </div>
            {AddressMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{AddressMessage}
                  </p>
                )}
            </div>
          
        </div>
        <div className="forgot-password" style={{textAlign:"center"}}>Already have an Account? <span onClick={()=>navigate("/login")}>Click here</span></div>
        <div className="submit-container">
              <button onClick={() => handleSave()} className="account">Continue</button>
        </div>
    </div>
  )
}

export default Signup