/**
 * Project.js
 * Temp for landing page
 */

import React from "react";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ProjectQuickAdd from '../components/projectquickadd/projectquickadd.js'
import ProjectOverview from '../components/projectoverview/projectoverview'
 
function Project (){ 
  const data = [
      {
        col1: 'Project1',
        col2: 'P1 description',
        col3: 'HWSet1',
        col4: 'Dataset1',
      },
      {
        col1: 'Project2',
        col2: 'P2 Description',
        col3: 'HWSet2',
        col4: 'Dataset2',
        
      },
      {
        col1: 'Project3',
        col2: 'P3 Description',
        col3: 'HWSet3',
        col4: 'Dataset3',
      },
    ];
     return (
       <>
         <ProjectOverview data={data}/>
       </>
     );
 }
 
 export default Project;