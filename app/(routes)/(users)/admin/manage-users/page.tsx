'use client';

import Logout from '@components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { DataTable } from '@components/DataTable';
import { useQueryOptions } from '@/lib/useQueryOptions';
import { getUsers } from './lib/getUsers';
import { deleteUser } from './lib/deleteUser';
import AddButton from '@components/AddButton';

export default function ManageUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(['users'], getUsers, useQueryOptions);

  const deleteHandler = async (deleteLogin: string | number) => {
    await deleteUser(deleteLogin);

    await queryClient.prefetchQuery(['users'], getUsers);

    // if (deleteKey === userToUpdate?.login) setFormMode('add');
  };

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <section className="py-5 px-10 container mx-auto">
      <h2 className="text-xl md:text-5xl text-center font-bold py-10">Управление пользователями</h2>
      <div className="left flex flex-col">
        <AddButton></AddButton>
        <Logout></Logout>
      </div>
      <Box>
        <DataTable
          tableContent={data}
          primaryKey="login"
          headers={[
            { title: 'Логин', key: 'login' },
            { title: 'Пароль', key: 'password' },
            { title: 'Права', key: 'rights_id' },
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
