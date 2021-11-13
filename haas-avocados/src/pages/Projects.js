/**
 * Project.js
 * Display all the projects a currently signed in user is tied to
 * Able to filter through table
 * Able to add projects using button
 * Able to edit projects by clicking a row
 */

import React, { useRef, useEffect, useState} from "react";
import '../styles/project.css'
import GoodTable from '../components/goodTable'
import {Button} from '../components/button.style';
import { useHistory } from 'react-router-dom';
import Auth from '../Auth'
 
function Project (){
  const [remProject, setRemove] = useState("");
  const [error, setError] = useState("");
  const tableInstance = useRef(null); 
  const history = useHistory();
  const [data, setData] = useState({});
  const arr = [];

  //Set data of the table to data received from the backend
  useEffect(() => {
    Auth.get('/project/get-all').then(data => setData(data));
    Object.keys(data).forEach(key => arr.push({name: key, value: data[key]}))
  },[]);



  //Function to route to addproject page from button click
  const routeChange = () =>{ 
    history.push({
      pathname: '/addproject',
      rowData:{
          isHere: false
        }
    });
  } 

  const removeProject = () => {
    console.log(remProject)
    Auth.post('/project/remove', {'name': remProject}).then(data => {
      if (data['status'] == 200){
        window.location.reload(false);
      } else {
        setError(data['msg']);
      }
    })
  }

  //Creating the columns in the table
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
  

    //function to format the data received from database
    function formatData(){
      const tableData = [];
      for (let [key, value] of Object.entries(data)) {
        tableData.push({
          col1:value["name"],
          col2:value["description"],
          col3:value["hwset1"],
          col4:value["hwset2"]
        } 
        );
        
      }
      return tableData;
    }



    //return a header, input box for a filter word, table of data, and button to add projects         
     return (
       <>
        <div>
          <div className='header'>
            <p style={{color: 'red'}}>{error}</p>
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
          <div className='project-overview' style={{border: "solid 5px #FFECA1"}}>
           <GoodTable columns={columns} data={formatData()} ref={tableInstance} onRowClick={routeChange}/>
          </div>
          <div className='remove-container'>
            <p >Enter name of project to remove</p>

            <div className='input-remove-container'>
              <div className='project-remove'>
                <input
                  onChange={(e) => { 
                    tableInstance.current.setGlobalFilter(e.target.value); 
                    setRemove(e.target.value);
                  }}
                  placeholder="Project name"
                />
              </div>   

              <div>
                <Button onClick={removeProject}>Remove Project</Button>
              </div>
            </div>
            
          </div>
         
        
            
        </div>
       </>
     );
 }


 
 export default Project;