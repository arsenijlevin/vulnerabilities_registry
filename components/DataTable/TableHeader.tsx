import { TableDataType, TableHeaderData } from '.';
import { TableHead, TableRow, TableCell } from '@mui/material';

interface TableHeaderProps<T extends TableDataType> {
  headers: TableHeaderData<T>[];
  withDescription: boolean;
}

export function TableHeader<T extends TableDataType>({ headers, withDescription }: TableHeaderProps<T>) {
  const additionalHeaders = [
    {
      title: 'Изменить',
      key: 'changeButton',
    },
    {
      title: 'Удалить',
      key: 'deleteButton',
    },
  ];

  headers = headers.concat(additionalHeaders);

  return (
    <TableHead>
      <TableRow>
        {headers.map((header, index) => (
          <TableCell key={index}>{header.title}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
