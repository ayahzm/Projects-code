import React from 'react'
// import { Button } from "@mui/material";
import "./StartPage.css";
// import { useNavigate } from "react-router-dom";
// import { useRef } from "react";

export const AboutUs = () => {
  return (

    <div id="second" style={{
        position: 'absolute', left: '50%',
        transform: 'translate(-50%)',fontSize:"18px"}}>
          <div className="container" >
            <div>
              <h2>Meet the team</h2>
              <p>
              we're a team of dedicated senior students passionate about leveraging technology
              to make a positive impact on healthcare. Our platform is designed to simplify the
              management of children's health, providing parents and caregivers with essential 
              tools and resources to ensure the well-being of their loved ones.
              </p>
            </div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/men-and-woman-characters-work-together-on-project-presentation-2706075-2259871.png"
              alt=""
            />
          </div>
          <div className="container">
            <div>
              
              <h2>Our Mission</h2>
              <p>
              Our mission is clear: to empower parents and caregivers by providing a 
              comprehensive platform that simplifies managing children's medication 
              schedules, offers reliable health information, connects them with medical
              professionals, and utilizes advanced technology to enhance disease 
              prediction. We believe that by combining our expertise in technology 
              with our passion for healthcare, we can make a meaningful difference in 
              the lives of families everywhere.
              </p>
            </div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/business-partnership-2975816-2476892.png"
              style={{ marginTop: "50px" }}
              alt=""
            />
          </div>
          <div className="container">
            <div>
              
              <h2>Our journey</h2>
              <p>
              Our journey began with a simple idea: to create a platform that would 
              make managing children's health easier for parents and caregivers by reducing anxiety because of the responsibility.
              Over time, that idea evolved into "Child Guardian", a comprehensive solution 
              that integrates medication tracking, health articles, expert Q&A, and disease 
              prediction. Along the way, we've faced challenges and setbacks, but our 
              passion and determination have never wavered. Today, we're proud to share 
              our platform with the world, knowing that it has the potential to make a 
              real difference in the lives of families everywhere.
              </p>
            </div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/business-goal-4352585-3618767.png"
              style={{ marginTop: "80px" }}
              alt=""
            />
          </div>
          <div className="container">
            <div>
              <h2>Our strengths</h2>
              <p>
              Our strength lies in our team's fusion of expertise in technology, medicine, and user experience design. 
              We excel in crafting innovative solutions that seamlessly integrate advanced technologies 
              like machine learning with user-friendly interfaces.Driven by our dedication to 
              making a positive impact, we're relentless in our pursuit of excellence, always 
              striving to exceed expectations and improve the well-being of families worldwide.
              </p>
            </div>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/teamwork-3560853-2989144.png"
              alt=""
            />
          </div>
        </div>
  )
}

