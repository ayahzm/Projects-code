import React, { useState,useEffect } from 'react'
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
import SchoolIcon from '@mui/icons-material/School';
import PublicIcon from '@mui/icons-material/Public';
import WcIcon from '@mui/icons-material/Wc';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const SignupAsDoctor = () => {

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Account request is Sent!',
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
  const [firstName,setFirstName]= useState("");
  const [lastName,setLastName]= useState("");
  const [major,setMajor]= useState("");
  const [university,setUniversity]= useState("");
  const [country,setCountry]= useState("");
  const [gender,setGender]= useState("");
  const [birthYear,setBirthYear]= useState(0);
  const [yearOfGraduation,setYearOfGraduation]= useState(0);
  const [medicalLicenseNb,setMedicalLicenseNb]= useState(0);
  const [MLNList,setMLNList]= useState([]);

  const [messageType, setMessageType] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [PasswordMessage, setPasswordMessage] = useState("");
  const [ConfirmedPasswordMessage, setConfirmedPasswordMessage] = useState("");
  const [FirstNameMessage,setFirstNameMessage ] = useState("");
  const [LastNameMessage, setLastNameMessage] = useState("");
  const [MajorMessage, setMajorMessage] = useState("");
  const [UniversityMessage, setUniversityMessage] = useState("");
  const [CountryMessage, setCountryMessage] = useState("");
  const [GenderMessage, setGenderMessage] = useState("");
  const [BirthYearMessage, setBirthYearMessage] = useState("");
  const [YearOfGraduationMessage, setYearOfGraduationMessage] = useState("");
  const [medicalLicenseNbMessage,setMedicalLicenseNbMessage]= useState("");
 console.log(MLNList);
  const handleEmailChange = (value)=>{
    setEmail(value);
  }
  const handlePasswordChange = (value)=>{
    setPassword(value);
  }
  const handleConfirmedPasswordChange = (value)=>{
    setConfirmedPassword(value);
  }
  const handleFirstNameChange = (value)=>{
    setFirstName(value);
  }
  const handleLastNameChange = (value)=>{
    setLastName(value);
  }
  const handleMajorChange = (value)=>{
    setMajor(value);
  }
  const handleUniversityChange = (value)=>{
    setUniversity(value);
  }
  const handleCountryChange = (value)=>{
    setCountry(value);
  }
  const handleGenderChange = (value)=>{
    setGender(value);
  }
  const handleBirthYearChange = (value)=>{
    setBirthYear(value);
  }
  const handleYearOfGraduationChange = (value)=>{
    setYearOfGraduation(value);
  }
  const handleMedicalLicenseNbChange = (value)=>{
    setMedicalLicenseNb(value);
  }

 useEffect(() => {
    const getEmailsUrl = "https://localhost:44360/api/Test/GetAllEmails";
      axios.post(getEmailsUrl)
      .then((emails) => {
      setEmailsList(emails.data);
      })
    
    const getMLNUrl = "https://localhost:44360/api/doctor/GetAllLicenses";
      axios.post(getMLNUrl)
      .then((licenses) => {
      setMLNList(licenses.data);
      })  
}, []);

function checkInputs() {
  let isValid = true;
  setEmailMessage("");
  setPasswordMessage("");
  setConfirmedPasswordMessage("");
  setFirstNameMessage("");
  setLastNameMessage("");
  setMajorMessage("");
  setUniversityMessage("");
  setCountryMessage("");
  setGenderMessage("");
  setBirthYearMessage("");
  setYearOfGraduationMessage("");
  setMedicalLicenseNbMessage("");

  if (email.length === 0) {
    setEmailMessage("Email cannot be empty");
    setMessageType("error3");
    isValid = false;
  } else if (emailsList.includes(email)) {
    setEmailMessage("Email is already in use");
    setMessageType("error1");
    isValid = false;
  }

  if (password.length === 0) {
    setPasswordMessage("Password cannot be empty");
    setMessageType("error3");
    isValid = false;
  } else if (password.length < 8) {
    setPasswordMessage("Your password should be more than 8 characters");
    setMessageType("warning");
    isValid = false;
  }

  if (password !== ConfirmedPassword) {
    setConfirmedPasswordMessage("Passwords don't match");
    setMessageType("error1");
    isValid = false;
  }

  if (firstName.length === 0) {
    setFirstNameMessage("First name cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (lastName.length === 0) {
    setLastNameMessage("Last name cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (major.length === 0) {
    setMajorMessage("Major cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (university.length === 0) {
    setUniversityMessage("University name cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (country.length === 0) {
    setCountryMessage("Country name cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (gender.length === 0) {
    setGenderMessage("Gender cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (birthYear.length === 0 || birthYear === 0) {
    setBirthYearMessage("Birth year cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (yearOfGraduation.length === 0 || yearOfGraduation === 0 ) {
    setYearOfGraduationMessage("Year of graduation cannot be empty");
    setMessageType("error3");
    isValid = false;
  }

  if (medicalLicenseNb.length === 0 || medicalLicenseNb === 0) {
    setMedicalLicenseNbMessage("Medical license number cannot be empty");
    setMessageType("error3");
    isValid = false;
  } else if (MLNList.includes(parseInt(medicalLicenseNb))) {
    setMedicalLicenseNbMessage("Medical license number is already in use");
    setMessageType("error1");
    isValid = false;
  }
  

  return isValid;
}

const handleSave = () => {
  if (!checkInputs()) {
      return; // Stop execution if there are validation errors
  }

  const data = {
      Email: email,
      Password: password,
      FirstName: firstName,
      LastName: lastName,
      Major: major,
      University: university,
      Country: country,
      Gender: gender,
      BirthYear: birthYear,
      YearOfGraduation: yearOfGraduation,
      MedicalLicenseNumber: medicalLicenseNb
  };

  const url = "https://localhost:44360/api/doctor/SendAccRequest";
  axios.post(url, data).then((result) => {
      if (result.data === "Data inserted") {
          const userdata = {
              Email: data.Email,
              Password: data.Password
          };
          const getUserInfoUrl = "https://localhost:44360/api/Test/GetUserInfo";
          axios.post(getUserInfoUrl, userdata)
              .then((userInfoResult) => {
                  sessionStorage.setItem('userData', JSON.stringify(userInfoResult.data));
              });
          PopUp();
          navigate("/");
      }
  }).catch((error) => {
      alert(error);
  });
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
                <input type="text" placeholder="First name *" onChange={(e) => handleFirstNameChange(e.target.value)}/>
            </div>
            {FirstNameMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{FirstNameMessage}
                  </p>
                )}
          </div>

            <div>
            <div className="input">
                <CalendarMonthIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input  type="number" placeholder="Birth Year *" onChange={(e) => handleBirthYearChange(e.target.value)} required/>
            </div>
            {BirthYearMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{BirthYearMessage}
                  </p>
                )}
          </div>

          <div>
           <div className="input">
                <SchoolIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Major *" onChange={(e) => handleMajorChange(e.target.value)}/>
            </div> 
            {MajorMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{MajorMessage}
                  </p>
                )}
          </div>

          <div>
            <div className="input">
                <PersonIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Last name *" onChange={(e) => handleLastNameChange(e.target.value)}/>
            </div>
            {LastNameMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{LastNameMessage}
                  </p>
                )}
          </div>
            
          <div>
            <div className="input">
                <WcIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input  type="text" placeholder="Gender *" onChange={(e) => handleGenderChange(e.target.value)} required/>
            </div>
            {GenderMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{GenderMessage}
                  </p>
                )}
          </div>
            
          <div>
            <div className="input">
                <SchoolIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="University *" onChange={(e) => handleUniversityChange(e.target.value)}/>
            </div>
            {UniversityMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{UniversityMessage}
                  </p>
                )}
          </div>
            
          <div>
            <div className="input">
                <PublicIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input type="text" placeholder="Country *" onChange={(e) => handleCountryChange(e.target.value)}/>
            </div>
            {CountryMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{CountryMessage}
                  </p>
                )}
          </div>

          <div>
            <div className="input">
                <SchoolIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input  type="number" placeholder="Medical license number *" onChange={(e) => handleMedicalLicenseNbChange(e.target.value)} required/>
            </div>
            {medicalLicenseNbMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{medicalLicenseNbMessage}
                  </p>
                )}
          </div>

          <div>
            <div className="input">
                <SchoolIcon style={{width: '50px', height: '50px', color: '#005077', marginRight: '20px', marginLeft:'15px'}}/>
                <input  type="number" placeholder="Year Of Graduation *" onChange={(e) => handleYearOfGraduationChange(e.target.value)} required/>
            </div>
            {YearOfGraduationMessage && (
                  <p style={{ color: 'red', fontSize: '14px' }}>
                    {getMessageIcon()}{YearOfGraduationMessage}
                  </p>
                )}
          </div>

          
            
            
        </div>
        <div className="forgot-password" style={{textAlign:"center"}}>Already have an Account? <span onClick={()=>navigate("/login")}>Click here</span></div>
        <div className="submit-container">
              <button onClick={() => handleSave()} className="account">Send Account Request</button>
        </div>
    </div>
  )
}

export default SignupAsDoctor