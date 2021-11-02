import { TextField } from '@mui/material'
import React from 'react'
import ContentContainer from '../components/dashboardcomponents/ContentContainer.style'
import { Title } from '../components/dashboardcomponents/projectquickadd/projectquickadd.style'
const AddProject = () => {
    return (
        <>
            <ContentContainer center width="100%" padding="10% 0px">
                <ContentContainer border center width="60%" padding="10px" flexdirection="column">
                    <Title>Project Name
                    </Title>
                    <TextField variant="filled" />
                    
                </ContentContainer>
            </ContentContainer>
        </>
    )
}

export default AddProject
