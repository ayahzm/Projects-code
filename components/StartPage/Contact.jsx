import React, { useRef,useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import axios from 'axios';

// npm i @emailjs/browser

const Contact = () => {

//   const [contact,setContact] = useState({
//     Name:"",
//     Email:"",
//     Message:""
// })

// const apiUrl ='https://localhost:44360/api/Contact/ContactAdministrator';

// const ContactAdministrator= (e) => {
//   e.preventDefault();
//   const data={
//       Name: contact.Name,
//       Email:contact.Email,
//       Message:contact.Message
//   };
//   axios.post(apiUrl,data)
//   .then((result)=>
//   {
//       navigate('/');
//   });
// }

// const onChange = (e) =>{
//   e.persist();
//   setContact({
//       ...contact,
//       [e.target.name] : e.target.value
//   });
// }

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "replace with service id",
        "replace with template id",
        form.current,
        "replace with user id"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div style={{background:"#005077"}}>

    

    <StyledContactForm>
      <form ref={form} onSubmit={sendEmail}>
        <h1 style={{
        color: "white", paddingTop:"7%", paddingRight:"7%"}}>
           Contact Us
        </h1>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea required name="message" />
        <input type="submit" value="Send" />
      </form>
    </StyledContactForm>
    </div>
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  width: 450px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 3%;
  
  form {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;
    position:relative;

    input {
      width: 100%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid #EFAE7D;
      }
    }

    textarea {
      max-width: 100%;
      min-width: 100%;
      width: 100%;
      max-height: 100px;
      min-height: 100px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);
      &:focus {
        border: 2px solid #EFAE7D;
      }
    }

    label {
      margin-top: 1rem;
      color:white
    }

    input[type="submit"] {
      margin-top: 2rem;
      cursor: pointer;
      background: #EFAE7D;
      color: white;
      border: none;
      width: 100%;
      margin-left:1.5%;
    }
  }
`;