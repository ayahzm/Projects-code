import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardActions, CardContent, Button, Typography, CardMedia, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { KeyboardArrowRight } from "@mui/icons-material";
import bgimg from '../Article/stethoscope.jpg';
import SearchEngine from '../SearchEngine/SearchEngine';
import Swal from 'sweetalert2';
// import './HomePage';
import '../Homepage/Home.css';

function LikedArticles(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const handleReadMoreClick = (articleUrl) => {
    window.open(articleUrl, '_blank');
  };
  const handleExpandClick2 = () => {
    setVisibleArticles(prev => prev + 6);
  };

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Removed from your favorite articles',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const style = {
    border: "1px solid #ddd",
    color: "#005077",
    borderRadius: "30px",
    padding: "20px",
    margin: "10px",
    width: "350px",
    backgroundColor: "#dce3f7",
    boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    height:360
  };

  useEffect(() => {
    const GetData = async () => {
      const result = await axios.get('https://localhost:44360/api/Article/GetLikedArticles');
      setData(result.data);
      // console.log(data);
    }
    GetData();
  }, [data]);

  const filteredData = data.filter(article =>
    article.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log(data);

  const handleFavoriteClick = async (Article, articleId) => {
    try {
        // Update the local state first
        const updatedData = data.map(article => {
            if (article.Id === articleId) {
                // Toggle the isLiked state based on the current state in the database
                const newIsLiked = !article.IsLiked;
                return { ...article, IsLiked: newIsLiked };
            }
            return article;
        });
        setData(updatedData); // Update the local state
        PopUp();
        // Now, make the API call with the updated IsLiked value
        const response = await axios.put(`https://localhost:44360/api/Article/UpdateLikeStatus`, { ...Article, IsLiked: updatedData.find(article => article.Id === articleId).IsLiked });
        
    } catch (error) {
        console.error('Error updating like status:', error);
    }
};


  

  return (
    <div>
    <div style={{marginLeft:"26%" ,width:"70vw "}}>
     <SearchEngine searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
    <div style={{marginLeft:"20%" ,width:"80vw ",display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      
      {filteredData && filteredData.length > 0 ?
      <>
        {filteredData.slice(0, visibleArticles).map((item, index) => (
         
            <Box key={index}>
              <Card className='article-card' sx={style}>
              <CardMedia
                    className='image-article'
                    component="img"
                    height="140"
                    image={item.ImageUrl || bgimg}
                    alt={item.Title}
                    onError={(e) => e.target.src = bgimg}  // Handle broken image links
                  />

                <CardContent>
                  <Typography className='title' gutterBottom variant="h5" component="div">
                    {item.Title}
                  </Typography>
                  <Typography sx={{ textDecoration: "none" }} variant="body2" color="text.secondary">
                    {item.Author}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton aria-label="add to favorites" onClick={() => handleFavoriteClick(item,item.Id, item.IsLiked)}>
                    <FavoriteIcon style={{ color: item.IsLiked ? '#005077' : 'white' }} />
                  </IconButton>
                  {/* <IconButton aria-label="share">
                    <ShareIcon style={{ color: '#005077' }} />
                  </IconButton> */}
                  <Button onClick={() => handleReadMoreClick(item.ArticleUrl)} className='readmore' size="small">
                    Read More <KeyboardArrowRight />
                  </Button>
                </CardActions>
              </Card>
            </Box>
        ))}
        
          
          </>
         : (
          'Loading...'
        )}
    </div>{visibleArticles < filteredData.length && (
            <div style={{marginLeft:"250px", textAlign: 'center', marginTop: '20px' }}>
              <button onClick={handleExpandClick2} className="see-more-button">
                See More
              </button>
            </div>
          )}
    </div>
  );
}

export default LikedArticles;
