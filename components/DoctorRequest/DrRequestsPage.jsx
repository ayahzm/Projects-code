import React from 'react';
import './DrRequest.css';
import DrRequestsList from './DrRequestsList';

const DrRequestsPage = () => {
    
  return (
    <div 
    style={{
      position: 'absolute', left: '50%', top: '15%',
      transform: 'translate(-50%, 0%)'}}
   className='drrequestpage'>
      <h1>Doctor Requests</h1>
      <main style={{width:"93vw"}}>        
        <p className='subTitle'>Choose a Doctor to add to your team:</p>
        <div className='request-cards'>
            <DrRequestsList/>        
        </div>
      </main>
    </div>
  );
};

export default DrRequestsPage;
