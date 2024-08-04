import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import './QnaPage';
import './Question.css';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import Typography from '@mui/material/Typography';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import './QuestionList';
import Swal from 'sweetalert2';

function AskQuestion({fetchData,handleClose}) {
    const [children, setChildren] = useState([]);
    const [selectedChild, setSelectedChild] = useState(null);
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    const [question, setQuestion] = useState({
        QuestionContent: "",
        Answer: "",
        ParentId: 0,
        ChildId: 0
    });
    const apiUrl = 'https://localhost:44360/api/Question/AskNewQuestion';

    const PopUp = () => {
        Swal.fire({
          title: 'Succes!',
          text: 'Question is sent',
          confirmButtonText: 'Ok',
          color: "#005077",
          confirmButtonColor: "#005077"
        });
      };

    const AskNewQuestion = (e) => {
      e.preventDefault();
      const data = {
          QuestionContent: question.QuestionContent,
          Answer: "",
          ParentId: parseInt(userData.Id),
          ChildId: selectedChild
      };
      axios.post(apiUrl, data)
          .then((result) => {
            if(result.data==="Question Added"){
                fetchData();
                handleClose();
                 PopUp();
              setQuestion({
                  ...question,
                  QuestionContent: ""
              });
              setSelectedChild(null);
              console.log("New question submitted successfully");
              fetchData(); // Refresh data after successful submission
            }
             
          })
          .catch(error => {
              console.error('Error adding new question:', error);
          });
  }
  
 
  

    const onChange = (e) => {
        e.persist();
        setQuestion({
            ...question,
            [e.target.name]: e.target.value
        });
    }
    const buttonStyle = {
      color: 'white',
      "&:focus": {
          outline: "none"
      },
      "&:hover": {
          color: '#005077',
          background: 'white',
      }
  }

    const buttonStyle2 = {
      "&:focus": {
          outline: "none"
      },
      "&:hover": {
          color: '#005077',
          background: 'white',
      },
      background: selectedChild ? 'white !important' : 'transparent',
      color: selectedChild ? '#005077 !important' : 'white'
  }
  

    const buttonstyle = {
        color: '#005077',
        "&:focus": {
            outline: "none"
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await axios.get(`https://localhost:44360/api/child/GetAllChildren?id=${parseInt(userData.Id)}`);
                setChildren(result.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="Question">
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <Button sx={buttonStyle2} variant="contained" {...bindTrigger(popupState)}>
                            <ChildCareIcon style={{ height: '35px', width: '35px' }} />
                        </Button>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <div>
                                {children && children.length > 0 ? (
                                    children.map((item, index) => (
                                        <Typography key={index} sx={{ p: 2 }}>
                                            <Button sx={buttonstyle} onClick={() => { setSelectedChild(item.Id); popupState.close(); }}> {item.FirstName} </Button>
                                        </Typography>
                                    ))):'no children'}
                            </div>
                        </Popover>
                    </div>
                )}
            </PopupState>

            <form onSubmit={AskNewQuestion}>
                <input required type='text' placeholder='Ask A Question...*' name='QuestionContent' value={question.QuestionContent} onChange={onChange} />
            <Button type='submit' sx={buttonStyle} ><SendIcon fontSize='medium' /></Button>
            </form>
            
        </div>
    )
}
export default AskQuestion;
