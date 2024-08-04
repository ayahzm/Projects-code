import * as React from 'react';
import './Question.css'
import "./QnaPage"
import AskQuestion from './AskQuestion';
import QuestionList from './QuestionList';
import {
  Box, Backdrop, Modal, Fade, Button, Typography
} from '@mui/material';
import SearchEngine from '../SearchEngine/SearchEngine';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function QnaPage(props) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = useState('');

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

  const buttonStyle = {
    color: '#005077',
    background: 'white',
    float:"right",
    borderRadius:"10%",
    fontWeight:"bold",
    padding:"5px",
    marginBottom:"15px",
    "&:focus": {
        outline: "none"
    }
}


  return (
    <body>
    <div className="qnapage">
        <p style={{
            position: 'absolute', left: '50%', top: '12%',
            transform: 'translate(-50%, 0%)'}} className='subtitle'>Check out the latest questions asked by other parents below:</p>
        <main>
        <div className="question-boxes"> 
        <div style={{
            position: 'absolute', left: '50%', top: '18%',
            transform: 'translate(-50%, 0%)', width:'97vw'}} >
          <SearchEngine searchTerm={searchTerm} setSearchTerm={setSearchTerm} />        
        </div> 
          <QuestionList searchTerm={searchTerm}/>
          
        </div>
      </main>
      
    </div>
    </body>
  );
}

export default QnaPage;

