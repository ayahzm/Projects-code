import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Collapse, Typography, Modal, Fade, Backdrop, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './AskQuestion';
import CloseIcon from '@mui/icons-material/Close';
import AskQuestion from './AskQuestion';

function QuestionList({ searchTerm }) {
  const [data, setData] = useState([]);
  const [expandedMap, setExpandedMap] = useState({});
  const [visibleQuestions, setVisibleQuestions] = useState(4);
  const [selectedDoctors, setSelectedDoctors] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const buttonStyle = {
    color: '#005077',
    background: 'white',
    float: "right",
    borderRadius: "10%",
    fontWeight: "bold",
    padding: "5px",
    marginBottom: "15px",
    "&:focus": {
      outline: "none"
    }
  }

  const handleExpandClick2 = () => {
    setVisibleQuestions((prev) => prev + 4);
  };

  const fetchData = async () => {
    const result = await axios.get('https://localhost:44360/api/Question/GetAllQuestions');
    setData(result.data);
    // Initialize expandedMap with false for each question
    setExpandedMap(result.data.reduce((map, item) => {
      map[item.id] = false;
      return map;
    }, {}));
  }

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = data.filter((question) =>
    question.QuestionContent.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExpandClick = async (index, id) => {
    if (id && id !== 0 && !selectedDoctors[index]) {  // Check if id is not null or undefined and doctor info is not already fetched
      const result = await axios.get(`https://localhost:44360/api/doctor/GetDoctorInfo/${id}`);
      setSelectedDoctors((prev) => ({
        ...prev,
        [index]: result.data,
      }));
    }
    setExpandedMap((prevMap) => ({
      ...prevMap,
      [index]: !prevMap[index],
    }));
  };

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

  return (
    <>
      <div style={{ position: 'absolute', left: '50%', top: '27%', transform: 'translate(-50%, 0%)' }}>
        {filteredData && filteredData.length > 0 ? (
          <>
            {filteredData.slice(0, visibleQuestions).map((item, index) => (
              <div key={item.id} className='Container'>
                <div className='Question-box' style={{ backgroundColor: "#dce3f7" }}>
                  <div className='Q'>
                    <strong>Question {index + 1}: </strong>
                    <br />
                    <span style={{ color: '#005077' }}>{item.QuestionContent}</span>
                    <br />
                    <hr style={{ borderColor: 'whitesmoke' }} />
                    <em style={{ cursor: "pointer" }} onClick={() => handleExpandClick(index, item.DoctorId)}>See Answer</em>
                    <ExpandMoreIcon
                      style={{ float: 'right', cursor: 'pointer', transform: expandedMap[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      onClick={() => handleExpandClick(index, item.DoctorId)}
                      aria-expanded={expandedMap[index]}
                      aria-label='show more'
                    />
                    <Collapse in={expandedMap[index]} timeout='auto' unmountOnExit>
                      <Typography paragraph>{item.Answer === '' ? 'Not answered yet...' : item.Answer}</Typography>
                      {item.DoctorId === 2 && item.Answer !== '' && (
                        <Typography paragraph>Answer by Admin</Typography>
                      )}
                      {item.DoctorId && item.DoctorId !== 2 && selectedDoctors[index] && (
                        <Typography paragraph>
                          Answer by Dr. {selectedDoctors[index].FirstName} {selectedDoctors[index].LastName}
                        </Typography>
                      )}
                    </Collapse>
                  </div>
                </div>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  slots={{ backdrop: Backdrop }}
                  slotProps={{
                    backdrop: {
                      timeout: 500,
                    },
                  }}
                >
                  <Fade in={open}>
                    <Box sx={style}>
                      <Button onClick={handleClose} sx={buttonStyle}><CloseIcon /></Button>
                      <AskQuestion fetchData={fetchData} handleClose={handleClose} />
                    </Box>
                  </Fade>
                </Modal>
              </div>
            ))}
            {visibleQuestions < filteredData.length && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button onClick={handleExpandClick2} className="see-more-button">
                  See More
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            Loading...
          </div>
        )}
      </div>
      <button onClick={handleOpen} className='Ask-question' title='Ask a Question'>Ask a Question</button>
    </>
  );
}

export default QuestionList;
