import { TextField } from '@mui/material'
import React from 'react'
import ContentContainer from '../components/dashboardcomponents/ContentContainer.style'
import { Title } from '../components/dashboardcomponents/projectquickadd/projectquickadd.style'
import {Button} from '../components/button.style';
import '../styles/project.css'
import EditProject from '../components/editproject'
const AddProject = () => {
    return (
        <>
            <div className='Test'>
                <div className='header'>
                    <h2>Add Project</h2>
                </div>
                <div className='project-edit-container'>
                    <EditProject/>
                </div>
            </div>
        </>
    )
}

export default AddProject
