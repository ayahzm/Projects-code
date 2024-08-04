import React from 'react'
import './SearchResultsList.css';
import ArticlePage from '../Article/ArticlePage';

export const SearchResultsList = ({results}) => {
  return (
    <div className='results-list'>
        {
            results.map((result, id)=>{
                return <ArticlePage result={result} key={id}/>;
            })
        
        }
    </div>
  )
}