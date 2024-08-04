import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Collapse, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './DrQuestionList';
import SearchEngine from '../SearchEngine/SearchEngine';
function AnsweredQuestions(props) {
  const [data, setData] = useState([]);
  const [expandedMap, setExpandedMap] = useState({});
  const [children, setChildren] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [visibleQuestions, setVisibleQuestions] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const handleExpandClick2 = () => {
    setVisibleQuestions(prev => prev + 4);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`https://localhost:44360/api/Question/GetQuestionsByDoctorId?doctorId=${parseInt(userData.Id)}`);
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Initialize expandedMap with false for each question
    setExpandedMap(data.reduce((map, item, index) => {
        map[index] = false;
        return map;
    }, {}));
}, []);

const filteredData = data.filter(question =>
  question.QuestionContent.toLowerCase().includes(searchTerm.toLowerCase())
);

  
  const handleExpandClick = (index) => {
    setExpandedMap((prevMap) => ({
      ...prevMap,
      [index]: !prevMap[index],
    }));
  };

  return (
    <div>
        <div style={{marginLeft:"23.5%" ,width:"75vw "}}>
                <SearchEngine searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
    <div style={{ marginLeft: '20%'}} >
        
      {filteredData && filteredData.length > 0 ? (
        <>
        {filteredData.slice(0, visibleQuestions).map((item, index) => (
          <div key={index}  className='Container'>
            <div style={{width:"80vw", backgroundColor: '#e7f3f9'}} className='Question-box'>
              <div className='Q'>
                <strong>Question {index + 1}: </strong>
                <br />
                <span style={{ color: '#005077' }}>{item.QuestionContent}</span>
                <br />
                <hr style={{ borderColor: 'whitesmoke' }} />
                <em onClick={() => handleExpandClick(index)}>See Answer</em>
                <ExpandMoreIcon
                  style={{ float: 'right', cursor: 'pointer', transform: expandedMap[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  onClick={() => handleExpandClick(index)}
                  aria-expanded={expandedMap[index]}
                  aria-label='show more'
                />
                <Collapse in={expandedMap[index]} timeout='auto' unmountOnExit>
                  <Typography paragraph>{item.Answer===''?("Not answered yet..."): <div>{item.Answer}</div>}</Typography>
                </Collapse>
              </div>
            </div>
          </div>
        ))}
        {visibleQuestions < filteredData.length && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button style={{marginLeft: '25%'}} onClick={handleExpandClick2} className="see-more-button">
                See More
              </button>
            </div>
          )}
        </>
      ) : (
        <div style={{
          position: 'absolute', left: '50%', top: '30%',
          transform: 'translate(-20%, -50%)'}} >
        Loading...</div>
      )}
    </div>
    </div>
  );
}

export default AnsweredQuestions;
