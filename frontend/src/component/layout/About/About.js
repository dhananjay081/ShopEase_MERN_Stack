import React from "react";
import "./aboutSection.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import Linkdine from "@material-ui/icons/LinkedIn";
import Github from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/dhananjay081";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <h1>About Us</h1>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dyeebvmll/image/upload/v1727617069/products/v1toi3bzyajzq3cu6nh1.jpg"
              alt="Founder"
            />
            <h3>Dhananjay Kushwaha</h3>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
            <span>
              This is a sample wesbite made by @dhananjay081. Only with the
              purpose to learn MERN Stack Development
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <h2>Contact Us</h2>

            <a href="https://instagram.com/dhananjay081" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
            <a href="https://www.linkedin.com/in/dhananjay-kushwaha-2b7078296/" target="blank">
              <Linkdine className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;