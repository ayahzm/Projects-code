import React, { useEffect, useState } from 'react';
import './ArticleStyle.css';
import DrArticleList from './DrArticleList.jsx';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

 const ArticlePage = () => {

  const navigate = useNavigate();
  return (
    <div>
    <div className='Container' style={{
      position: 'absolute', left: '50%', top: '10%',
      transform: 'translate(-50%, -50%)'}}>
        
        <main>
        <div className="article-container">
          <DrArticleList/>
          
          
        </div>
        </main>
        
    </div>
    <Button onClick={()=>navigate('/AddArticle')}><div title="Add Article" className='Add-Article'> +</div></Button>
 </div> )
}

export default ArticlePage;
