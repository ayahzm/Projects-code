import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Collapse, Fade, Backdrop, Box, CardMedia, Modal, Typography, Card, CardHeader, CardContent, CardActions, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Swal from 'sweetalert2';

function DrRequestsList(props) {
    const [data, setData] = useState([]);
    const [expandedMap, setExpandedMap] = useState({});
    const [open, setOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const PopUp = () => {
        Swal.fire({
          title: 'Succes!',
          text: 'Doctor is added to team',
          confirmButtonText: 'Ok',
          color: "#005077",
          confirmButtonColor: "#005077"
        });
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

    const buttonstyle2 = {
        "&:focus": {
            outline: "none"
        },
        cursor: "pointer",
        color: "#005077",
        margin: "10px"
    };

    const addToTeam = async (doctor) => {
        try {
            const response = await axios.post('https://localhost:44360/api/doctor/AddToTeam', doctor);
            PopUp(); // Success message or error message
            try {
                const id = doctor.Id;
                await axios.post(`https://localhost:44360/api/doctor/DeleteRequest?id=${id}`)
                .then((result)=>{
                    fetchData();
                })
            } catch (error) {
                alert('Error:', error);
            }
        } catch (error) {
            alert('Error:', error);
        }
    };

    const handleAddToTeam = (doctor) => {
        addToTeam(doctor);
    };

    const deleteRequest = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure you want to decline this request?",
                text: "You won't be able to revert this!",
                showCancelButton: true,
                confirmButtonColor: "#fed3b2",
                cancelButtonColor: "#005077",
                confirmButtonText: "Yes",
                color: "#005077"
              }).then((result) => {
                if (result.isConfirmed) {
                   axios.post(`https://localhost:44360/api/doctor/DeleteRequest?id=${id}`)
                   .then((result)=>{
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

    const handleDeclineRequest = (id) => {
        deleteRequest(id);
    };

    const fetchData = async () => {
            try {
                const result = await axios.get('https://localhost:44360/api/doctor/GetAllRequests');
                setData(result.data.map(doctor => ({
                    ...doctor,
                    age: calculateAge(doctor.BirthYear)
                })));
                setExpandedMap(result.data.reduce((map, _, index) => {
                    map[index] = false;
                    return map;
                }, {}));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const calculateAge = (birthYear) => {
        const currentYear = new Date().getFullYear();
        return currentYear - birthYear;
    };

    const handleExpandClick = (index) => {
        setExpandedMap((prevMap) => ({
            ...prevMap,
            [index]: !prevMap[index],
        }));
    };

    const handleOpen = (doctor) => {
        setSelectedDoctor(doctor);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedDoctor(null);
    };

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                    <Card className='request-card' key={index} sx={{ width: 300, backgroundColor: "#dce3f7", marginBottom: '20px' }}>
                        <CardHeader
                            action={
                                <>
                                    <DeleteIcon onClick={() => handleDeclineRequest(item.Id)} sx={buttonstyle2} />
                                </>
                            }
                        />

                        <CardMedia>
                            <AccountCircleRoundedIcon sx={{ fontSize: "170px", color: "#005077" }} />
                        </CardMedia>

                        <CardContent>
                            <Typography sx={{ textDecoration: "none", fontSize: "large", color: "#005077", fontWeight: "bold" }} variant="body2" >
                                Dr. {item.FirstName} {item.LastName}
                            </Typography>
                            <Typography sx={{ fontSize: "large", color: "#005077" }} variant="body2" >
                                Majored in {item.Major}
                            </Typography>
                        </CardContent>

                        <CardActions disableSpacing>
                            <Button sx={{ color:"white",padding: "7px", bgcolor: "#005077" }} onClick={() => handleAddToTeam(item)}>Add to team</Button>
                            <Button onClick={() => handleOpen(item)} sx={{ marginLeft: 7 ,padding: "7px", bgcolor: "#005077" ,color:"white"}}>See Details</Button>
                        </CardActions>
                    </Card>
                ))
            ) : data && data.length === 0 ? (
                'No Requests yet'
            ) : (
                'Loading...'
            )}

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        {selectedDoctor && (
                            <>
                                <Typography sx={{ fontWeight: "bold" }}>
                                    Dr Details:
                                </Typography>
                                <Typography paragraph>
                                    {selectedDoctor.FirstName} {selectedDoctor.LastName} is a {selectedDoctor.age} years old {selectedDoctor.Gender} Doctor. <br />
                                    Graduated in {selectedDoctor.YearOfGraduation} from {selectedDoctor.University} University <br />
                                    Majored in {selectedDoctor.Major} <br />
                                    Located in {selectedDoctor.Country}<br />
                                    Email: {selectedDoctor.Email}<br/>
                                    Medical License NB: {selectedDoctor.MedicalLicenseNumber}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default DrRequestsList;
