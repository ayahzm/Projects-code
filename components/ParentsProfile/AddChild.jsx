import React, {useState} from 'react';
import axios from 'axios';
import { Grid,Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Swal from 'sweetalert2';
function AddChild({ onClose, GetData }){

    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [firstName,setFirstName]= useState("");
    const [lastName,setLastName]= useState("");
    const [birthyear,setBirthYear]= useState("");
    const [bloodtype,setBloodType]= useState("");
    const [weight,setWeight]= useState(0);
    const [medicalnotes,setMedicalNotes]= useState("");
    const [data,setData]=useState([]);
    const [messageType, setMessageType] = useState("");
    const [FirstNameMessage, setFirstNameMessage] = useState("");
    const [LastNameMessage, setLastNameMessage] = useState("");
    const [BirthYearMessage, setBirthYearMessage] = useState("");
    const [BloodTypeMessage, setBloodTypeMessage] = useState("");
    const [WeightMessage, setWeightMessage] = useState("");
    
    function checkInput() {
      setFirstNameMessage(""); 
      setLastNameMessage("");
      setBirthYearMessage("");
      setBloodTypeMessage("");
      setWeightMessage("");
  
      if (firstName.length === 0)
       {
        setFirstNameMessage("first name cannot be empty");
        setMessageType("error3");
      } 
      else if(lastName.length === 0){
        setLastNameMessage("last name cannot be empty");
        setMessageType("error3");
      }
      else if(birthyear.length === 0){
        setBirthYearMessage("birth year cannot be empty");
        setMessageType("error3");
      }
      else if(bloodtype.length === 0){
        setBloodTypeMessage("blood type cannot be empty");
        setMessageType("error3");
      }
      else if(weight.length === 0 || weight===0){
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

      const handleFirstNameChange = (value)=>{
        setFirstName(value);
      }
      const handleLastNameChange = (value)=>{
        setLastName(value);
      }
      const handleBirthYearChange = (value)=>{
        setBirthYear(value);
      }
      const handleBloodTypeChange = (value)=>{
        setBloodType(value);
      }
      const handleWeightChange = (value)=>{
        setWeight(value);
      }
      const handleMedicalNotesChange = (value)=>{
        setMedicalNotes(value);
      }
      
      const PopUp = () => {
        Swal.fire({
          title: 'Success!',
          text: 'Child profile is added',
          confirmButtonText: 'Ok',
          color: "#005077",
          confirmButtonColor: "#005077"
        });
      };

      const handleSave =() =>{
        checkInput();
        const data ={
          ParentId:userData.Id,
          FirstName:firstName,
          LastName:lastName,
          BirthYear:birthyear,
          BloodType:bloodtype,
          Weight:weight,
          MedicalNotes:medicalnotes
        };
         const url= "https://localhost:44360/api/child/AddNewChild";
      axios.post(url,data).then((result) =>{
        if(result.data==="Child added successfully"){
        PopUp();
        GetData();
        onClose();
        }
        
      }).catch((error) =>{
        alert(error);
      })
      }

      
      

    return(
        <div className='collect-data'>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid xs={2} sm={4} md={4}>
          <label>First name *</label><br/>
            <input required type='text' onChange={(e) => handleFirstNameChange(e.target.value)}/>
            {FirstNameMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{FirstNameMessage}
              </p>
            )}
          </Grid>
          <Grid xs={2} sm={4} md={4}>
          <label>Last Name *</label><br/>
          <input type='text' onChange={(e) => handleLastNameChange(e.target.value)}/>
          {LastNameMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{LastNameMessage}
              </p>
            )}
          </Grid>
          <Grid xs={2} sm={4} md={4}>
          <label>Birth Year *</label><br/>
          <input required type='number' onChange={(e) => handleBirthYearChange(e.target.value)}/>
          {BirthYearMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{BirthYearMessage}
              </p>
            )}
          </Grid>
          <Grid xs={2} sm={4} md={4}>
          <label>Blood Type *</label><br/>
          <input required type='text' onChange={(e) => handleBloodTypeChange(e.target.value)}/>
          {BloodTypeMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{BloodTypeMessage}
              </p>
            )}
          </Grid>
          <Grid xs={2} sm={4} md={4}>
          <label>Weight *</label><br/>
          <input required type='number' onChange={(e) => handleWeightChange(e.target.value)}/>
          {WeightMessage && (
              <p style={{ color: 'red', fontSize: '14px' }}>
               {getMessageIcon()}{WeightMessage}
              </p>
            )}
          </Grid>
          <Grid xs={2} sm={4} md={4}>
           <label>Medical History Note</label><br/>
          <input type='text' onChange={(e) => handleMedicalNotesChange(e.target.value)}/>
          </Grid>
          <Button onClick={handleSave}>Add</Button>
        </Grid>
        </div>
    )

}
export default AddChild;