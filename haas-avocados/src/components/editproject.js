import { TextField } from '@mui/material'
import React, {useState} from 'react'
import {Button} from '../components/button.style';
import Auth from '../Auth'

import {
    TextFieldWrapper,
    FieldDesc,
  } from "./dashboardcomponents/projectquickadd/projectquickadd.style";
const EditProject = (props) => {
    const originalData = [props.pName, props.pDesc, props.pHW, props.pData];
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
    }

    return (
        <>
          <div>
            <FieldDesc>Project Name:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" label="Project Name" onChange={(e) => {setName(e.target.value)}} focused />
            </TextFieldWrapper>
            <FieldDesc>Project Description:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" focused multiline label="Project Description" rows="6" maxrows="6" onChange={(e) => {setDesc(e.target.value)}}/>
            </TextFieldWrapper>
            <FieldDesc>HWSet 1:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" label="HWSet1" onChange={(e) => {setH1(e.target.value)}} focused />
            </TextFieldWrapper>    
            <FieldDesc>HWSet 2:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" label="HWSet2" onChange={(e) => {setH2(e.target.value)}} focused />
            </TextFieldWrapper>   
            <Button onClick={() => {console.log(makeDict())}}>Create</Button>   
          </div>         
        </>
    )
}

export default EditProject;