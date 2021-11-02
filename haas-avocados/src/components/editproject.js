import { TextField } from '@mui/material'
import React from 'react'

import {
    TextFieldWrapper,
    FieldDesc,
  } from "./dashboardcomponents/projectquickadd/projectquickadd.style";
const EditProject = (props) => {
    const originalData = [props.pName, props.pDesc, props.pHW, props.pData];
    return (
        <>
          <div>
            <FieldDesc>Project Name:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" label="Project Name" defaultValue={originalData[0]} focused />
            </TextFieldWrapper>
            <FieldDesc>Project Description:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" focused multiline label="Project Description" rows="6" maxrows="6" defaultValue={originalData[1]}/>
            </TextFieldWrapper>
            <FieldDesc>HWSet:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" label="HWSet" defaultValue={originalData[2]} focused />
            </TextFieldWrapper>
            <FieldDesc>Dataset:</FieldDesc>
            <TextFieldWrapper>
                <TextField variant="outlined" color="primary" label="Dataset" defaultValue={originalData[3]} focused />
            </TextFieldWrapper>            
          </div>         
        </>
    )
}

export default EditProject;