import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box,Backdrop,Modal,Fade,Card,CardActions,
    CardContent,Button,Typography,
    FormControlLabel,Switch,Grid,Paper} from '@mui/material';
import { useNavigate,useParams } from 'react-router-dom';   
import EditMedicine from './EditMedicine';
import Swal from 'sweetalert2';
import './MedicineTracker'
import Pic from '../../assets/AirBalloon.jpg';
function MedicineList({fetchData}){

  const { id } = useParams();
    const navigate = useNavigate();
    // const [open, setOpen] = React.useState(false);
    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);
    const [data,setData] = useState([]);
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    // const [selectedMedicine, setSelectedMedicine] = useState(null);
    

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:700,
      bgcolor: 'background.paper',
      border: '2px',
      boxShadow: 4,
      p: 4,
    };

    const buttonstyle={
      width:"90px",
      alignSelf:"center",
      backgroundColor:'#005077',
      color:"white",
      marginTop:'12px',
      fontWeight:"bold",
      '&:hover':{
        color:'#005077',
        backgroundColor:"transparent"
      },
      "&:focus":{
        outline: 'none'
      }
    }
    const GetData = async () => {
            const result = await axios.get(`https://localhost:44360/api/Medicine/GetAllMedicines?parentId=${parseInt(userData.Id)}`);
            setData(result.data);
        }
        
    useEffect(()=>
    {
       GetData(); 
    }
    ,[data])

    const DeleteMedicine = (id) =>{
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
            axios.delete(`https://localhost:44360/api/Medicine/DeleteMedicine?id=${id}`)
        .then((result)=>{
            fetchData();
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
        // const confirmed =window.confirm("are you sure you want to delete this medicine?");
        // if (confirmed) {
        // axios.delete(`https://localhost:44360/api/Medicine/DeleteMedicine?id=${id}`)
        // .then((result)=>{
            
        //     const GetData = async () => {
        //         const result = await axios.get(`https://localhost:44360/api/Medicine/GetAllMedicines?parentId=${parseInt(userData.Id)}`);
        //         setData(result.data);
        //     }
        //     GetData();
        // }
        
        // )}
      }
        catch(error) {
            alert(error);
        };
    }

    

//   const handleEditClick = (medicine) => {
//     setSelectedMedicine(medicine);
//     setOpen(true);
// };
  

    return(
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
        {
            data && data.length>0?
            data.map((item,index)=>{
              return (
                <Box key={index} sx={{ minWidth: 275 }}>
               <Card className='medicine-card' sx={{backgroundColor:"#dce3f7",}} variant="outlined">
               <CardContent>
                 <Typography sx={{fontSize:"20px"}}>{index+1}</Typography>
                 
                 {/* <Button onClick={() => handleEditClick(item)}>edit</Button>
  
                 <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Medicine <br/>
            </Typography>
            <Typography className="collect-data" id="transition-modal-description" sx={{ mt: 5 }}>
            <EditMedicine medicine={selectedMedicine} handleClose={handleClose} />
            </Typography>           
          </Box>
        </Fade>
        </Modal> */}
  
          <Typography sx={{color:"#005077",fontSize:"25px"}} variant="h5" component="div">
            {item.Name}
          </Typography>
            <Typography sx={{fontSize:"18px"}} variant="body2">
               {item.Note}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <FormControlLabel
              control={<Switch checked={item.Reminder} onChange={toggleReminder} />}
              label="Reminder"
            /> */}
            <Button sx={buttonstyle} size="small" onClick={()=>DeleteMedicine(item.Id)}>Remove</Button>
          </CardActions>
        </Card>
      </Box>
              )
            }): data && data.length === 0 ? (
              <div>
                <img src={Pic} alt="" style={{height:'100px', width:'100px', borderRadius:'50%'}}/>
                <p style={{color:'#005077', fontSize:'18px', fontWeight:'bold'}}>No Meds Today</p>
              </div>
            ):
            'Loading...'
            }
    </div>
    )
}


export default MedicineList; 