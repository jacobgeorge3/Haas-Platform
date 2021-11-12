/**
 * Project.js
 * Temp for landing page
 */

import React, { useRef, useEffect, useState} from "react";
import '../styles/project.css'
import ProjectTable from '../components/projectTable'
import {Button} from '../components/button.style';
import { useHistory } from 'react-router-dom';
import Auth from '../Auth'
 
function Project (){
  const tableInstance = useRef(null); 
  const history = useHistory();
  const [data, setData] = useState({});
  const arr = [];

  
  useEffect(() => {
    Auth.get('/project/get-all').then(data => setData(data));
    Object.keys(data).forEach(key => arr.push({name: key, value: data[key]}))
  },[]);



  const routeChange = () =>{ 
    let path = `addproject`; 
    history.push(path);
  } 

    const columns = React.useMemo(
      () => [
        {
          Header: 'Project Name',
          accessor: 'col1', // accessor is the "key" in the data
          filter:'pSearch'
        },
        {
          Header: 'Project Description',
          accessor: 'col2',
        },
        {
          Header: 'Hardware Set 1',
          accessor: 'col3',
        },
        {
          Header: 'Hardware Set 2',
          accessor: 'col4',
        },
      ],[]
    )
  

    function formatData(){
      const tableData = [];
      for (let [key, value] of Object.entries(data)) {
        tableData.push({
          col1:value["name"],
          col2:value["description"],
          col3:value["hw1"],
          col4:value["hw2"]
        } 
        );
        
      }
      return tableData;
    }

    // <>
    //         <div className='Test'>
    //             <div className='header'>
    //                 <h2>Edit {rowInfo.col1}</h2>
    //             </div>
    //             <div className='project-edit-container'>
    //                 <EditProject pName={rowInfo.col1} pDesc={rowInfo.col2} pHW={rowInfo.col3} pData={rowInfo.col4}/>
    //                 <Button onClick={() => {setRowDisplay(false);}}>Save Changes</Button>
    //                 <Button onClick={() => {setRowDisplay(false);}}>Discard Changes</Button>
    //             </div>
    //         </div>
    // </>


    //If we want to edit projects
    //On row click, hide table and display same structure as add project with filled in info
    //On save changes click or x click hide add project structure and display table
         
     return (
       <>
        <div>
          <div className='header'>
            <h1>Projects</h1>
            <p>Click on a row to view/edit an existing project. </p>
          </div>

          <div className='project-search'>
            <input
              onChange={(e) => {
                tableInstance.current.setGlobalFilter(e.target.value);
              }}
              placeholder="Search for a Project"
            />
          </div>
          <div className='project-overview'>
           <ProjectTable columns={columns} data={formatData()} ref={tableInstance} onClick={console.log('Hide Click')}/>
          </div>
          <div className='project-add'>
            <Button onClick={routeChange}>Add Project</Button>
            <Button onClick={() => {console.log(data)}}>Test Data</Button>
            <Button onClick={() => {formatData()}}>Test Format</Button>
          </div>
         
        
            
        </div>
       </>
     );
 }


 
 export default Project;