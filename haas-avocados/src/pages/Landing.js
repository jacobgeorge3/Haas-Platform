/**
 * Landing.js
 * The landing page for the website
 */

import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Biocard from "../components/biocard";
import "../styles/landing.css"

class Landing extends React.Component {
  render() {
    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
          <div>
            <h1>Welcome to Haas: Avacado</h1>
            <iframe width="560" 
            height="315" 
            src="https://www.youtube.com/embed/aGMKAhCRQ8Y" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowfullscreen>
             </iframe>
          </div>
          <div className="aboutus-container">
            <h1>About Us</h1>
            <p>
              We are a Hardware as a Service(Haas) company with the mission of providing optimal hardware for research in various fields. 
              Our team maintains the hardware and ensures quality equipment. You rent our equipment to use for your projects. Our site maintains 
              your projects, data, and profile all in one place. With Haas:Avacado you can guac that project up.
            </p>
          </div>
        </div>
    )
  }
}

export default Landing;
