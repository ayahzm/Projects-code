import React from 'react'
import TextField from '@mui/material/TextField';
import SideBar from './SideBar';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';

const Info = () => {


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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const [messageType, setMessageType] = useState("");
  const [EmailMessage, setEmailMessage] = useState("");
  const [FirstNameMessage,setFirstNameMessage ] = useState("");
  const [LastNameMessage, setLastNameMessage] = useState("");
  const [MajorMessage, setMajorMessage] = useState("");
  const [UniversityMessage, setUniversityMessage] = useState("");
  const [CountryMessage, setCountryMessage] = useState("");
  const [BirthYearMessage, setBirthYearMessage] = useState("");
  const [YearOfGraduationMessage, setYearOfGraduationMessage] = useState("");

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

  useEffect(() => {
    
        const fetchData = async () => {
          try {
            if (userData) {
              setFormData({
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
              navigate('/Info');
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
              sessionStorage.setItem('userData', JSON.stringify(data));
              navigate('/Info');
            }
              
          })
          .catch((error) => {
              alert('Error updating doctor info:', error);
          });
  };

  return (
    <div>
          
        <SideBar/>
    <div style={{
        position: 'absolute', left: '50%', top: '53%',
        transform: 'translate(-40%, -50%)'
    }}>
        <div className='form-wrapper'> 
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
        {/* <FormControl >
      <FormLabel id="demo-row-radio-buttons-group-label" style={{color: 'Grey'}}>Gender *</FormLabel>
      <RadioGroup
        required
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
      </RadioGroup>
    </FormControl> */}
    </div>
    <div>
    <Button sx={styleObj} onClick={()=>{navigate('./ArticlePage')}} variant="contained">
        Cancel
      </Button>
      <Button onClick={handleSubmit} sx={styleObj} style={{marginRight: '10px'}} variant="contained">
        Save
      </Button>
    </div>
    </div>
    </div>
  )
}

export default Info;