'use client';

import Logout from '@components/Logout';
import { Box, CircularProgress } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { TableDataType, DataTable } from '@components/DataTable';
import { useQueryOptions } from '@lib/useQueryOptions';
import { getVulnerabilitiesForHardware } from './lib/getVulnerabilitiesForHardware';
import { useState } from 'react';

import Select from 'react-select';

import AddButton from '@components/AddButton';
import { getHardware } from '@/app/(routes)/(users)/admin/manage-hardware/lib/getHardware';

export default function VulnerabilitiesForHardware() {
  const queryClient = useQueryClient();

  const [id, setId] = useState(16);

  const vulnQuery = useQuery(
    ['vulnerabilities_for_hardware_id'],
    () => getVulnerabilitiesForHardware(id),
    useQueryOptions,
  );

  const hardwareQuery = useQuery(['hardware'], () => getHardware(), useQueryOptions);

  const getLabels = (data: { id: string | number; name: string | number }[]) => {
    return data.map((x) => {
      return {
        value: parseInt(x.id.toString()),
        label: x.name,
      };
    });
  };
  const [open, setOpen] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');
  const descriptionHandler = (isOpen: boolean, text: string) => {
    setOpen(isOpen);
    setDescriptionText(text);
  };

  const changeValue = async (id: number) => {
    setId(id);
    await queryClient.prefetchQuery(['vulnerabilities_for_hardware_id'], () => getVulnerabilitiesForHardware(id));
  };

  const isLoading =
    vulnQuery.isLoading || hardwareQuery.isLoading || hardwareQuery.isRefetching || vulnQuery.isRefetching;

  if (vulnQuery.isError || !hardwareQuery.data || hardwareQuery.isError) return <></>;

  return (
    <section className="py-5 px-10 container mx-auto">
      <h2 className="text-xl md:text-5xl text-center font-bold py-10">Выбор уязвимостей по оборудованию</h2>
      <div className="left flex flex-col">
        <AddButton></AddButton>
        <Logout></Logout>
      </div>
      <Select
        onChange={(choice) => changeValue(choice?.value ?? -1)}
        noOptionsMessage={() => 'Не найдено'}
        placeholder="Оборудование"
        options={getLabels(hardwareQuery.data)}
      />
      <Box className="mt-5 w-100">
        {isLoading ? (
          <CircularProgress className="m-auto" />
        ) : (
          <DataTable
            tableContent={vulnQuery.data as unknown as TableDataType[]}
            primaryKey="id"
            headers={[
              { title: 'Идентификатор', key: 'id' },
              { title: 'Название', key: 'name' },
              { title: 'Тип', key: 'vuln_type' },
            ]}
            withDescription
            deleteProps={{
              handler: () => {
                console.log('asd');
              },
              isLoading: false,
            }}
          />
        )}
      </Box>
    </section>
  );
}
