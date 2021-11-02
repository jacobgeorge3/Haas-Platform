// datasetTable.js

import { 
  Button, 
  Paper, 
  Table,
  TableContainer, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody,
  TableFooter,
  TablePagination } from "@mui/material";
import React from "react";

export default function DatasetTable(props) {
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 5;

  const emptyRows = 
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.rows.length) : 0;

  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="dataset table">
        <TableHead>
          <TableRow>
            <TableCell style={{ width: "10%" }}>
              <h1>Dataset</h1>
            </TableCell>
            <TableCell>
              <h1>Description</h1>
            </TableCell>
            <TableCell style={{ width: "5%" }}>
              <h1>Page Link</h1>
            </TableCell>
            <TableCell style={{ width: "10%" }}>
              <h1>Download</h1>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, idx) => {
              return (
              <TableRow key={data.id}>
                <TableCell component="th" scope="row">{data.title}</TableCell>
                <TableCell>
                  {data.description}
                </TableCell>
                <TableCell>
                  <a href={data.pageLink} style={{color: '#FFECA1'}}>{data.pageLink}</a>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    href={data.download}
                    >
                      Click here to download
                    </Button>
                </TableCell>
              </TableRow> )
            })
          }
          {
            emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={3} />
              </TableRow>
            )
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              colsSpan={3}
              count={props.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              rowsPerPageOptions={[]}
              onPageChange={handleChangePage}
              />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )

}