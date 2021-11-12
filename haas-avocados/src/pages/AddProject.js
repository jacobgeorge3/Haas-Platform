import { TextField } from '@mui/material'
import React from 'react'
import ContentContainer from '../components/dashboardcomponents/ContentContainer.style'
import { Title } from '../components/dashboardcomponents/projectquickadd/projectquickadd.style'
import '../styles/project.css'
const AddProject = () => {
    return (
        <>
            <div className='Test'>
                <div className='header'>
                    <h2>Edit {rowInfo.col1}</h2>
                </div>
                <div className='project-edit-container'>
                    <EditProject pName={rowInfo.col1} pDesc={rowInfo.col2} pHW={rowInfo.col3} pData={rowInfo.col4}/>
                    <Button onClick={() => {setRowDisplay(false);}}>Save Changes</Button>
                    <Button onClick={() => {setRowDisplay(false);}}>Discard Changes</Button>
                </div>
            </div>
        </>
    )
}

export default AddProject
