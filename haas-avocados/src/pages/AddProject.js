/**
 * Add Project page component
 * shows two different versions pf the same edit project component
 * one version saves changes the other will make a new project
 */

import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentContainer from "../components/dashboardcomponents/ContentContainer.style";
import { Title } from "../components/dashboardcomponents/projectquickadd/projectquickadd.style";
import { Button } from "../components/button.style";
import "../styles/project.css";
import EditProject from "../components/editproject";
import { useLocation } from "react-router-dom";
const AddProject = () => {
  const location = useLocation();
  const [editData, setData] = useState({});

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.rowData);
    setData(location.rowData);
    //console.log(editData);
  }, [location]);

  //if editing a project, send the data associated with it to edit project component
  //if not empty data is fine
  // if(editData.isHere){
  return (
    <>
      <div className="Test">
        <div className="header">
          <h2>Edit {editData.name}</h2>
        </div>
        <div className="project-edit-container">
          <EditProject
            name={editData.name}
            description={editData.description}
            hw1={editData.hw1}
            hw2={editData.hw2}
          />
        </div>
      </div>
    </>
  );
};

export default AddProject;
