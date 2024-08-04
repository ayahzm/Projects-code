import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';  
import './ArticlePage'
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';

function AdminArticleList(props){


    const navigate = useNavigate();
    const [data,setData] = useState([]);
    

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

    const [selectedArticle, setSelectedArticle] = useState(null);

    const GetData = async () => {
          const result = await axios.get(`https://localhost:44360/api/Article/GetAllArticles`);
          setData(result.data);
      }
    useEffect(()=>
      {
          GetData();
      }
      ,[])

      const DeleteArticle = (id) =>{
        try{
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonColor: "#fed3b2",
            cancelButtonColor: "#005077",
            confirmButtonText: "Yes",
            color: "#005077"
          }).then((result) => {
            if (result.isConfirmed) {
              axios.delete(`https://localhost:44360/api/Article/DeleteArticle?id=${id}`)
          .then((result)=>{
              GetData();
          
          })
              Swal.fire({
                title: "Deleted!",
                text: "Your medicine has been deleted.",
                color: "#005077",
                confirmButtonColor: "#005077"
              });
            }
          });
        }
          catch(error) {
              alert(error);
          };
      }

    const handleEditClick = (article) => {
        setSelectedArticle(article);
        navigate(`/edit/${article.Id}`);
    };
  

    return(
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {
            data && data.length>0?
            data.map((item,index)=>{
              return (
                <div key={index} className='Container'>
                   <div className='Article-box'>
                    <Grid container spacing={2} columns={16}>
                     <Grid item xs={8}>
                       <span style={{color:"#005077"}}>
                            Article {index+1}: <br/>
                            Title: {item.Title}<br/>Author: {item.Author}<br/>Date of release: {item.DateOfRelease.split('T')[0]}
                        </span> 
                     </Grid>
                     <Grid item xs={8}>
                        <div className='custom-buttons'>
                           <button onClick={()=>DeleteArticle(item.Id)} className="modify">Delete</button><br/>
                           <button onClick={() => handleEditClick(item)} className="modify">Update</button> 
                        </div> 
                     </Grid>
                    </Grid>        
                   </div>
                </div>
              )
            }):
            'Loading...'
            }
    </div>
    )
}


export default AdminArticleList; 