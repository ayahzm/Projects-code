import React, { useState } from 'react';
import './AddArticle.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';

const formOptions = [
  { value: 'pdf', label: 'PDF' },
  { value: 'Microsoft word', label: 'Word' },
  { value: 'Video', label: 'Video' },
  { value: 'Text', label: 'Text' },
  { value: 'Link', label: 'Link' },
];

const AddArticle = () => {
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    DoctorId: userData && userData.Email === 'Admin@gmail.com' ? 0 : userData ? userData.Id : 0,
    Author: '',
    Title: '',
    Form: '',
    DateOfRelease: '',
    ArticleUrl: '',
    ImageUrl: ''
  });

  const [messageType, setMessageType] = useState("");
  const [AuthorMessage, setAuthorMessage] = useState("");
  const [TitleMessage, setTitleMessage] = useState("");
  const [FormMessage, setFormMessage] = useState("");
  const [DateOfReleaseMessage, setDateOfReleaseMessage] = useState("");

  const apiurl = 'https://localhost:44360/api/Article/AddNewArticle';

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Article is added',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const checkInputs = () => {
    setTitleMessage("");
    setAuthorMessage("");
    setFormMessage("");
    setDateOfReleaseMessage("");

    if (article.Title.length === 0) {
      setTitleMessage("Title cannot be empty");
      setMessageType("error");
    } else if (article.Author.length === 0) {
      setAuthorMessage("Author cannot be empty");
      setMessageType("error");
    } else if (article.Form.length === 0) {
      setFormMessage("Form of article cannot be empty");
      setMessageType("error");
    } else if (article.DateOfRelease.length === 0) {
      setDateOfReleaseMessage("Date of release cannot be empty");
      setMessageType("error");
    }
  };

  const getMessageIcon = () => {
    switch (messageType) {
      case "error":
        return <ErrorOutlineIcon style={{ color: 'red', verticalAlign: 'middle' }} />;
      case "warning":
        return <WarningAmberIcon style={{ color: 'red', verticalAlign: 'middle' }} />;
      case "success":
        return <CheckCircleOutlineIcon style={{ color: 'green', verticalAlign: 'middle' }} />;
      default:
        return null;
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const name = event.target.name;

    setArticle(prevState => ({
      ...prevState,
      [name]: file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    checkInputs();

    if (!TitleMessage && !AuthorMessage && !FormMessage && !DateOfReleaseMessage) {
        const formData = new FormData();
        formData.append("file", article.ArticleUrl);

        // Append image file only if selected
        if (article.ImageUrl) {
            formData.append("imageFile", article.ImageUrl);
        }

        formData.append("DoctorId", article.DoctorId);
        formData.append("Author", article.Author);
        formData.append("Title", article.Title);
        formData.append("Form", article.Form);
        formData.append("DateOfRelease", article.DateOfRelease);

        try {
            const response = await axios.post(apiurl, formData);
            if (response.data.Message === "Article Added") {
                PopUp();
                if (userData.Email === 'Admin@gmail.com') {
                    navigate('/ArticleManagement');
                } else {
                    navigate('/ArticlePage');
                }
            }
        } catch (error) {
            console.error("Article submission error:", error);
        }
    }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div style={{ position: 'absolute', left: '50%', top: '40%', transform: 'translate(-50%, -50%)' }}>
      <Container>
        <div className="container">
        <div style={{marginTop:"2%",marginLeft:"32%"}}>
<Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          style={{ marginBottom: '10px', background: '#005770' }}
        >
          <div><AttachFileIcon sx={{fontSize:"large",marginBottom:"-2%"}}/> Choose Article File *</div>
          
          <input
            type="file"
            name="ArticleUrl"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Button>
 
<Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          style={{marginLeft:"15px" ,marginBottom: '10px', background: '#005770' }}
        >
          
          <div><ImageIcon sx={{fontSize:"large",marginBottom:"-2%"}}/> Choose Article Image</div>
          <input
            type="file"
            name="ImageUrl"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Button>
</div>
          <div className='header'>Add Article</div>
          <div className="form">
            <Box sx={{ width: 1000, maxWidth: '100%', margin: "5%" }}>
              <TextField 
                value={article.Title} 
                onChange={handleChange} 
                name="Title" 
                label="Article Title" 
                margin="dense" 
                required
              />
              {TitleMessage && (
                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                  {getMessageIcon()}{TitleMessage}
                </p>
              )}
              <br />
              <TextField
                value={article.Form}
                onChange={handleChange}
                name="Form"
                select
                label="Form"
                margin="dense"
                helperText="Please select the form of the article"
              >
                {formOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {FormMessage && (
                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                  {getMessageIcon()}{FormMessage}
                </p>
              )}
              <br />
              <TextField 
                value={article.Author} 
                onChange={handleChange} 
                name="Author" 
                label="Article Author" 
                margin="dense" 
                required
              />
              {AuthorMessage && (
                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                  {getMessageIcon()}{AuthorMessage}
                </p>
              )}
              <br />
              <TextField
                type='date'
                value={article.DateOfRelease}
                onChange={handleChange}
                name="DateOfRelease"
                helperText="Date of release *"
                margin="dense"
                required
              />
              {DateOfReleaseMessage && (
                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                 
{getMessageIcon()}{DateOfReleaseMessage}
</p>
)}
<div className="Post-container">
<button onClick={handleSubmit} className="Post">Submit</button>
</div>
</Box>
</div>
</div>
</Container>
</div>
);
};

export default AddArticle;