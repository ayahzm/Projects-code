import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Box, Backdrop, Modal, Fade, Card,
  CardContent, Button, Typography,
  ClickAwayListener, MenuList, MenuItem, Paper, Stack, Grow, CardHeader, CardMedia, Popper
} from '@mui/material';
import './EditProfile.css';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditChildProfile from './EditChildProfile';
import EditIcon from '@mui/icons-material/Edit';
import AvatarProfile from '../Avatar/AvatarProfile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Swal from 'sweetalert2';
import AddChild from './AddChild';
import Pic from '../../assets/AirBalloon.jpg';
function ChildrenProfileList(props) {
  const [data, setData] = useState([]);
  const currentYear = new Date().getFullYear();
  const [selectedChild, setSelectedChild] = useState(null);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  // const [open2, setOpen2] = React.useState(false);
  // const handleOpen2 = () => setOpen2(true);
  // const handleClose2 = () => setOpen2(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    border: '2px',
    boxShadow:4,
    p: 4,
  };

  const buttonstyle2 = {
    "&:focus": {
      outline: "none"
    },
    cursor: "pointer",
    color: "white",
    margin: "10px"
  };

  const DeleteChild = async (id) => {
    try {
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
          const response = axios.post(`https://localhost:44360/api/child/DeleteChild?id=${id}`)
          .then((result) => {
            fetchData();
          })
          Swal.fire({
            title: "Deleted!",
            text: "Your medicine has been deleted.",
            color: "#005077",
            confirmButtonColor: "#005077"
          });
        }
      });
    } catch (error) {
      alert('Error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteChild = (id) => {
    DeleteChild(id);
  };

  const fetchData = async () => {
    try {
      const result = await axios.get(`https://localhost:44360/api/child/GetAllChildren?id=${parseInt(userData.Id)}`);
      setData(result.data.map(child => ({
        ...child,
        age: calculateAge(child.BirthYear),
        avatar: null,
        popoverOpen: false,
        avatarPopoverOpen: false,
        avatarAnchorEl: null,
        anchorEl: null
      })));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const handleEditClick = (child) => {
    setSelectedChild(child);
    setOpen(true);
  };

  const calculateAge = (birthyear) => {
    const currentYear = new Date().getFullYear();
    return currentYear - birthyear;
  };

  const handlePopoverToggle = (index) => {
    setData(prevState => {
      const newState = [...prevState];
      newState[index].popoverOpen = !newState[index].popoverOpen;
      return newState;
    });
  };

  const handlePopoverClose = (index) => {
    setData(prevState => {
      const newState = [...prevState];
      newState[index].popoverOpen = false;
      return newState;
    });
  };

  const handleAvatarPopoverToggle = (event, index) => {
    setData(prevState => {
      const newState = [...prevState];
      newState[index].avatarAnchorEl = event.currentTarget;
      newState[index].avatarPopoverOpen = !newState[index].avatarPopoverOpen;
      return newState;
    });
  };

  const handleAvatarPopoverClose = (index) => {
    setData(prevState => {
      const newState = [...prevState];
      newState[index].avatarPopoverOpen = false;
      return newState;
    });
  };

  const handleFileChange = async (event, index) => {
    const file = event.target.files[0];

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(`https://localhost:44360/api/child/UploadAvatar/${data[index].Id}`, formData);

        if (response.status === 200) {
            const avatarUrl = response.data; // Full URL now

            setData(prevState => {
                const newState = [...prevState];
                newState[index].AvatarUrl = avatarUrl; // Update AvatarUrl in state
                newState[index].avatarPopoverOpen = false; // Close popover after successful upload
                return newState;
            });

            Swal.fire({
                title: 'Avatar Updated!',
                text: 'Avatar has been successfully updated.',
                confirmButtonColor: "#005077"
            });
        } else {
            throw new Error('Error uploading avatar');
        }
    } catch (error) {
        console.error('Error uploading avatar:', error);
        Swal.fire({
            title: 'Oops...',
            text: 'Failed to update avatar!',
            confirmButtonColor: "#005077"
        });
    }
};



  const handleListKeyDown = (event, index) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      handlePopoverClose(index);
    } else if (event.key === 'Escape') {
      handlePopoverClose(index);
    }
  };

  const handleListKeyDown2 = (event, index) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      handleAvatarPopoverClose(index);
    } else if (event.key === 'Escape') {
      handleAvatarPopoverClose(index);
    }
  };

  const handleRemoveProfile = async (index) => {
    try {
      const childId = data[index].Id;
      const response = await axios.delete(`https://localhost:44360/api/child/RemoveAvatar/${childId}`);
  
      if (response.status === 200) {
        setData(prevState => {
          const newState = [...prevState];
          newState[index].AvatarUrl = null; // Update AvatarUrl in state to null
          return newState;
        });
  
        Swal.fire({
          title: 'Profile Picture Removed!',
          text: 'Profile picture has been successfully removed.',
          confirmButtonColor: "#005077"
        });
      } else {
        throw new Error('Error removing profile picture');
      }
    } catch (error) {
      console.error('Error removing profile picture:', error);
      Swal.fire({
        title: 'Oops...',
        text: 'Failed to remove profile picture!',
        confirmButtonColor: "#005077"
      });
    }
  };
  

  return (
    <div style={{justifySelf:"center", width:"80vw ", display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {data && data.length > 0 ? (
        data.map((item, index) => (
          <div>
          <Card key={index} sx={{ width: 330, maxHeight: 330, backgroundColor: "#dce3f7" }}>
            <CardHeader
              action={
                <Stack direction="row" spacing={2}>
                  <div>
                    <Button
                      ref={(el) => { item.anchorEl = el; }}
                      id="composition-button"
                      aria-controls={item.popoverOpen ? 'composition-menu' : undefined}
                      aria-expanded={item.popoverOpen ? 'true' : undefined}
                      aria-haspopup="true"
                      style={{ color: '#005077'}}
                      onClick={() => handlePopoverToggle(index)}
                    >
                      <MoreVertIcon />
                    </Button>
                    <Popper
                      open={item.popoverOpen || false}
                      anchorEl={item.anchorEl}
                      role={undefined}
                      placement="right-end"
                      transition
                      disablePortal
                      style={{ zIndex: 1500 }}
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin:
                              placement === 'bottom-start' ? 'left top' : 'left bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={() => handlePopoverClose(index)}>
                              <MenuList
                                autoFocusItem={item.popoverOpen || false}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={(event) => handleListKeyDown(event, index)}
                                style={{color: '#005077'}}
                              >
                                <MenuItem onClick={() => handleEditClick(item)}><EditIcon /> Edit Profile</MenuItem>
                                <MenuItem onClick={() => handleDeleteChild(item.Id)} ><DeleteIcon /> Remove Child</MenuItem>
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </Stack>
              }
            />
            <CardMedia
            />
            <CardContent>
              <Button component="label"
                role={undefined}
                tabIndex={-1}
                style={{ marginBottom: '10%' , marginLeft: "18%",borderRadius:"50%"}}
                onClick={(event) => handleAvatarPopoverToggle(event, index)}>
                <AvatarProfile sx={{color: "white",width:"170px",height:"170px" }} avatar={item.AvatarUrl} />
              </Button>
              <Popper
                open={item.avatarPopoverOpen || false}
                anchorEl={item.avatarAnchorEl}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
                style={{ zIndex: 1300 }}
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={() => handleAvatarPopoverClose(index)}>
                        <MenuList
                          autoFocusItem={item.avatarPopoverOpen || false}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={(event) => handleListKeyDown2(event, index)}
                          style={{ color: '#005077' }}
                        >
                          <MenuItem>
                            <AccountCircleIcon /><Button component="label"
                              role={undefined}
                              style={{ fontSize: '16px', color: '#005077' }}> Change Profile
                              <input
                                type="file"
                                onChange={(e) => handleFileChange(e, index)} // Call the handleFileChange function on file selection
                                style={{ display: 'none' }} /></Button>
                          </MenuItem>
                          <MenuItem onClick={() => handleRemoveProfile(index)}><DeleteIcon /> REMOVE PROFILE</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Typography sx={{ textDecoration: "none", fontSize: "larger", color: "#005077", fontWeight: "bold" }} variant="body2" >
                {item.FirstName}
              </Typography>
            </CardContent>

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
                    Edit Child's informations <br />
                  </Typography>
                  <Typography className="collect-data" id="transition-modal-description" sx={{ mt: 5 }}>
                    <EditChildProfile child={selectedChild} onClose={handleClose} GetData={fetchData} />
                  </Typography>
                </Box>
              </Fade>
            </Modal>
          </Card>
          <button onClick={handleOpen2} className='Add-Child' title='Add Child'>+</button>

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
      Add Child <br/>
    </Typography>
    <Typography className="collect-data" id="transition-modal-description" sx={{ mt: 5 }}>
    <AddChild GetData={fetchData} onClose={handleClose2} data={data} setData={setData}/>
    </Typography>           
  </Box>
</Fade>
</Modal>
</div>
        ))
      ) : data && data.length === 0 ? (
        
       <div  >
        No Child Profiles Yet..
       <button onClick={handleOpen2} className='Add-Child' title='Add Child'>+</button>

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
      Add Child <br/>
    </Typography>
    <Typography className="collect-data" id="transition-modal-description" sx={{ mt: 5 }}>
    <AddChild GetData={fetchData} onClose={handleClose2} data={data} setData={setData}/>
    </Typography>           
  </Box>
</Fade>
</Modal></div>
        
      )
        : (
          'Loading...'
        )}
    </div>
  );
}

export default ChildrenProfileList;
