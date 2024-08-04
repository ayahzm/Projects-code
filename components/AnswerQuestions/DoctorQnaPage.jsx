import React from 'react'
import './DoctorQna.css';
import DrQuestionList from './DrQuestionList';



export const DoctorQnaPage = () => {
  return (
    <div className="qnapage">
    <div className='question-boxes'>
        
        <DrQuestionList/>
         
    </div>
    </div>
    
  )
}

export default DoctorQnaPage;