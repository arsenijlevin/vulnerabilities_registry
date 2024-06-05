'use client';

import * as React from 'react';

import { Checkbox, Select, TextField } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';
import { TableEditType } from './TableDataEditForm';
import { DatePicker } from '@mui/x-date-pickers';

export interface ValueProps<T> {
  value: T;
}

interface InputProps<T extends TableEditType> {
  label: string;
  register: UseFormRegister<T>;
  required: boolean;
}

export const BooleanInput = ({ label, register, required }: InputProps<TableEditType>) => (
  <>
    <label>{label}</label>
    <Checkbox {...register(label, { required })} />
  </>
);

export const TextInput = ({ label, register, required }: InputProps<TableEditType>) => (
  <>
    <label>{label}</label>
    <TextField {...register(label, { required })} />
  </>
);

export const OptionInput = ({ label, register, required }: InputProps<TableEditType>) => (
  <>
    <label>{label}</label>
    <Select {...register(label, { required })} />
  </>
);

export const DateInput = ({ label, register, required }: InputProps<TableEditType>) => (
  <>
    <label>{label}</label>
    <DatePicker {...register(label, { required })} />
  </>
);
