/**
 * edit project component 
 * a simple form that'll create or edit a project
 * receives data from row click(edit) or an indicator that a row wasn't clicked(add)
 */

import { Link } from "react-router-dom";
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

    const hardwareDisplayStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '5px',
        marginTop: '5px',
    };

    const hardwareInputStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '5px',
        marginBottom: '16px',
    };

    const checkout = () => {
        console.log("checking out")
    }

    const checkin = () => {
        console.log("checking in")
    }

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
          <div style={{padding: "10px"}}>
            <TextFieldWrapper>
                <TextField 
                    variant="outlined" 
                    color="primary" 
                    focused multiline label="Project Name" 
                    rows="1" 
                    maxrows="6" 
                    onChange={(e) => {setName(e.target.value)}} 
                    defaultValue={props.name} 
                />
            </TextFieldWrapper>
            <TextFieldWrapper>
                <TextField 
                    variant="outlined" 
                    color="primary" 
                    focused multiline label="Project Description" 
                    rows="6" 
                    maxrows="6" 
                    onChange={(e) => {setDesc(e.target.value)}}
                    defaultValue={props.description}
                />
            </TextFieldWrapper>


            {props.name == "" ? 
                <Button onClick={() => {console.log(makeDict())}}>Create</Button> 
                :  
                <Link to="/projects">
                    <Button onClick={() => {console.log("save Changes")}}>Save</Button>
                </Link>
            
            }


            {/*capacity and resources are hard coded for now*/}
            <div style={hardwareDisplayStyle}>
                <FieldDesc>HWSet 1</FieldDesc>
                <FieldDesc>Capacity: 10</FieldDesc>
                <FieldDesc>Available: 5</FieldDesc>
            </div>

            <div style={hardwareInputStyle}>
                <div style={hardwareDisplayStyle}>
                    {/*checkin and checkout are not correct*/}
                    <TextField 
                        variant="outlined" 
                        color="primary" 
                        focused multiline label="Checkout Resources" 
                        rows="1" 
                        maxrows="1"  
                        onChange={(e) => {setH1(e.target.value)}} 
                        focused 
                        defaultValue={props.hw1}
                    />
                    <Button onClick={checkout}>Checkout</Button> 
                </div>
                
                <div style={hardwareDisplayStyle}>
                    <TextField 
                        variant="outlined" 
                        color="primary" 
                        focused multiline label="Checkin Resources" 
                        rows="1" 
                        maxrows="1"  
                        onChange={(e) => {setH1(e.target.value)}} 
                        focused 
                        defaultValue={props.hw1}
                    />
                    <Button onClick={checkin}>Checkin</Button> 
                </div>
            </div>
            


            {/*capacity and resources are hard coded for now*/}
            <div style={hardwareDisplayStyle}>
                <FieldDesc>HWSet 2</FieldDesc>
                <FieldDesc>Capacity: 5</FieldDesc>
                <FieldDesc>Available: 1</FieldDesc>
            </div>

            <div style={hardwareInputStyle}>
                <div style={hardwareDisplayStyle}>
                    {/*checkin and checkout are not correct*/}
                    <TextField 
                        variant="outlined" 
                        color="primary" 
                        focused multiline label="Checkout Resources" 
                        rows="1" 
                        maxrows="1"  
                        onChange={(e) => {setH1(e.target.value)}} 
                        focused 
                        defaultValue={props.hw1}
                    />
                    <Button onClick={checkout}>Checkout</Button> 
                </div>

                <div style={hardwareDisplayStyle}>
                    <TextField 
                        variant="outlined" 
                        color="primary" 
                        focused multiline label="Checkin Resources" 
                        rows="1" 
                        maxrows="1"  
                        onChange={(e) => {setH1(e.target.value)}} 
                        focused 
                        defaultValue={props.hw1}
                    />
                    <Button onClick={checkin}>Checkin</Button> 
                </div>
            </div>
            


            {/* {props.name == "" ? 
                <Button onClick={() => {console.log(makeDict())}}>Create</Button> 
                :  
                <Link to="/projects">
                    <Button onClick={() => {console.log("save Changes")}}>Save</Button>
                </Link>
            
            } */}
              
          </div>         
        </>
    )
}

export default EditProject;