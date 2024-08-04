import React, { useEffect, useState } from 'react';
import './ArticleStyle.css';
import AdminArticleList from './AdminArticleList.jsx';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
 const AdminArticlePage = () => {
const navigate= useNavigate();
  return (
    <div>
    <div className='Container' style={{
      position: 'absolute', left: '50%', top: '10%',
      transform: 'translate(-50%, -50%)'}}>
        
        <main>
        <div className="article-container">
          <AdminArticleList/>
          
          
        </div>
        </main>
        
    </div>
    <Button onClick={()=>navigate('/AddArticle')}><div title="Add Article" className='Add-Article'> +</div></Button>
    </div>
  )
}

export default AdminArticlePage;
