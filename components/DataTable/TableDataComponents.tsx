import * as React from 'react';

import TableCell from '@mui/material/TableCell';

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { OptionDTO } from '@api/types';
import { Chip } from '@mui/material';

export interface ValueProps<T> {
  value: T;
}

export const BooleanValue = (props: ValueProps<boolean>) => {
  return <TableCell>{props.value ? <CheckIcon /> : <CloseIcon />}</TableCell>;
};

export const NullValue = () => {
  return <TableCell></TableCell>;
};

export const TextValue = (props: ValueProps<string | number>) => {
  return <TableCell>{props.value.toString()}</TableCell>;
};

export const OptionValue = (props: ValueProps<OptionDTO[]>) => {
  return (
    <TableCell>
      {props.value.map((option, index) => (
        <Chip key={index} label={option.text} />
      ))}
    </TableCell>
  );
};
