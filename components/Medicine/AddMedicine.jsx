import React, { useState, useEffect } from 'react';
import { Grid, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import addNotification from 'react-push-notification';

function AddMedicine({ fetchData,handleClose2 }) {

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Medicine is added',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userData = JSON.parse(sessionStorage.getItem('userData'));
  const [medicine, setMedicine] = useState({
    Name: "",
    ParentId: 0,
    ScheduleType: "EveryXHours",
    DosesPerWeek: 1,
    IntervalHours: 0,
    TimeToTake: "08:00",
    Note: "",
    Reminder: 0,
  });

  const [medicinesOfTheDay, setMedicinesOfTheDay] = useState([]);

  const [messageType, setMessageType] = useState("");
  const [NameMessage, setNameMessage] = useState("");
  const [TimeToTakeMessage, setTimeToTakeMessage] = useState("");

  function checkInputs() {
    setNameMessage("");
    setTimeToTakeMessage("");

    if (medicine.Name.length === 0) {
      setNameMessage("Name cannot be empty");
      setMessageType("error3");
    }
  }

  const getMessageIcon = () => {
    switch (messageType) {
      case "error1":
      case "error3":
        return <ErrorOutlineIcon style={{ color: 'red', verticalAlign: 'middle' }} />;
      case "warning":
        return <WarningAmberIcon style={{ color: 'red', verticalAlign: 'middle' }} />;
      case "success":
        return <CheckCircleOutlineIcon style={{ color: 'green', verticalAlign: 'middle' }} />;
      default:
        return null;
    }
  };

  const apiUrl = 'https://localhost:44360/api/Medicine/AddNewMedicine';

  const AddNewMedicine = (e) => {
    e.preventDefault();
    checkInputs();

    // Ensure Reminder is always an integer
    const data = {
      Name: medicine.Name,
      ParentId: parseInt(userData.Id),
      TimeToTake: medicine.TimeToTake,
      ScheduleType: medicine.ScheduleType,
      IntervalHours: medicine.IntervalHours,
      DosesPerWeek: medicine.DosesPerWeek,
      Note: medicine.Note,
      Reminder: medicine.Reminder
    };

    axios.post(apiUrl, data)
      .then((result) => {
        if (medicine.Reminder === 1) {
          calculateReminderTimes();
        }
        if (result.data === "Medicine Added") {
          PopUp();
          handleClose2();
          navigate('/medicine');
          const GetData = async () => {
            const result = await axios.get(`https://localhost:44360/api/Medicine/GetAllMedicines?parentId=${parseInt(userData.Id)}`);
            setData(result.data);
          }
          GetData();
          fetchData();
        }
      });
  }

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMedicine({
      ...medicine,
      [name]: type === 'checkbox' ? (checked ? 1 : 0) : value
    });
  }

  const onScheduleChange = (e) => {
    const { value } = e.target;
    setMedicine({
      ...medicine,
      ScheduleType: value
    });
  };

  const calculateReminderTimes = () => {
    const today = new Date();
    let reminders = [];

    if (medicine.ScheduleType === "EveryXHours") {
      reminders = calculateTimesForInterval(today, medicine.IntervalHours);
    } else if (medicine.ScheduleType === "DosePerWeek") {
      reminders = calculateTimesPerWeek(medicine.DosesPerWeek);
    }

    reminders.forEach(time => {
      const nextReminder = new Date(today);
      const [hour, minute] = time.split(":").map(Number);
      nextReminder.setHours(hour, minute, 0, 0);

      const diff = nextReminder - today;
      if (diff > 0) {
        console.log(`Reminder set for: ${nextReminder}`);
        setMedicinesOfTheDay(prevMedicines => [...prevMedicines, { name: medicine.Name, time: time }]);
        setTimeout(() => {
          addNotification({
            title: 'Medicine Reminder',
            message: 'Take your medicine',
            duration: 4000,
            native: true,
            onClick: () => console.log('Notification clicked')
          });
        }, diff);
      }
    });
  };

  const calculateTimesForInterval = (startTime, intervalHours) => {
    const times = [];
    let currentTime = new Date(startTime);
    const [startHour, startMinute] = medicine.TimeToTake.split(":").map(Number);
    currentTime.setHours(startHour, startMinute, 0, 0);

    while (times.length < Math.floor(24 / intervalHours)) {
      times.push(`${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`);
      currentTime.setHours(currentTime.getHours() + intervalHours);
    }
    return times;
  };

  const calculateTimesPerWeek = (dosesPerWeek) => {
    const times = [];
    const intervalDays = 7 / dosesPerWeek;
    let nextDoseDate = new Date();

    for (let i = 0; i < dosesPerWeek; i++) {
      nextDoseDate.setDate(nextDoseDate.getDate() + Math.floor(i * intervalDays));
      const [hour, minute] = medicine.TimeToTake.split(":").map(Number);
      nextDoseDate.setHours(hour, minute, 0, 0);
      times.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
    }

    return times;
  };

  const clickToNotify = () => {
    addNotification({
      title: 'Medicine Reminder',
      message: 'Take your medicine',
      duration: 4000,
      native: true,
      onClick: () => console.log('Notification clicked')
    });
  };

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className='collect-data'>
      <form onSubmit={AddNewMedicine}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <label>Medicine name *</label><br />
            <input required type='text' name='Name' value={medicine.Name} onChange={onChange} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <label>Child's name *, (+Notes)</label><br />
            <input type='text' name='Note' value={medicine.Note} onChange={onChange} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl component="fieldset">
              <label>Schedule Plan</label>
              <RadioGroup row name="ScheduleType" value={medicine.ScheduleType} onChange={onScheduleChange}>
                <FormControlLabel value="EveryXHours" control={<Radio />} label="Every X Hours" />
                <FormControlLabel value="DosePerWeek" control={<Radio />} label="Dose per Week" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {medicine.ScheduleType === "EveryXHours" && (
            <>
              <Grid item xs={2} sm={4} md={4}>
                <label>Interval (Hours)</label><br />
                <input required type='number' name='IntervalHours' value={medicine.IntervalHours} onChange={onChange} min={1} max={24} />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label>Time to Take</label><br />
                <input required type='time' name='TimeToTake' value={medicine.TimeToTake} onChange={onChange} />
              </Grid>
            </>
          )}
          {medicine.ScheduleType === "DosePerWeek" && (
            <>
              <Grid item xs={2} sm={4} md={4}>
                <label>Doses per Week</label><br />
                <input required type='number' name='DosesPerWeek' value={medicine.DosesPerWeek} onChange={onChange} min={1} max={7} />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label>Time to Take</label><br />
                <input required type='time' name='TimeToTake' value={medicine.TimeToTake} onChange={onChange} />
              </Grid>
            </>
          )}
          <Grid item xs={2} sm={4} md={4}>
            <label>Reminder</label><br />
            <input type='checkbox' name='Reminder' checked={medicine.Reminder === 1} onChange={onChange} />
          </Grid>
            <Button type='submit' variant="contained" color="primary">Add</Button>
          
        </Grid>
      </form>
    </div>
  );
}

export default AddMedicine;