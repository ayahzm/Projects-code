import React, { useState } from 'react';
import axios from 'axios';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Backdrop,Modal,Fade} from '@mui/material'; 
import NavbarAfterLogIn from '../Navbar/NavbarAfterLogIn';


const symptomLists = [
  ["High Fever", "Swelling Of Stomach", "Chest Pain", "Weakness In Limbs", "Coma"],
  ['Burning Micturition', 'Spotting Urination', 'Patches In Throat', 'Diarrhoea', 'Acute Liver Failure', 'Swelled Lymph Nodes', 'Malaise', 'Pain In Anal Region', 'Irritation In Anus', 'Enlarged Thyroid', 'Spinning Movements', 'Continuous Feel Of Urine', 'Abnormal Menstruation', 'Dischromic Patches', 'Stomach Bleeding', 'Prominent Veins On Calf'],
  ['Shivering', 'Stomach Pain', 'Vomiting', 'Cold Hands And Feets', 'Restlessness', 'Irregular Sugar Level', 'Indigestion', 'Nausea', 'Mild Fever', 'Blurred And Distorted Vision', 'Phlegm', 'Redness Of Eyes', 'Runny Nose', 'Congestion', 'Fast Heart Rate', 'Pain During Bowel Movements', 'Bloody Stool', 'Neck Pain', 'Swollen Legs', 'Swollen Blood Vessels', 'Puffy Face And Eyes', 'Brittle Nails', 'Swollen Extremeties', 'Extra Marital Contacts', 'Swelling Joints', 'Movement Stiffness', 'Foul Smell Ofurine', 'Passage Of Gases', 'Toxic Look (Typhos)', 'Increased Appetite', 'Family History', 'Receiving Blood Transfusion', 'History Of Alcohol Consumption', 'Blood In Sputum', 'Prognosis'],
  ['Nodal Skin Eruptions', 'Continuous Sneezing', 'Ulcers On Tongue', 'Fatigue', 'Anxiety', 'Cough', 'Breathlessness', 'Dehydration', 'Dark Urine', 'Loss Of Appetite', 'Pain Behind The Eyes', 'Constipation', 'Abdominal Pain', 'Yellow Urine', 'Yellowing Of Eyes', 'Throat Irritation', 'Sinus Pressure', 'Dizziness', 'Cramps', 'Bruising', 'Obesity', 'Excessive Hunger', 'Drying And Tingling Lips', 'Slurred Speech', 'Stiff Neck', 'Loss Of Balance', 'Unsteadiness', 'Weakness Of One Body Side', 'Bladder Discomfort', 'Internal Itching', 'Belly Pain', 'Watering From Eyes', 'Polyuria', 'Mucoid Sputum', 'Rusty Sputum', 'Distention Of Abdomen', 'Palpitations', 'Blister'],
  ['Skin Rash', 'Chills', 'Joint Pain', 'Acidity', 'Muscle Wasting', 'Weight Gain', 'Mood Swings', 'Weight Loss', 'Sunken Eyes', 'Sweating', 'Headache', 'Yellowish Skin', 'Back Pain', 'Knee Pain', 'Loss Of Smell', 'Depression', 'Red Spots Over Body', 'Lack Of Concentration', 'Visual Disturbances', 'Skin Peeling', 'Yellow Crust Ooze'],
  ['Itching', 'Lethargy', 'Hip Joint Pain', 'Muscle Weakness', 'Irritability', 'Muscle Pain', 'Altered Sensorium', 'Receiving Unsterile Injections', 'Painful Walking', 'Pus Filled Pimples', 'Blackheads', 'Scurring', 'Silver Like Dusting', 'Small Dents In Nails', 'Inflammatory Nails', 'Red Sore Around Nose']
];

const symptomDescriptions = {
  "High Fever": "A very high body temperature.",
  "Swelling Of Stomach": "An unusually large or bloated belly.",
  "Chest Pain": "Discomfort or pain in the chest area.",
  "Weakness In Limbs": "Feeling of reduced strength in the arms or legs.",
  "Coma": "A state of deep unconsciousness for a prolonged period.",
  'Burning Micturition': "A burning sensation during urination.",
  'Spotting Urination': "Light bleeding or spotting during urination.",
  'Patches In Throat': "Presence of unusual patches in the throat.",
  'Diarrhoea': "Frequent loose or watery bowel movements.",
  'Acute Liver Failure': "Rapid loss of liver function.",
  'Swelled Lymph Nodes': "Swelling of lymph nodes, often in the neck.",
  'Malaise': "A general feeling of discomfort or unease.",
  'Pain In Anal Region': "Pain experienced in the anal area.",
  'Irritation In Anus': "Feeling of irritation or itching in the anus.",
  'Enlarged Thyroid': "Thyroid gland becomes larger than normal.",
  'Spinning Movements': "Feeling like the surroundings are spinning.",
  'Continuous Feel Of Urine': "Constant sensation of needing to urinate.",
  'Abnormal Menstruation': "Irregular menstrual cycles or bleeding.",
  'Dischromic Patches': "Patches of skin with abnormal color.",
  'Stomach Bleeding': "Bleeding occurring within the stomach.",
  'Prominent Veins On Calf': "Noticeable veins appearing on the calf.",
  'Shivering': "Involuntary shaking or trembling.",
  'Stomach Pain': "Pain experienced in the stomach area.",
  'Vomiting': "Forcible expulsion of stomach contents through the mouth.",
  'Cold Hands And Feets': "Hands and feet feeling unusually cold.",
  'Restlessness': "Inability to stay still or calm.",
  'Irregular Sugar Level': "Abnormal levels of blood sugar.",
  'Indigestion': "Difficulty in digesting food.",
  'Nausea': "Feeling of wanting to vomit.",
  'Mild Fever': "A slightly elevated body temperature.",
  'Blurred And Distorted Vision': "Vision appears unclear or warped.",
  'Phlegm': "Thick mucus produced in the respiratory passages.",
  'Redness Of Eyes': "Eyes appear red or bloodshot.",
  'Runny Nose': "Excessive mucus discharge from the nose.",
  'Congestion': "Nasal passages blocked or stuffed.",
  'Fast Heart Rate': "Heart beating faster than normal.",
  'Pain During Bowel Movements': "Pain experienced while passing stool.",
  'Bloody Stool': "Presence of blood in the stool.",
  'Neck Pain': "Pain experienced in the neck area.",
  'Swollen Legs': "Legs appear swollen or larger than normal.",
  'Swollen Blood Vessels': "Blood vessels appear swollen or enlarged.",
  'Puffy Face And Eyes': "Swelling around the face and eyes.",
  'Brittle Nails': "Nails that are easily breakable or cracked.",
  'Swollen Extremeties': "Swelling in arms or legs.",
  'Extra Marital Contacts': "Engagement in sexual relationships outside of marriage.",
  'Swelling Joints': "Joints appear swollen or larger than normal.",
  'Movement Stiffness': "Difficulty in moving joints smoothly.",
  'Foul Smell Ofurine': "Urine has a bad or strong odor.",
  'Passage Of Gases': "Frequent release of gas from the digestive system.",
  'Toxic Look (Typhos)': "Appearance suggesting severe illness, like typhoid.",
  'Increased Appetite': "Feeling unusually hungry or eating more.",
  'Family History': "Diseases or conditions present in family members.",
  'Receiving Blood Transfusion': "Having received a transfusion of blood.",
  'History Of Alcohol Consumption': "Past consumption of alcoholic beverages.",
  'Blood In Sputum': "Presence of blood in the mucus from lungs.",
  'Prognosis': "The likely outcome or course of a disease.",
  'Nodal Skin Eruptions': "Small, raised skin lesions or eruptions.",
  'Continuous Sneezing': "Repeated or continuous sneezing.",
  'Ulcers On Tongue': "Sores or ulcers appearing on the tongue.",
  'Fatigue': "Feeling extremely tired or exhausted.",
  'Anxiety': "Feeling of worry, nervousness, or unease.",
  'Cough': "Expelling air from the lungs with a sudden sound.",
  'Breathlessness': "Difficulty or shortness of breath.",
  'Dehydration': "Loss of body fluids causing dryness.",
  'Dark Urine': "Urine that appears darker than usual.",
  'Loss Of Appetite': "Reduced desire to eat.",
  'Pain Behind The Eyes': "Pain felt in the area behind the eyes.",
  'Constipation': "Difficulty in passing stool.",
  'Abdominal Pain': "Pain felt in the abdominal area.",
  'Yellow Urine': "Urine that is yellow in color.",
  'Yellowing Of Eyes': "Eyes appear yellow, indicating jaundice.",
  'Throat Irritation': "Irritation or itching in the throat.",
  'Sinus Pressure': "Feeling of pressure in the sinus area.",
  'Dizziness': "Feeling lightheaded or unsteady.",
  'Cramps': "Involuntary muscle contractions causing pain.",
  'Bruising': "Discoloration of the skin due to injury.",
  'Obesity': "Excessive body weight or fat.",
  'Excessive Hunger': "Feeling very hungry or eating a lot.",
  'Drying And Tingling Lips': "Lips feeling dry or tingling.",
  'Slurred Speech': "Speech that is not clear or fluent.",
  'Stiff Neck': "Neck feels stiff or difficult to move.",
  'Loss Of Balance': "Difficulty in maintaining balance.",
  'Unsteadiness': "Feeling unsteady or about to fall.",
  'Weakness Of One Body Side': "Reduced strength on one side of the body.",
  'Bladder Discomfort': "Discomfort or pain in the bladder area.",
  'Internal Itching': "Itching felt inside the body.",
  'Belly Pain': "Pain experienced in the belly area.",
  'Watering From Eyes': "Excessive tears or watering from the eyes.",
  'Polyuria': "Frequent or excessive urination.",
  'Mucoid Sputum': "Mucus expelled from the lungs.",
  'Rusty Sputum': "Sputum that appears rusty in color.",
  'Distention Of Abdomen': "Abdomen appears larger or bloated.",
  'Palpitations': "Feeling of rapid or irregular heartbeats.",
  'Blister': "Small bubble on the skin filled with fluid.",
  'Skin Rash': "Red or inflamed skin.",
  'Chills': "Feeling of cold with shivering.",
  'Joint Pain': "Pain in the joints.",
  'Acidity': "Excessive acid in the stomach.",
  'Muscle Wasting': "Loss of muscle mass.",
  'Weight Gain': "Increase in body weight.",
  'Mood Swings': "Rapid changes in mood.",
  'Weight Loss': "Decrease in body weight.",
  'Sunken Eyes': "Eyes appear sunken or hollow.",
  'Sweating': "Excessive sweating.",
  'Headache': "Pain in the head.",
  'Yellowish Skin': "Skin appears yellow, indicating jaundice.",
  'Back Pain': "Pain in the back.",
  'Knee Pain': "Pain in the knees.",
  'Loss Of Smell': "Reduced ability to smell.",
  'Depression': "Feeling of severe despondency and dejection.",
  'Red Spots Over Body': "Red spots appearing on the skin.",
  'Lack Of Concentration': "Difficulty in focusing or concentrating.",
  'Visual Disturbances': "Problems with vision.",
  'Skin Peeling': "Skin comes off in flakes or sheets.",
  'Yellow Crust Ooze': "Yellowish crusty discharge on the skin.",
  'Itching': "Feeling of itchiness on the skin.",
  'Lethargy': "Lack of energy or enthusiasm.",
  'Hip Joint Pain': "Pain in the hip joint.",
  'Muscle Weakness': "Reduced strength in muscles.",
  'Irritability': "Easily annoyed or angered.",
  'Muscle Pain': "Pain in the muscles.",
  'Altered Sensorium': "Changes in awareness or consciousness.",
  'Receiving Unsterile Injections': "Having received injections that were not sterile.",
  'Painful Walking': "Pain experienced while walking.",
  'Pus Filled Pimples': "Pimples filled with pus.",
  'Blackheads': "Small bumps on the skin due to clogged hair follicles.",
  'Scurring': "Scabs or crusts forming on the skin.",
  'Silver Like Dusting': "Silvery scale-like appearance on the skin.",
  'Small Dents In Nails': "Small depressions on the surface of the nails.",
  'Inflammatory Nails': "Inflamed or swollen nails.",
  'Red Sore Around Nose': "Red sores appearing around the nose."
};

const steps = ['Symptoms 1', 'Symptoms 2', 'Symptoms 3', 'Symptoms 4', 'Symptoms 5', 'Symptoms 6'];
const ListItemWrapper = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ListContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxHeight: '200px',
  overflowY: 'auto',
  '& > .MuiList-root': {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: '100%',
    '& .MuiListItem-root': {
      width: '20%',
      '@media (max-width: 600px)': {
        width: '100%',
      },
    },
  },
});

export default function Diagnose() {
  const [checked, setChecked] = useState([]);
  const [chipData, setChipData] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [description, setDescription] = useState('');
  const [precautions, setPrecautions] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [skipped, setSkipped] = useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
    setChecked([]);
    setChipData([]);
    setPrediction('');
    setDescription('');
    setPrecautions([]);
  };

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    const newChips = newChecked.map((symptom, index) => ({
      key: index,
      label: symptom,
    }));
    setChipData(newChips);
  };

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    setChecked((checked) => checked.filter((symptom) => symptom !== chipToDelete.label));
  };

  const handleSubmit = async (event) => {
   
    handleNext();
    // event.preventDefault();
    const selectedSymptoms = symptomLists.flatMap(symptomGroup =>
      symptomGroup.map(symptom => checked.includes(symptom) ? 1 : 0)
    );

    try {
      const response = await axios.post('http://127.0.0.1:5000/diagnose', {
        symptoms: selectedSymptoms
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      });
      const { prediction, description, precautions } = response.data;
      setPrediction(prediction);
      setDescription(description);
      setPrecautions(precautions);
      setActiveStep(steps.length);
       handleOpen();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
  <div>
    <Typography></Typography>
    
    <div>
      
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '40px',
          maxWidth: '100%',
          flexWrap: 'wrap',
          listStyle: 'none',
          p: 0.5,
          m: 0,
          mb: 2,width: '80vw' ,ml: "10%",mr:"10%",mt:"15%"
        }}
        component="ul"
      >
        
        {chipData.map((data) => (
          <ListItemWrapper key={data.key}>
            <Chip
              label={data.label}
              onDelete={handleDelete(data)}
            />
          </ListItemWrapper>
        ))}
      </Paper>

      <Box sx={{ width: '80vw' ,ml: "10%",mr:"10%"}}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        
        {activeStep === steps.length ? (
          <React.Fragment>
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
          <Typography variant="h5" sx={{ mt: 2, mb: 1, color: '#EFAE7D', textAlign: 'center' }}>
            Your disease prediction is: 
          </Typography>
          <Typography variant="h4" sx={{ mt: 2, mb: 1, fontWeight: 'bold', color: '#EFAE7D', textAlign: 'center' }}>
             {prediction}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2, fontStyle: 'italic', color: '#005077' }}>
            Description: {description}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: '#005077' }}>
            Precautions:
          </Typography>
          <Typography variant="body1" component="div" sx={{ mb: 2, color: '#005077' }}>
            <ul style={{ paddingLeft: '20px', listStyleType: 'disc' }}>
              {precautions.map((precaution, index) => (
                <li key={index}>{precaution}</li>
              ))}
            </ul>
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button
              variant="contained"
              style={{
                backgroundColor: '#005077',
                color: '#fff',
              }}
              onClick={handleReset}
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
        </React.Fragment> 
        ) : (
          <React.Fragment>
            <ListContainer>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {symptomLists[activeStep].map((value) => {
                  const labelId = `checkbox-list-label-${value}`;
                  return (
                    <ListItem key={value} disablePadding>
                      <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={value} title={symptomDescriptions[value]} />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </ListContainer>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button 
                onClick={() => {
                  // Call handleSubmit if on the last step, otherwise call handleNext
                  if (activeStep === steps.length - 1) {
                    handleSubmit();
                  }else{
                    handleNext();
                  }
              }}
              >
                {activeStep === steps.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </div>
  </div>
  );
}