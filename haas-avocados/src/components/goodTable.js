/*
    Basic Table component
    Parent muss pass data for columns, data, and reference
    This table takes you to the edit project page on row click
    if a row is clicked it feeds the row data to the edit project page

*/

import React, { useImperativeHandle, useState } from "react";
import { useTable, useFilters, useGlobalFilter } from "react-table";
import "../styles/table.css";
import EditProject from "./editproject";
import { Button } from "./button.style";
import "../styles/project.css";
import { useHistory } from "react-router-dom";

// Our table component
const GoodTable = React.forwardRef(({ columns, data }, ref) => {  
  const [rowInfo, setRowInfo] = useState({});
  const [rowDisplay, setRowDisplay] = useState(false);
  const history = useHistory();

  const routeChange = (rowData) =>{ 
    console.log(rowData);
    history.push({
      pathname: '/addproject',
      rowData:{
        isHere: true,
        name: rowData.col1,
        description: rowData.col2,
        hw1:rowData.col3,
        hw2:rowData.col4
      }
    });
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

  //Only show fist 10 rows of data
  const firstPageRows = rows.slice(0, 10);
        
  //Using react-table hooks to populate table with data
    return (
        <>
        <div>
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
                    <tr {...row.getRowProps()} onClick={() => {routeChange(row.original)}}>
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

            
        </div>
        
        </>
    );
});

export default GoodTable;
