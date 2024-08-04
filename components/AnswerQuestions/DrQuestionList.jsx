import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse, Fade, Backdrop, Box, CardMedia, Modal, Typography, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import Swal from 'sweetalert2';

function DrQuestionList(props) {
  const [data, setData] = useState([]);
  const [expandedMap, setExpandedMap] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(true);  // New state for loading
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px',
    boxShadow: 4,
    p: 4,
  };

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: "Question answered successfully",
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const handleOpen = async (id) => {
    try {
      const result = await axios.get(`https://localhost:44360/api/child/GetChildInfo/${id}`);
      console.log(result.data);
      setSelectedChild(result.data);
      setOpen(true);
    } catch (error) {
      console.error('Error fetching child data:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedChild(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://localhost:44360/api/Question/GetQuestionsWithEmptyAnswers');
        setData(result.data);
        setLoading(false);  // Set loading to false after data is fetched
        // Initialize expandedMap with false for each question
        setExpandedMap(result.data.reduce((map, item, index) => {
          map[index] = false;
          return map;
        }, {}));
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);  // Set loading to false even if there's an error
      }
    };

    fetchData();
  }, []);

  const handleExpandClick = (index) => {
    setExpandedMap((prevMap) => ({
      ...prevMap,
      [index]: !prevMap[index],
    }));
  };

  const handleAnswerQuestion = async (questionId, answer) => {
    try {
      await axios.put(`https://localhost:44360/api/Question/UpdateQuestion`, { Id: questionId, DoctorId: parseInt(userData.Id), Answer: answer });
      PopUp();
      // Clear the answer in the local state
      setData((prevData) =>
        prevData.map((item) =>
          item.Id === questionId ? { ...item, Answer: '' } : item
        )
      );
      // Refetch data after updating
      const result = await axios.get('https://localhost:44360/api/Question/GetQuestionsWithEmptyAnswers');
      setData(result.data);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  };

  const buttonstyle = {
    borderRadius: "5%",
    backgroundColor: '#005077',
    color: "white",
    float: 'right',
    '&:hover': {
      color: '#005077',
      backgroundColor: "#d0dff0"
    },
    "&:focus": {
      outline: 'none'
    }
  };

  return (
    <div style={{ position: 'absolute', left: '50%', top: '15%', transform: 'translate(-50%, 0%)' }} >
      {loading ? (
        <div className='Container' style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          Loading...
        </div>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <div className='Container' key={index}>
            <div className='Question-box'>
              <div className='Q'>
                <strong>Question {index + 1}: </strong>
                {item.ChildId !== 0 && (
                  <Button sx={buttonstyle} onClick={() => handleOpen(item.ChildId)}>See Child's Information</Button>
                )}
                <br />
                <span style={{ color: '#005077' }}>{item.QuestionContent}</span>
                <br />
                <hr style={{ borderColor: 'whitesmoke', marginBottom: "10px" }} />
                <div className="Answer">
                  <input
                    type='text'
                    placeholder='Type your answer...'
                    value={item.Answer || ''}
                    onChange={(e) => setData((prevData) => {
                      const newData = [...prevData];
                      newData[index].Answer = e.target.value; // Update answer in local state
                      return newData;
                    })}
                  />
                  <button onClick={() => handleAnswerQuestion(item.Id, item.Answer)}>
                    <SendIcon fontSize='Large' sx={{ color: 'white' }} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='Container' style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
          No questions unanswered.
        </div>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {selectedChild && (
              <>
                <Typography sx={{ fontWeight: "bold" }}>
                  Child Details:
                </Typography>
                <Typography paragraph>
                  {selectedChild.FirstName} {selectedChild.LastName} is a {2024 - selectedChild.BirthYear} years old Child<br />
                  Blood type: {selectedChild.BloodType} <br />
                  Weight: {selectedChild.Weight} Kg<br />
                  Medical History / Notes: <br />
                  {selectedChild.MedicalNotes}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default DrQuestionList;
