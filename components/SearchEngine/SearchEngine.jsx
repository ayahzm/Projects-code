import React, { useState,useEffect } from 'react';
import './SearchResultsList.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function SearchEngine({ searchTerm, setSearchTerm }) {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [titles,setTitles]= useState([]);

  // useEffect(() => {
  //   const GetTitles = async () => {
  //     const result = await axios.get('https://localhost:44360/api/Article/GetAllArticleTitles');
  //     setTitles(result.data);
  //     // console.log(data);
  //   }
  //   GetTitles();
  // }, []);

  // console.log(titles);

  // // Function to check if search term is a subsequence of the title
  // const isSubsequence = (search, title) => {
  //   let i = 0, j = 0;
  //   while (i < search.length && j < title.length) {
  //     if (search[i].toLowerCase() === title[j].toLowerCase()) {
  //       i++;
  //     }
  //     j++;
  //   }
  //   return i === search.length;
  // };

  //   // Filter titles based on the search term
  // const filteredTitles = titles.filter(title =>
  //   isSubsequence(searchTerm, title)
  // );

  

  return (
    <div style={{ padding: '20px' }}>
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', background:'#F0F0F0', borderRadius:'30px' }}
      >
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon style={{color:'#005077'}} />
        </IconButton>
        <InputBase
        className='search-input'
          sx={{ ml: 1, flex: 1, color:'#005077'}}
          placeholder="Type to search..."
          inputProps={{ 'aria-label': 'Type to search' }}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Paper>
    </div>
  );
}

export default SearchEngine;