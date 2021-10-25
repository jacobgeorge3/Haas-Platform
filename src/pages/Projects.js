/**
 * Project.js
 * Temp for landing page
 */

import React, { useState } from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProjectOverview from '../components/projectoverview'
import '../styles/project.css'
import { TextField } from "@mui/material";
import { Button } from "../components/button.style";
 
function Project (){
  const [myValue, setValue] = useState('');
  let filter = "";
  
    
    const rawData = [
      [
        'Project1',
        'P1 description',
        'HWSet1',
        'Dataset1',
      ],
      [
        'Project2',
        'P2 description',
        'HWSet2',
        'Dataset2',
      ],
      [
        'Project3',
        'P3 description',
        'HWSet3',
        'Dataset3',
      ],
      [
        'Project4',
        'P4 description',
        'HWSet4',
        'Dataset4',
      ]
    ];
    let data = filterData(rawData,filter);
    
    function filterData(rawData, filter){
      console.log(filter);
      const data = [];
      for (let i = 0; i < rawData.length; i++){
        if(filter.length == 0){
          data.push({
            col1: rawData[i][0],
            col2: rawData[i][1],
            col3: rawData[i][2],
            col4: rawData[i][3],
          });
        }else{
          if(rawData[i][0] == filter){
            data.push({
              col1: rawData[i][0],
              col2: rawData[i][1],
              col3: rawData[i][2],
              col4: rawData[i][3],
            });
            console.log("Filtered");
            return data;
          }
        }
      }
      return data;
    }
  

    //TODO: map incoming data with project name as key and data as vals
    //Use map to format data how needed
    //On button click change formatted data to fit filter
     return (
       <>
        <div>
          <div className='header'>
          <h1>Projects</h1>
         </div>
         <div className='project-overview'>
           <ProjectOverview data={filterData(rawData,'')}/>
         </div>
         <div className='project-search'>
           <h4 >Search: 
           <TextField variant="filled" label="Enter Project Name: " value={myValue} 
			onChange={(e) => setValue(e.target.value)}/>
           <Button onClick={() => {filter = myValue}}>Search</Button>
           </h4>
           
         </div>
         
        </div>
         
        
       </>
     );
 }
 
 export default Project;