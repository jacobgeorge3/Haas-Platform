import React from 'react';
import { useTable } from 'react-table'
import '../styles/table.css'

function Table(props) {

  const data = React.useMemo(
    () => props.data,
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Project Name',
        accessor: 'col1', // accessor is the "key" in the data
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
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data })

  return (
    <table {...getTableProps()} >
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;