'use client';

import Logout from '@components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@components/DataTable';
import { useQueryOptions } from '@lib/useQueryOptions';
import { getLocations } from './lib/getLocations';
import AddButton from '@components/AddButton';

async function deleteLocation(login: string | number) {
  const res = await fetch('/api/locations', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: login.toString(),
    }),
  });

  if (res.status === 200) {
    return 'OK';
  }

  return '';
}

export default function ManageLocations() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(['locations'], getLocations, useQueryOptions);

  const deleteHandler = async (id: string | number) => {
    await deleteLocation(id);

    await queryClient.prefetchQuery(['locations'], getLocations);

    // if (deleteKey === userToUpdate?.login) setFormMode('add');
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <section className="py-5 px-10 container mx-auto">
      <h2 className="text-xl md:text-5xl text-center font-bold py-10">Местоположения оборудования</h2>
      <div className="left flex flex-col">
        <AddButton></AddButton>
        <Logout></Logout>
      </div>
      <Box>
        <DataTable
          tableContent={data}
          primaryKey="id"
          headers={[
            { title: 'Идентификатор', key: 'id' },
            { title: 'Название', key: 'name' },
            { title: 'Описание', key: 'description' },
          ]}
          deleteHandler={deleteHandler}
          onOpenEdit={() => {
            console.log(5);
          }}
        />
      </Box>
    </section>
  );
}
