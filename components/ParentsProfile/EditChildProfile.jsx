import React, { useEffect, useState } from 'react';
import {
    Button,
    Grid} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function EditChildProfile({ child, onClose, GetData }) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [messageType, setMessageType] = useState("");
    const [FirstNameMessage, setFirstNameMessage] = useState("");
    const [LastNameMessage, setLastNameMessage] = useState("");
    const [BirthYearMessage, setBirthYearMessage] = useState("");
    const [BloodTypeMessage, setBloodTypeMessage] = useState("");
    const [WeightMessage, setWeightMessage] = useState("");
    const userData = JSON.parse(sessionStorage.getItem('userData')); 
    function checkInput() {
      setFirstNameMessage(""); 
      setLastNameMessage("");
      setBirthYearMessage("");
      setBloodTypeMessage("");
      setWeightMessage("");
  
      if (formData.FirstName.length === 0)
       {
        setFirstNameMessage("first name cannot be empty");
        setMessageType("error3");
      } 
      else if(formData.LastName.length === 0){
        setLastNameMessage("last name cannot be empty");
        setMessageType("error3");
      }
      else if(formData.BirthYear.length === 0){
        setBirthYearMessage("birth year cannot be empty");
        setMessageType("error3");
      }
      else if(formData.BloodType.length === 0){
        setBloodTypeMessage("blood type cannot be empty");
        setMessageType("error3");
      }
      else if(formData.Weight.length === 0 || formData.Weight===0){
        setWeightMessage("weight cannot be empty");
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
    FirstName: '',
    LastName: '',
    BirthYear: 0,
    BloodType: '',
    Weight: 0,
    MedicalNotes:''
});

const PopUp = () => {
  Swal.fire({
    title: 'Success!',
    text: 'Child profile is Updated',
    confirmButtonText: 'Ok',
    color: "#005077",
    confirmButtonColor: "#005077"
  });
};

useEffect(() => {
  
  const fetchData = async () => {
    try {
      if (child) {
        setFormData({
          FirstName: child.FirstName || '',
          LastName: child.LastName || '',
          BirthYear: child.BirthYear || 0,
          BloodType: child.BloodType || '',
          Weight: child.Weight || 0,
          MedicalNotes: child.MedicalNotes || ''
        });
      } else {
        alert('Child data is null.');
        navigate('/ChildrenProfile');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchData();
}, [child,navigate]);


const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prevState => ({
  ...prevState,
  [name]: value
  
}));
};


const handleSubmit = (e) => {
  e.preventDefault();
  checkInput();
  const data = {
    Id: child.Id,
      ...formData
  };
  axios.put(`https://localhost:44360/api/child/UpdateChild`, data)
      .then((response) => {
          if(response.data==="Data updated"){
           
            GetData();
            onClose();
          PopUp();
          navigate('/ChildrenProfile');
          }
      })
      .catch((error) => {
          alert('Error updating child info:', error);
      });
};

return(
    <div className='collect-data'>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      <Grid xs={2} sm={4} md={4}>
      <label>First name *</label><br/>
        <input required type='text' name='FirstName'
          value= {formData.FirstName}
          onChange={handleChange}/>
          {FirstNameMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{FirstNameMessage}
              </p>
            )}
      </Grid>
      <Grid xs={2} sm={4} md={4}>
      <label>Last Name *</label><br/>
      <input type='text' name='LastName'
          value= {formData.LastName}
          onChange={handleChange}/>
          {LastNameMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{LastNameMessage}
              </p>
            )}
      </Grid>
      <Grid xs={2} sm={4} md={4}>
      <label>Birth Year *</label><br/>
      <input required type='number' name='BirthYear'
          value= {formData.BirthYear}
          onChange={handleChange}/>
          {BirthYearMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{BirthYearMessage}
              </p>
            )}
      </Grid>
      <Grid xs={2} sm={4} md={4}>
      <label>Blood Type *</label><br/>
      <input required type='text' name='BloodType'
          value= {formData.BloodType}
          onChange={handleChange}/>
          {BloodTypeMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{BloodTypeMessage}
              </p>
            )}
      </Grid>
      <Grid xs={2} sm={4} md={4}>
      <label>Weight *</label><br/>
      <input required type='number' name='Weight'
          value= {formData.Weight}
          onChange={handleChange}/>
          {WeightMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{WeightMessage}
              </p>
            )}
      </Grid>
      <Grid xs={2} sm={4} md={4}>
       <label>Medical History Note</label><br/>
      <input type='text' name='MedicalNotes'
          value= {formData.MedicalNotes}
          onChange={handleChange}/>
      </Grid>
      <Button onClick={handleSubmit} >Save</Button>
    </Grid>
    </div>
)

}
export default EditChildProfile;
