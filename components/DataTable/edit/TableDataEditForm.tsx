'use client';

import { OptionDTO } from '@/app/api/types';

import { BooleanInput, DateInput, OptionInput, TextInput } from '@/components/DataTable/edit/TableDataEditComponents';

import { Box, Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { useForm, SubmitHandler } from 'react-hook-form';

import style from 'styled-jsx/style';

export interface TableEditLabels<T extends TableEditType> {
  title: string;
  key: keyof T;
}

export interface TableDataEditFormProps<T extends TableEditType> {
  data: T;
  headers: TableEditLabels<T>[];
  open: boolean;
  handleClose: () => void;
}

export type TableDataToEdit = string | number | boolean | OptionDTO[] | Date;
export type TableEditType = Record<string, TableDataToEdit>;

export function TableDataEditForm<T extends TableEditType>(props: TableDataEditFormProps<T>) {
  const { open, handleClose, data, headers } = props;
  const { register, handleSubmit } = useForm<T>();

  const onSubmit: SubmitHandler<T> = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(data).map((valueKey, index) => {
              const dataValue: TableDataToEdit = data[valueKey];

              if (Array.isArray(dataValue)) {
                return <OptionInput key={index} label={'Опции'} register={register} required />;
              }

              if (typeof dataValue === 'string' || typeof dataValue === 'number') {
                return <TextInput key={index} label={'Текст'} register={register} required />;
              }

              if (typeof dataValue === 'boolean') {
                return <BooleanInput key={index} label={'Чекбокс'} register={register} required />;
              }

              if (dataValue instanceof Date) {
                return <DateInput key={index} label={'Дата'} register={register} required />;
              }

              return <></>;
            })}
          </form>
        </LocalizationProvider>
      </Box>
    </Modal>
  );
}
