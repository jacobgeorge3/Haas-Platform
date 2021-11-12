/**
 * edit project component 
 * a simple form that'll create or edit a project
 * receives data from row click(edit) or an indicator that a row wasn't clicked(add)
 */

import { TextField } from '@mui/material'
import React, {useState} from 'react'
import {Button} from '../components/button.style';
import Auth from '../Auth'

import {
    TextFieldWrapper,
    FieldDesc,
  } from "./dashboardcomponents/projectquickadd/projectquickadd.style";
const EditProject = (props) => {
    const [pName, setName] = useState("");
    const [pDesc, setDesc] = useState("");
    const [h1, setH1] = useState(0);
    const [h2, setH2] = useState(0);

    function makeDict(){
        const x =  {
            'name':pName, 
            'description':pDesc,
            'hw1':parseInt(h1),
            'hw2':parseInt(h2),
            'user_list':[]
        };

        Auth.post("/project/create", x).then(data => console.log(data));
        //Function to post a new project given the input from the text fields
    }

    function saveChanges(){
        //Code to change hardware sets will go here
        //It would be awesome if we could also save changes to descriptions
    }

    //Return a box with textfields for name, description, and each hardware set
    //If editing a project have a save button that saves changes
    //If adding a project have a create button that creates a new project
    return (
        <>
          <div>
            <FieldDesc>Project Name:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" focused multiline label="Project Name" rows="1" maxrows="6" 
                    onChange={(e) => {setName(e.target.value)}} 
                    defaultValue={props.name} 
                />
            </TextFieldWrapper>
            <FieldDesc>Project Description:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" focused multiline label="Project Description" rows="6" maxrows="6" 
                    onChange={(e) => {setDesc(e.target.value)}}
                    defaultValue={props.description}
                />
            </TextFieldWrapper>
            <FieldDesc>HWSet 1:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" focused multiline label="HW Set 1" rows="1" maxrows="1"  
                    onChange={(e) => {setH1(e.target.value)}} focused 
                    defaultValue={props.hw1}
                />
            </TextFieldWrapper>    
            <FieldDesc>HWSet 2:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" focused multiline label="HW Set 2" rows="1" maxrows="1" 
                    onChange={(e) => {setH2(e.target.value)}} focused
                    defaultValue={props.hw2}
                />
            </TextFieldWrapper>
            {props.name == "" ? 
                <Button onClick={() => {console.log(makeDict())}}>Create</Button> 
                :  
                <Button onClick={() => {console.log("save Changes")}}>Save</Button>
            
            }
              
          </div>         
        </>
    )
}

export default EditProject;