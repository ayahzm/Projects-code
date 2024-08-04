import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Card, CardActions, CardContent, Button, Typography, CardMedia, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { KeyboardArrowRight } from "@mui/icons-material";
import bgimg from '../Article/stethoscope.jpg';
import './HomePage';
import './Home.css';

function ArticlesList({ searchTerm }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(8);

  const handleExpandClick2 = () => {
    setVisibleArticles(prev => prev + 8);
  };

  const style = {
    border: "1px solid #ddd",
    color: "#005077",
    borderRadius: "30px",
    padding: "20px",
    margin: "10px",
    width: "300px",
    backgroundColor: "#dce3f7",
    boxShadow: " 0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
    height:320
  };

  useEffect(() => {
    const GetData = async () => {
      const result = await axios.get('https://localhost:44360/api/Article/GetAllArticles');
      setData(result.data);
    }
    GetData();
  }, []);

  const filteredData = data.filter(article =>
    article.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavoriteClick = async (article, articleId) => {
    try {
      const updatedData = data.map(article => {
        if (article.Id === articleId) {
          const newIsLiked = !article.IsLiked;
          return { ...article, IsLiked: newIsLiked };
        }
        return article;
      });
      setData(updatedData);

      await axios.put(`https://localhost:44360/api/Article/UpdateLikeStatus`, { ...article, IsLiked: updatedData.find(article => article.Id === articleId).IsLiked });
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const handleReadMoreClick = (articleUrl) => {
    window.open(articleUrl, '_blank');
  };

  return (
    <div>
      <div className="articles" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filteredData && filteredData.length > 0 ? (
          <>
            {filteredData.slice(0, visibleArticles).map((item, index) => (
              <Box key={index} className="article-box">
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
                    <Typography className='title' gutterBottom variant="h6" component="div">
                      {item.Title}
                    </Typography>
                    <Typography sx={{ textDecoration: "none", fontSize: '16px' }} variant="body" color="text.secondary">
                      {item.Author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="add to favorites" onClick={() => handleFavoriteClick(item, item.Id)}>
                      <FavoriteIcon style={{ color: item.IsLiked ? '#005077' : 'white' }} />
                    </IconButton>
                    <Button className='readmore' size="large" onClick={() => handleReadMoreClick(item.ArticleUrl)}>
                      Read More <KeyboardArrowRight />
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            ))}
          </>
        ) : (
          'Loading...'
        )}
      </div>
      {visibleArticles < filteredData.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button onClick={handleExpandClick2} className="see-more-button">
            See More
          </button>
        </div>
      )}
    </div>
  );
}

export default ArticlesList;
