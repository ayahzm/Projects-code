import React from 'react';
import { useState } from 'react';
import './Home.css'; 
import MediaCard from './ArticleCard';
import ArticlesList from './ArticlesList';
import SearchEngine from '../SearchEngine/SearchEngine';

function HomePage() {

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [searchTerm, setSearchTerm] = useState('');
 console.log(userData);
  return (
    
    <div style={{
      position: 'absolute', left: '50%', top: '5%',
      transform: 'translate(-50%, 0%)'}} className="homepage">
      
        <h1>Hello {userData.MotherFname}, <br/>Welcome Back!</h1>
        
      
      <main className='AllPage'>
        <p className='subtitle'>Check out the latest articles below:</p>
        <SearchEngine searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="article-cards">
          <ArticlesList searchTerm={searchTerm}/>
        </div>
      </main>
    </div>
  );
}

export default HomePage;