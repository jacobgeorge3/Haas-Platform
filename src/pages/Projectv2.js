import React, { useImperativeHandle, useState, useRef } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import '../styles/project.css'
import {Button} from '../components/button.style';
import EditProject from "../components/editproject";
import { useHistory } from 'react-router-dom';
 
function Project2 (){
  const tableInstance = useRef(null);  
  const [rowInfo, setRowInfo] = useState({});
  const [rowDisplay, setRowDisplay] = useState(false);
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


    //If we want to edit projects
    //On row click, hide table and display same structure as add project with filled in info
    //On save changes click or x click hide add project structure and display table

    function rowClick(rowData){
        setRowDisplay(true); 
        setRowInfo(rowData);
    }
         
    const Table = React.forwardRef(({ columns, data }, ref) => {  
        const instance = useTable(
          {
            columns,
            data
          },
          useFilters, // useFilters!
          useGlobalFilter // useGlobalFilter!
        );
      
        const {
          getTableProps,
          getTableBodyProps,
          headerGroups,
          rows,
          prepareRow,
          state
        } = instance;
      
        // return table instance
        useImperativeHandle(ref, () => instance);
      
        const firstPageRows = rows.slice(0, 10);
      
          return (
              <>
              <table {...getTableProps()}>
                  <thead>
                  {headerGroups.map(headerGroup => (
                      <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                          <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                      ))}
                      </tr>
                  ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                  {firstPageRows.map((row, i) => {
                      prepareRow(row);
                      return (
                      <tr {...row.getRowProps()} onClick={rowClick(row.original)}>
                          {row.cells.map(cell => {
                          return (
                              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                          );
                          })}
                      </tr>
                      );
                  })}
                  </tbody>
              </table>
              <br />
              </>
          );
    });

    if(rowDisplay){
        console.log(rowDisplay);
        return (
            <div className='project-edit-container'>
                <EditProject pName={rowInfo.col1} pDesc={rowInfo.col2} pHW={rowInfo.col3} pData={rowInfo.col4}/>
                <Button onClick={() => {setRowDisplay(false);}}>Save Changes</Button>
                <Button onClick={() => {setRowDisplay(false);}}>Discard Changes</Button>
            </div>
        );
    }else{
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
            placeholder="Begin typing to search for a project by name"
          />
        </div>

         <div className='project-overview'>
           <Table columns={columns} data={formatData(rawData)} ref={tableInstance} />
         </div>
         
        <div className='project-add'>
          <Button onClick={routeChange}>Add Project</Button>
        </div>
            
        </div>
       </>
     );
    }
     
 }
 
 export default Project2;