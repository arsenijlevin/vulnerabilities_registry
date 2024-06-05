import { TableDataType, RecordType, TableDataPrimaryKey, DeletingProps } from '.';
import TooltipDeleteButton from './TooltipDeleteButton';
import TooltipModifyButton from './TooltipModifyButton';
import TooltipShowDescriptionButton from './TooltipShowDescriptionButton';
import { TableRow, TableCell, CircularProgress } from '@mui/material';

import { BooleanValue, NullValue, OptionValue, TextValue } from './TableDataComponents';
import { Fragment } from 'react';

export interface DataRowProps<T extends TableDataType> {
  data: T;
  id: TableDataPrimaryKey;
  deleteProps: DeletingProps;
  onOpenEdit: (isOpen: boolean, id: TableDataPrimaryKey) => void;
  onOpenDescription?: (isOpen: boolean, text: string) => void;
  withDescription?: boolean;
}

export function DataRow<T extends TableDataType>(props: DataRowProps<T>) {
  const { data, id, deleteProps, onOpenDescription, onOpenEdit } = props;

  console.log(data);

  const description = data.description;

  return (
    <TableRow key={id}>
      {Object.keys(data).map((valueKey, index) => {
        const dataValue: RecordType = data[valueKey];

        if (valueKey === 'description') {
          return <Fragment key={index} />;
        }

        if (Array.isArray(dataValue)) {
          return <OptionValue value={dataValue} key={index} />;
        }

        if (typeof dataValue === 'string' || typeof dataValue === 'number') {
          return <TextValue value={dataValue} key={index} />;
        }

        if (typeof dataValue === 'boolean') {
          return <BooleanValue value={dataValue} key={index} />;
        }

        return <NullValue key={index} />;
      })}

      <TableCell style={{ width: 100 }} align="right">
        {!!description && (
          <TooltipShowDescriptionButton
            onClick={() => {
              onOpenDescription && onOpenDescription(true, description);
            }}
          />
        )}
      </TableCell>

      <TableCell style={{ width: 100 }} align="right">
        <TooltipModifyButton
          onClick={() => {
            onOpenEdit(true, id);
          }}
        />
      </TableCell>

      <TableCell style={{ width: 100 }} align="right">
        {deleteProps.isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <TooltipDeleteButton
            onClick={() => {
              deleteProps.handler(id);
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
}
