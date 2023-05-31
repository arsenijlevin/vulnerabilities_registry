import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TableHead } from '@mui/material';
import TooltipModifyButton from './TooltipModifyButton';
import TooltipDeleteButton from './TooltipDeleteButton';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

interface TableProp<T> {
  tableContent: T[],
  headers: Record<string, string | number>[],
  primaryKey : string | number,
  deleteHandler: (deleteLogin : string | number) => void,
  modifyHandler: (modifyLogin : string | number) => void
}

export default function CustomPaginationActionsTable<T extends Record<string, string | number>>({ 
  tableContent,
  primaryKey, 
  headers,
  deleteHandler, 
  modifyHandler 
}: TableProp<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableContent.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeader headers={headers}/>
        <TableBody>
          {(rowsPerPage > 0
            ? tableContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableContent
          ).map((row, index) => (
            <DataRow 
              data={row} 
              key={index - 1} 
              id={index} 
              onDelete={() => deleteHandler(row[primaryKey])} 
              onUpdate={() => modifyHandler(row[primaryKey])} />
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={headers.length + 2}
              count={tableContent.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'Строк на странице',
                },
              }}
              labelRowsPerPage='Строк на странице'
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count}`}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

function TableHeader({ headers } : {headers: Record<string, string | number>[]}) {


  headers = headers.concat(
    [{
      title: "Изменить", key: "changeButton",
    }, {
      title: "Удалить", key: "deleteButton",
    }]
  )
  

  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => 
          <TableCell key={index}>{header.title}</TableCell>
        )}
      </TableRow>
    </TableHead>
  )
}

interface DataRowProps<T> {
  data : T, 
  id : string | number, 
  onUpdate : () => void, 
  onDelete : () => void
  }

function DataRow<T extends Record<string, number | string>>({ data, id, onUpdate, onDelete } : DataRowProps<T>) {

  return (
    <TableRow key={id}>
      {Object.keys(data).map((valueKey, index) => (
        <TableCell key={index}>{data[valueKey]}</TableCell>
      ))}
      <TableCell style={{ width: 100 }} align="right">
        <TooltipModifyButton onClick={onUpdate}/>
      </TableCell>
      <TableCell style={{ width: 80 }} align="right">
        <TooltipDeleteButton onClick={onDelete}/>
      </TableCell>
    </TableRow>
  )
}
