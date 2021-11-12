/**
 * Project.js
 * Temp for landing page
 */

import React, { useRef } from "react";
import '../styles/project.css'
import Table from '../components/table'
import {Button} from '../components/button.style';
import { useHistory } from 'react-router-dom';
 
function Project (){
  const tableInstance = useRef(null); 
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `addproject`; 
    history.push(path);
  } 
    
    const rawData = [
      [
        'Project1',
        'P1 description',
        'HWSet1',
        'Dataset1',
      ],
      [
        'Project2',
        'P2 description',
        'HWSet2',
        'Dataset2',
      ],
      [
        'Project3',
        'P3 description',
        'HWSet3',
        'Dataset3',
      ],
      [
        'Project4',
        'P4 description',
        'HWSet4',
        'Dataset4',
      ],
      [
        'Project5',
        'P5 description',
        'HWSet5',
        'Dataset5',
      ]
    ];

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
          Header: 'Hardware Sets',
          accessor: 'col3',
        },
        {
          Header: 'Datasets',
          accessor: 'col4',
        },
      ],[]
    )
  

    function formatData(rawData){
      const data = [];
      for (let i = 0; i < rawData.length; i++){
          data.push({
            col1: rawData[i][0],
            col2: rawData[i][1],
            col3: rawData[i][2],
            col4: rawData[i][3],
          });
      }
      return data;
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
           <Table columns={columns} data={formatData(rawData)} ref={tableInstance} onClick={console.log('Hide Click')}/>
          </div>
          <div className='project-add'>
            <Button onClick={routeChange}>Add Project</Button>
          </div>
         
        
            
        </div>
       </>
     );
 }


 
 export default Project;