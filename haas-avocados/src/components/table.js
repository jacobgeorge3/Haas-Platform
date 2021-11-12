/*
    Basic Table component
    Parent muss pass data for columns, data, and reference

*/

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

            
        </div>
        
        </>
    );
});

export default Table;