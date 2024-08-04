import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Grid, Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function EditMedicine({fetchData, medicine, handleClose }){
 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      Name: '',
      TimeToTake: '',
      ScheduleType: "EveryXHours",
      IntervalHours: 0,   
      DosesPerWeek: 0,
      Note: '',
      Reminder: 0
  });

  const PopUp = () => {
    Swal.fire({
      title: 'Success!',
      text: 'Medicine is Updated',
      confirmButtonText: 'Ok',
      color: "#005077",
      confirmButtonColor: "#005077"
    });
  };

  useEffect(() => {
      if (medicine) {
          setFormData({
              Name: medicine.Name || '',
              TimeToTake: medicine.TimeToTake || '',
              ScheduleType: medicine.ScheduleType || '',
              IntervalHours: medicine.IntervalHours || 0,
              DosesPerWeek: medicine.DosesPerWeek || 0,
              Note: medicine.Note || '',
              Reminder: medicine.Reminder || 0
          });
      } else {
          alert('Medicine data is null.');
          navigate('/medicine');
      }
  }, [medicine, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value;

    setFormData(prevState => ({
        ...prevState,
        [name]: newValue
    }));
};

const onScheduleChange = (e) => {
  const { value } = e.target;
  setFormData({
    ...formData,
    ScheduleType: value
  });
};

  const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
          Id: medicine.Id,
          ...formData
      };
      axios.put(`https://localhost:44360/api/Medicine/UpdateMedicine`, data)
          .then((response) => {
            if (medicine.Reminder === 1) {
              calculateReminderTimes();
            }
            PopUp();
              handleClose();
              fetchData();
              
              navigate('/medicine'); // Redirect to the medicine list page
          })
          .catch((error) => {
              alert('Error updating medicine:', error);
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
          alert(`It's time to take your medicine: ${medicine.Name}`);
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

    return(
      <div className='collect-data'>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={2} sm={4} md={4}>
            <label>Medicine name *</label><br />
            <input required type='text' name='Name' value={formData.Name} onChange={handleChange} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <label>Note</label><br />
            <input type='text' name='Note' value={formData.Note} onChange={handleChange} />
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <FormControl component="fieldset">
              <label>Schedule Plan</label>
              <RadioGroup row name="ScheduleType" value={formData.ScheduleType} onChange={onScheduleChange}>
                <FormControlLabel value="EveryXHours" control={<Radio />} label="Every X Hours" />
                <FormControlLabel value="DosePerWeek" control={<Radio />} label="Dose per Week" />
              </RadioGroup>
            </FormControl>
          </Grid>
          {formData.ScheduleType === "EveryXHours" && (
            <>
              <Grid item xs={2} sm={4} md={4}>
                <label>Interval (Hours)</label><br />
                <input required type='number' name='IntervalHours' value={formData.IntervalHours} onChange={handleChange} min={1} max={24} />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label>Time to Take</label><br />
                <input required type='time' name='TimeToTake' value={formData.TimeToTake} onChange={handleChange} />
              </Grid>
            </>
          )}
          {formData.ScheduleType === "DosePerWeek" && (
            <>
              <Grid item xs={2} sm={4} md={4}>
                <label>Doses per Week</label><br />
                <input required type='number' name='DosesPerWeek' value={formData.DosesPerWeek} onChange={handleChange} min={1} max={7} />
              </Grid>
              <Grid item xs={2} sm={4} md={4}>
                <label>Time to Take</label><br />
                <input required type='time' name='TimeToTake' value={formData.TimeToTake} onChange={handleChange} />
              </Grid>
            </>
          )}
          <Grid item xs={2} sm={4} md={4}>
            <label>Reminder</label><br />
            <input type='checkbox' name='Reminder' checked={formData.Reminder === 1} onChange={handleChange} />
          </Grid>
            <Button type='submit' variant="contained" color="primary">Save</Button>
          
        </Grid>
      </form>
    </div>
    )


}

export default EditMedicine;