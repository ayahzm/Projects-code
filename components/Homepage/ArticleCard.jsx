import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton from '@mui/material/IconButton';
import { KeyboardArrowRight, KeyboardArrowLeft } from "@mui/icons-material";

import "./HomePage";
import "./Home.css";
import bgimg from '../Article/stethoscope.jpg';

function MediaCard({ article }) {
    const style={
        border: "1px solid #ddd",
        color: "#005077",
        borderRadius: "30px",
        padding: "20px",
        margin: "10px",
        width: "300px",
        backgroundColor: "#fed3b2",
        boxShadow:" 0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s ease"
      };

  return (
    <div>
    <Card className="article-card" sx={style}>
      <CardMedia className='image-article'
        component="img"
        height="140"
        image={bgimg}
        alt="article 1"
        />
      
      <CardContent>
        <Typography className='title' gutterBottom variant="h5" component="div">
          {article.title}
        </Typography>
        <Typography sx={{textDecoration:"none"}} variant="body2" color="text.secondary">
        {article.content}
        </Typography>
      </CardContent>
      <CardActions>
       <IconButton aria-label="add to favorites">
          <FavoriteIcon style={{color: '#005077'}}/>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon style={{color: '#005077'}}/>
        </IconButton>
        <Button className='readmore' size="small">
          Read More <KeyboardArrowRight/> 
        </Button>
        
        
      </CardActions>
    </Card>
    </div>
  );
}

export default MediaCard;