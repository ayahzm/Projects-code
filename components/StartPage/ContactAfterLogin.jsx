import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import ContactUs from '../../assets/Contact us 2.jpeg';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useMediaQuery, useTheme } from "@mui/material";

const ContactAfterLogin = () => {
  const form = useRef();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_19ar3j4', 'template_5lp8vs4', form.current, '5tvr8ojvvsU2wqXak')
      .then(
        () => {
          console.log('SUCCESS!');
          alert('Message sent successfully!');
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert('Failed to send message');
        },
      );
  };

  return (
    <div>
      {!isSmallScreen && <StyledContactBackground src={ContactUs} alt="Contact Us" />}
    
      <StyledContactForm>
        <form ref={form} onSubmit={sendEmail}>
          <h1 style={{
            fontSize: '22px',
            width: '100%',
            background: "#005077",
            color: 'white',
            padding: "3%",
            borderRadius: '50px'
          }}>
            Need help? Contact Us
          </h1>
        
          <label style={{ color: '#005077' }}>Name</label>
          <input type="text" name="user_name" />
          <label style={{ color: '#005077' }}>Message</label>
          <textarea name="message" />
          <div className="center-button">
            <input type="submit" value="Send" style={{ width: '100%', marginRight: '-6%', borderRadius: '30px' }} />
            {/* <input type="button" value="Cancel" style={{ width: '30%', borderRadius: '30px' }} /> */}
          </div>
        </form>
      </StyledContactForm>
      <StyledContactIcons>
        <PhoneIcon />
        <FacebookIcon />
        <InstagramIcon />
      </StyledContactIcons>
    </div>
  );
};

export default ContactAfterLogin;

const StyledContactIcons = styled.div`
  font-size: 30px;
  color: white;
  background: #005077;
  display: flex;
  justify-content: space-around;
  margin-top: -5.5rem;
  padding: 3px;
  position: absolute;
  bottom: 15%;
  left: 6%;
  width: 450px;

  & > * {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #C6834C;
    }
  }
`;

const StyledContactBackground = styled.img`
  position: absolute;
  left: 36%;
  width: 60%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

const StyledContactForm = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.8);
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: absolute;
  left: 7%;

  form {
    width: 400px;
    display: flex;
    flex-direction: column;
    font-size: 17px;

    label {
      margin-top: 1rem;
      color: white;
    }

    input,
    textarea {
      width: 100%;
      height: 35px;
      padding: 7px;
      margin-top: 0.5rem;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
    
      &:focus {
        border: 2px solid #EFAE7D;
      }
    }

    textarea {
      height: 100px;
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: #EFAE7D;
      color: white;
      border: none;
      width: 50%;
      border-radius: 30px;
    }

    .center-button {
      display: flex;
      justify-content: center;
      margin-left: -10px;
    }
  }
`;
