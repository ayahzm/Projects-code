import React, { useState, useEffect } from 'react';
import {
  Box, Backdrop, Modal, Fade, Button, Typography
} from '@mui/material'
import './MedicineStyle.css'
import AddMedicine from './AddMedicine';
import MedicineList from "./MedicineList";
import Pic from '../../assets/AirBalloon.jpg';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import   {useMediaQuery,useTheme}  from "@mui/material";
import { FixedSizeList } from 'react-window';
import EditMedicine from './EditMedicine';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';


const MedicineTracker = () => {

  const [data,setData]=useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  const buttonstyle={
    width:"110px",
    alignSelf:"center",
    backgroundColor:'#005077',
    color:"white",
    marginTop:'12px',
    fontWeight:"bold",
    '&:hover':{
      color:'#005077',
      backgroundColor:"#d0dff0"
    },
    "&:focus":{
      outline: 'none'
    }
  }


  // function refresh(){
  //   const GetData = async () => {
  //     const result = await axios.get(`https://localhost:44360/api/Medicine/GetAllMedicines?parentId=${parseInt(userData.Id)}`);
  //     setData(result.data);
  // }
  // GetData();
  // }

  const GetData = async () => {
            const result = await axios.get(`https://localhost:44360/api/Medicine/GetAllMedicines?parentId=${parseInt(userData.Id)}`);
            setData(result.data);
        }

  useEffect(()=>
    {
        
        GetData();
    }
    ,[])

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

    function renderRow({index, style}) {
      const item = data[index];
      return (
        <>
        <ListItem style={style} key={index} component="div" disablePadding>
  
    <ListItemText  style={{fontSize: '16px'}} primary={item.Name} />
    <Button sx={{color:'#005077'}} onClick={() => handleEditClick(item)}><EditIcon/></Button>
    <Button sx={{color:'#005077'}} onClick={()=>DeleteMedicine(item.Id)}><DeleteIcon/></Button>
 
</ListItem>

        
        </>
      );
    }

    const handleEditClick = (medicine) => {
      setSelectedMedicine(medicine);
      setOpen(true);
  };
    

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px',
    boxShadow: 4,
    p: 4,
  };
const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  



  // const toggleReminder = (index) => {
  //   const updatedMedicines = [...medicines];
  //   updatedMedicines[index].reminder = !updatedMedicines[index].reminder;
  //   setMedicines(updatedMedicines);
  // };

  return (
    <div>
      {isMatch ? (
        <div
        style={{
          position: 'absolute',right:'15%', top: '20%',
        }}
        className='medicinepage'>
  
        
  
        <h1 className=''>Medicine Tracker</h1>
        <main className='wholePage' style={{width:"70%"}}>
  
          <p className='subtitle'>Track your kid's medicine:</p>
          <Button sx={buttonstyle} onClick={handleOpen2} >Add new Medicine</Button>
          <div className='medicine-cards'>
  
  
  
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={open2}
              onClose={handleClose2}
              closeAfterTransition
              slots={{ backdrop: Backdrop }}
              slotProps={{
                backdrop: {
                  timeout: 500,
                },
              }}
            >
              <Fade in={open2}>
                <Box sx={style}>
                  <Typography id="transition-modal-title" variant="h6" component="h2">
                    Add Medicine <br />
                  </Typography>
                  <Typography className="collect-data" id="transition-modal-description" sx={{ mt: 5 }}>
                    <AddMedicine fetchData={GetData} handleClose2={handleClose2}/> 
                  </Typography>
                </Box>
                
              </Fade>
            </Modal>
            <MedicineList fetchData={GetData} />
            
            <br/>
            
          </div>
  
        </main>
      </div>
      ):(
        <>
        
        <Box
            sx={{zIndex: 1000, height: 400, Width: 160,position: 'absolute',left:'5%', top: '20%', bgcolor: 'transparent' }}
          >
            <h1 style={{fontSize: '22px', width:  '250px',
        background: "#e7f3f9",color:'#005077',marginTop: '-3%',marginLeft: '-3%' ,padding:"5%", borderRadius: '50px'}}>
          Your Medicine List
        </h1>
            <FixedSizeList
              height={400}
              width={260}
              itemSize={50}
              itemCount={data.length}
              overscanCount={5}
            >
              {renderRow}
            </FixedSizeList>
        </Box>
    
    <div
      style={{
        position: 'absolute',right:'15%', top: '17%',
      }}
      className='medicinepage'>

      

      <h1>Medicine Tracker</h1>
      <main className='wholePage'>

        <p className='subtitle'>Track your kid's medicine:</p>
        <Button sx={buttonstyle} onClick={handleOpen2} >Add new Medicine</Button>
        <div className='medicine-cards'>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open2}
            onClose={handleClose2}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
              },
            }}
          >
            <Fade in={open2}>
              <Box sx={style}>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  Add Medicine <br />
                </Typography>
                <Typography className="collect-data" id="transition-modal-description" sx={{ mt: 5 }}>
                  <AddMedicine fetchData={GetData} handleClose2={handleClose2}/>
                </Typography>
              </Box>
              
            </Fade>
          </Modal>
          <MedicineList fetchData={GetData} />
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
            <EditMedicine fetchData={GetData} medicine={selectedMedicine} handleClose={handleClose} />
            </Typography>           
          </Box>
        </Fade>
        </Modal>
          <br/>
          
        </div>

      </main>
    </div>
    </> 
    )}
    </div>
    
  );
};

export default MedicineTracker;