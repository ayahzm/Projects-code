import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Grid, Container, Box, TextField, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';

const form = [
    { value: 'pdf', label: 'pdf' },
    { value: 'Microsoft word', label: 'word' },
    { value: 'Video', label: 'Video' },
    { value: 'Text', label: 'Text' },
    { value: 'Link', label: 'Link' },
];

function EditArticle() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        DoctorId: 0,
        Author: '',
        Title: '',
        Form: '',
        DateOfRelease: '',
        file: null,
        imageFile: null,
    });
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [messageType, setMessageType] = useState("");
    const [AuthorMessage, setAuthorMessage] = useState("");
    const [TitleMessage, setTitleMessage] = useState("");
    const [FormMessage, setFormMessage] = useState("");
    const [DateOfReleaseMessage, setDateOfReleaseMessage] = useState("");

    const PopUp = () => {
        Swal.fire({
            title: 'Success!',
            text: 'Article is updated',
            confirmButtonText: 'Ok',
            color: "#005077",
            confirmButtonColor: "#005077",
        });
    };

    function checkInputs() {
        setTitleMessage("");
        setAuthorMessage("");
        setFormMessage("");
        setDateOfReleaseMessage("");

        if (formData.Title.length === 0) {
            setTitleMessage("Title cannot be empty");
            setMessageType("error3");
            return false;
        } 
        if (formData.Author.length === 0) {
            setAuthorMessage("Author cannot be empty");
            setMessageType("error3");
            return false;
        }
        if (formData.Form.length === 0) {
            setFormMessage("Form of article cannot be empty");
            setMessageType("error3");
            return false;
        }
        if (formData.DateOfRelease.length === 0) {
            setDateOfReleaseMessage("Date of release cannot be empty");
            setMessageType("error3");
            return false;
        }
        return true;
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
    console.log(userData);

    useEffect(() => {
        const getArticle = async () => {
            try {
                const response = await axios.get(`https://localhost:44360/api/Article/GetArticleById?id=${parseInt(id)}`);
                setFormData(response.data);
                console.log(response.data);
            } catch (error) {
                alert('Error fetching article:', error);
            }
        };
        getArticle();
    }, [id]);

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!checkInputs()) return;
    
        const data = new FormData();
        data.append('Id', id);
        data.append('DoctorId', formData.DoctorId);
        data.append('Author', formData.Author);
        data.append('Title', formData.Title);
        data.append('Form', formData.Form);
        data.append('DateOfRelease', formData.DateOfRelease);
    
        // Conditionally append the article file if it exists
        if (formData.file) {
            data.append('file', formData.file);
        }
    
        // Conditionally append the image file if it exists
        if (formData.imageFile) {
            data.append('imageFile', formData.imageFile);
        }
    
        try {
            const response = await axios.post(`https://localhost:44360/api/Article/EditArticle`, data);
            if (response.data.Message === "Article Updated") {
                PopUp();
                if (userData.Email === 'Admin@gmail.com') {
                    navigate('/ArticleManagement');
                  } else {
                    navigate('/ArticlePage');
                  }
            }
        } catch (error) {
            alert('Error updating article:', error);
        }
    };
    


    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const name = event.target.name;

        setFormData(prevState => ({
            ...prevState,
            [name]: file,
        }));
    };

    return (
        <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
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
          <div><AttachFileIcon sx={{fontSize:"large",marginBottom:"-2%"}}/> Choose Article File</div>
          
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
                    <div className='header'> Edit Article </div>
                    <div className="form">
                        <Box sx={{ width: 1000, maxWidth: '100%', margin: 5 }}>
                            <TextField
                                required
                                value={formData.Title}
                                onChange={onChange}
                                name="Title"
                                fullWidth
                                label="Article Title"
                                margin="dense" />
                            <br />
                            {TitleMessage && (
                                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                                    {getMessageIcon()}{TitleMessage}
                                </p>
                            )}<br /><TextField
                                value={formData.Author}
                                onChange={onChange}
                                name="Author"
                                required
                                label="Article Author/Team of Authors"
                                margin="dense" /><br />
                            {AuthorMessage && (
                                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                                    {getMessageIcon()}{AuthorMessage}
                                </p>
                            )}
                            <TextField
                                value={formData.Form}
                                onChange={onChange}
                                name="Form"
                                id="outlined-multiline-flexible"
                                select
                                label="Form"
                                defaultValue="Pdf"
                                margin="dense"
                                helperText="Please select the form of the article"
                            >
                                {form.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <br />
                            {FormMessage && (
                                <p style={{ textAlign: "left", color: 'red', fontSize: '14px' }}>
                                    {getMessageIcon()}{FormMessage}
                                </p>
                            )}<br />
                            
                            <TextField
                                type='date'
                                value={formData.DateOfRelease.split('T')[0]}
                                onChange={onChange}
                                name="DateOfRelease"
                                id="outlined-multiline-flexible"
                                label="Date of release "
                                placeholder="YYYY-MM-DD"
                                multiline
                                required
                                maxRows={4}
                                margin="dense"
                            /><br />
                            
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
}

export default EditArticle;
