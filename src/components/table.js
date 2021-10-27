import React, { useImperativeHandle, useState } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import '../styles/table.css'
import EditProject from "./editproject";
import {Button} from './button.style'
import '../styles/project.css'
import { useHistory } from 'react-router-dom';

// Our table component
const Table = React.forwardRef(({ columns, data }, ref) => {  
  const [rowInfo, setRowInfo] = useState({});
  const [rowDisplay, setRowDisplay] = useState(false);

  const history = useHistory();

  const routeChange = () =>{ 
    let path = `addproject`; 
    history.push(path);
  }


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

  if(rowDisplay){
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
                    instance.setGlobalFilter(e.target.value);
                    }}
                    placeholder="Begin typing to search for a project by name"
                />
            </div>

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
                    <tr {...row.getRowProps()} onClick={() => {setRowDisplay(true); setRowInfo(row.original);}}>
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

            <div className='project-add'>
            <Button onClick={routeChange}>Add Project</Button>
            </div>
        </div>
        
        </>
    );
  }
});

export default Table;