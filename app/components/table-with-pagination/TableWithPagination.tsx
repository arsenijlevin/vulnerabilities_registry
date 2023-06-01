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
import TooltipShowDescriptionButton from './TooltipShowDescriptionButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

type RecordType = string | number | boolean | null;
type TableDataType = Record<string, RecordType>;
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
  primaryKey: string | number,
  deleteHandler: (deleteLogin: string | number) => void,
  onOpenEdit: (isOpen: boolean, hardwareId: number) => void,
  openDescriptionHandler?: (isOpen: boolean, descriptionData: string) => void,
  withDescription?: string
  noProcess?: boolean
}

export default function CustomPaginationActionsTable<T extends TableDataType>({
  tableContent,
  primaryKey,
  headers,
  deleteHandler,
  onOpenEdit,
  openDescriptionHandler,
  withDescription,
  noProcess
}: TableProp<T>) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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

  let offset = withDescription ? headers.length + 3 : headers.length + 2;
  if (noProcess) offset -= 2;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHeader headers={headers} withDescription={withDescription} />
        <TableBody>
          {(rowsPerPage > 0
            ? tableContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : tableContent
          ).map((row, index) => {
            const value: RecordType = row[primaryKey];
            if (typeof value !== "boolean" && value !== null)
              return <DataRow
                data={row}
                key={index - 1}
                id={index}
                onDelete={() => deleteHandler(value)}
                onOpenDescription={openDescriptionHandler}
                withDescription={withDescription}
                onOpenEdit={onOpenEdit}
                noProcess />
          })}
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
              colSpan={offset}
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

interface TableHeaderProps {
  headers: Record<string, string | number>[],
  withDescription?: string,
  noProcess?: boolean
}

function TableHeader({ headers, withDescription, noProcess }: TableHeaderProps) {
  let additionalHeaders = [{
    title: "Изменить", key: "changeButton",
  }, {
    title: "Удалить", key: "deleteButton",
  }];
  if (!noProcess) additionalHeaders = []

  withDescription && additionalHeaders.unshift({
    title: "Описание", key: "descriptionButton",
  })



  headers = headers.concat(additionalHeaders)


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
  data: T,
  id: number,
  onDelete: () => void,
  onOpenEdit: (isOpen: boolean, hardwareId: number) => void,
  onOpenDescription?: (isOpen: boolean, text: string) => void,
  withDescription?: string,
  noProcess?: boolean
}

function DataRow<T extends TableDataType>({
  data,
  id,
  onDelete,
  withDescription,
  onOpenDescription,
  onOpenEdit,
  noProcess
}: DataRowProps<T>) {
  let text = "";

  return (
    <TableRow key={id}>

      {Object.keys(data).map((valueKey, index) => {
        const dataValue: RecordType = data[valueKey];
        if (typeof dataValue === "boolean") {
          if (dataValue) {
            return <TableCell key={index}><CheckIcon /></TableCell>
          } else {
            return <TableCell key={index}><CloseIcon /></TableCell>
          }
        }
        if (valueKey !== withDescription) {
          return <TableCell key={index}>{dataValue}</TableCell>
        }
        if (dataValue !== null) {
          text = dataValue.toString();
        } else {
          text = "";
        }
      })}
      {withDescription && onOpenDescription ?
        <TableCell style={{ width: 100 }} align="right">
          <TooltipShowDescriptionButton onClick={() => onOpenDescription(true, text)} />
        </TableCell> : <></>
      }

      {!noProcess && <TableCell style={{ width: 100 }} align="right">
        <TooltipModifyButton onClick={() => {
          typeof data.id === "number" && onOpenEdit(true, data.id)
        }
        } />
      </TableCell>}
      {!noProcess && <TableCell style={{ width: 100 }} align="right">
        <TooltipDeleteButton onClick={onDelete} />
      </TableCell>}
    </TableRow>
  )
}
