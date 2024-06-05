import * as React from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { TablePaginationActions } from './TablePaginationActions';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { OptionDTO } from '@api/types';
import { TableHeader } from './TableHeader';
import { DataRow } from './TableDataRow';
import { TableDataDescriptionModal } from './TableDataDescriptionModal';
import { useDisclosure } from '@hooks/useDisclosure';
import { TableDataEditForm } from '@/components/DataTable/edit/TableDataEditForm';

export interface DeletingProps {
  handler: (id: TableDataPrimaryKey) => void;
  isLoading: boolean;
}

export interface MinimalTableData {
  id: TableDataPrimaryKey;
  description?: string | null;
}

export interface TableHeaderData<T extends TableDataType> {
  title: string;
  key: keyof T;
}

export type RecordType = string | number | boolean | null | OptionDTO[];
export type TableDataPrimaryKey = string | number;
export type TableDataType = Record<string, RecordType> & MinimalTableData;

export interface TableProps<T extends TableDataType> {
  tableContent: T[];

  headers: TableHeaderData<T>[];
  primaryKey: TableDataPrimaryKey;

  deleteProps: DeletingProps;

  withDescription: boolean;
  descriptionTitle?: string;
}

export function DataTable<T extends TableDataType>(props: TableProps<T>) {
  const { tableContent, primaryKey, headers, withDescription, descriptionTitle, deleteProps } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableContent.length) : 0;

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const offset = headers.length + 2;

  const [selectedPrimaryKey, setSelectedPrimaryKey] = useState<TableDataPrimaryKey>();
  const [isDescriptionOpen, descriptionDisclosure] = useDisclosure();
  const [isEditFormOpen, editFormDisclosure] = useDisclosure();

  const selectedItem = tableContent.find((content) => content.id === selectedPrimaryKey);

  console.log(selectedItem?.id === selectedPrimaryKey);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHeader headers={headers} withDescription={withDescription} />
          <TableBody>
            {(rowsPerPage > 0
              ? tableContent.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : tableContent
            ).map((row, index) => {
              const id = row[primaryKey] as TableDataPrimaryKey;

              return (
                <DataRow
                  data={
                    Object.fromEntries(
                      Object.entries(row).filter(([key]) => headers.map((header) => header.key).includes(key)),
                    ) as T
                  }
                  key={index}
                  id={index}
                  deleteProps={{
                    handler: () => {
                      setSelectedPrimaryKey(id);
                      deleteProps.handler(id);
                    },
                    isLoading: id === selectedPrimaryKey && deleteProps.isLoading,
                  }}
                  onOpenDescription={() => {
                    setSelectedPrimaryKey(id);
                    descriptionDisclosure.open();
                  }}
                  withDescription={withDescription}
                  onOpenEdit={() => {
                    setSelectedPrimaryKey(id);
                    editFormDisclosure.open();
                  }}
                />
              );
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
                sx={{
                  '> *': {
                    alignItems: 'baseline',
                  },
                }}
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={offset}
                count={tableContent.length}
                rowsPerPage={rowsPerPage}
                page={page}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'Строк на странице',
                    },
                  },
                }}
                labelRowsPerPage="Строк на странице"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelDisplayedRows={({ from, to, count }) =>
                  `${from.toString()}-${to.toString()} из ${count.toString()}`
                }
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      {!!selectedItem?.description && (
        <TableDataDescriptionModal
          title={descriptionTitle ?? ''}
          text={selectedItem.description}
          open={isDescriptionOpen}
          handleClose={() => {
            descriptionDisclosure.close();
          }}
        />
      )}

      {/* {!!selectedItem?.description && (
        <TableDataEditForm
          data={}
          open={isEditFormOpen}
          handleClose={() => {
            editFormDisclosure.close();
          }}
        />
      )} */}
    </>
  );
}
