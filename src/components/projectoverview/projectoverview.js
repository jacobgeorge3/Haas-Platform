import React from 'react';
import { useTable } from 'react-table'

function ProjectOverview(props) {

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
    <table {...getTableProps()} style={{ border: 'solid 5px #FFECA1' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px #FFECA1',
                  background: '#2cd319',
                  color: '#1c6b13',
                  fontWeight: 'bold',
                }}
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
                    style={{
                      paddingBottom: '5px',
                      borderBottom: 'solid 1px #FFECA1',
                       background: 'black',
                    }}
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

export default ProjectOverview;