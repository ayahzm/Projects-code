import { Button } from "@mui/material";
import "./StartPage.css";
import { useNavigate } from "react-router-dom";
import React, { useRef,useEffect } from "react";
import Contact from "./Contact";
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { AlignVerticalCenter } from "@mui/icons-material";
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import styled from "styled-components";
import ContactAfterLogin from "./ContactAfterLogin";
export default function StartPage() {

  const userData = JSON.parse(sessionStorage.getItem('userData'));
  console.log(userData);

  const buttonstyle = {
    "&:focus":{
      outline: "none"
    }
  }

    const navigate = useNavigate();
    const tabref = useRef();

    useEffect(() => {
      window.onscroll = function () {
        jet();
      };
    }, []);

    function jet() {
      var ilake = document.getElementById("head");
      if (ilake) {
        ilake.style.top = "0px";
        ilake.style.position = "sticky";
      }
    }

    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    function handleScroll() {
      var reveals = document.querySelectorAll(".reveal");
      for (var i = 0; i < reveals.length; i++) {
        var wnd = window.innerHeight;
        var rtop = reveals[i].getBoundingClientRect().top;
        var rpoint = 100;
  
        if (rtop < wnd - rpoint) {
          reveals[i].classList.add("active");
        } else {
          reveals[i].classList.remove("active");
        }
      }
    }
  return (
    <div className="App">

      <main>
        <div id="front">
          <h1 style={{marginTop:"5%", textAlign: "center" }}>Welcome,To Child Guardian</h1>
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/about-us-1805547-1537820.png"
            alt="font"
          />
          
          {/* <Button onClick={()=>{navigate("/signup")}} className="getstarted" variant="contained">Get Started</Button> */}
          <PopupState variant="popover" popupId="demo-popup-popover">
      {(popupState) => (
        <div className="get-started">
          <Button sx={buttonstyle} variant="contained" {...bindTrigger(popupState)}>
            Get Started
          </Button>
          <Popover
  {...bindPopover(popupState)}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'center',
  }}
  transformOrigin={{
    vertical: 'top',
    horizontal: 'center',
  }}
>
  {/* Fix: Remove the <p> tag surrounding the <div> */}
  <div>
    <Typography sx={{ p: 2 }}>
      <Button sx={buttonstyle} onClick={() => { navigate("/signup") }}>As A Parent</Button>
    </Typography>
    <Typography sx={{ p: 2 }}>
      <Button sx={buttonstyle} onClick={() => { navigate("/signupdoctor") }}>As a Doctor</Button>
    </Typography>
  </div>
</Popover>
        </div>
      )}
    </PopupState>
        
        </div>

        <div id="fourth" >
          <h2 style={{ color: "#005077" }}>KEY FEATURES</h2>
          <h1 style={{ color: "#005077" }}>
            Real Time Monitoring Your Child's care
          </h1>
          <div id="fourth_cards">
            <div>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-64-thumb/data-analysis-27-681042.png"
                alt=" "
              />
              <p>TRACK YOUR CHILD'S MEDICINE</p>
            </div>
            <div>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-64-thumb/ui-ux-designer-2755964-2289563.png"
                alt=" "
              />
              <p>Q&A WITH PROFESSIONALS</p>
            </div>
            <div>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-64-thumb/web-development-3-478143.png"
                alt=" "
              />
              <p>DISEASE PREDICTION USING AI</p>
            </div>
            <div>
              <img
                src="https://cdn.iconscout.com/icon/premium/png-64-thumb/qa-testing-3919162-3246433.png"
                alt=" "
              />
              <p>STAY UP TO DATE WITH ARTICLES</p>
            </div>
          </div>
        </div>
        <div id="services" >
          <h3 style={{ textAlign: "center" }}>OUR SERVICES</h3>
          <div id="third_cards">
            <div>
              <h2>User Support</h2>
              <p>
              Have a question or need assistance? Our dedicated customer support 
              team is here to help. Whether you're having trouble navigating the 
              platform or just need some guidance on using a particular feature, 
              we're always just a click away.
              </p>
            </div>
            <div>
              <h2>Disease Prediction</h2>
              <p>
              Our advanced machine learning model analyzes different symptoms 
              to predict potential diseases in children. By identifying early 
              warning signs and risk factors, we empower parents and caregivers 
              to take proactive steps to protect their children's health.
              </p>
            </div>
            <div>
              <h2>Expert Q&A</h2>
              <p>
              Have a question about your child's health? Get answers from 
              healthcare professionals with our expert Q&A feature. Simply 
              submit your question through the platform, and one of our 
              experienced doctors will provide personalized advice and guidance.
              </p>
            </div>
            <div>
              <h2>Future Developments</h2>
              <p>
              We're constantly working to improve and enhance "Child Guardian", 
              and we have exciting plans for the future. From new features and 
              functionalities to partnerships with leading healthcare providers, 
              we're committed to making "Child Guardian" the best it can be.
              </p>
            </div>
          </div>
        </div>
        <div id="aboutus" style={{fontSize:"18px"}} className="reveal">
          <div className="container">
            <div>
              <h1 style={{marginTop:"5%"}}>ABOUT US</h1>
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
            <div >
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
              style={{width:"23%"}}
            />
          </div >
        </div>

      </main>
 
      <footer>
      <div id="contact" style={{ color: "white", marginTop: "5%", padding: "3%", background: "#005077" }}>
  {/* Fix: Replace <p> with appropriate container like <div> or <section> */}
  <div style={{marginLeft:"30%"}}>
    <h2>for support </h2><br />
    <p style={{ fontSize: "21px", color: "white", margin: '5px 0', textAlign: "left" }}><EmailIcon /> 10121058@mu.edu.lb</p>
    <p style={{ fontSize: "21px", color: "white", margin: '5px 0', textAlign: "left" }}><EmailIcon /> 10121367@mu.edu.lb</p>
    <span style={{float:"right",marginRight:"40%",marginTop:"-11%",fontSize: "21px",cursor:"pointer"}}>
     <span href='#front' onClick={()=>navigate('/')}>Home</span> <br/>
     <span href='#services' onClick={()=>navigate('/')} >Services</span> <br/>
     <span href='#aboutus' onClick={()=>navigate('/')} >About Us</span><br/>
     <span onClick={()=>navigate('/contact')}>Contact</span></span>
    
    <StyledContactIcons>
      <PhoneIcon />
      <FacebookIcon />
      <InstagramIcon />
    </StyledContactIcons>
  </div>
</div>

      <p
        style={{
          color: "white",
          textAlign: "center",
          background: "#005077",
          padding: "10px 0px",
          margin:"auto",
          fontSize:"18px"
        }}
      >
        &copy;Copyright <b>ChildGuardian</b>. All Rights Reserved.
      </p></footer>
    </div>
  );
}

const StyledContactIcons = styled.div`
  font-size: 30px;
  color: white;
  background: #005077;
  display: flex;
  justify-content: space-around;
 
  padding: 3px;
  
  width: 200px;

  & > * {
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #C6834C;
    }
  }
`;