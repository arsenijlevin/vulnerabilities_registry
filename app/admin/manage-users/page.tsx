"use client";

import Logout from '@app/components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TableWithPagination from '../../components/table-with-pagination/TableWithPagination';
import { useQueryOptions } from '@/lib/useQueryOptions';
import { getUsers } from './lib/getUsers';
import { deleteUser } from './lib/deleteUser';

export const metadata = {
  title: 'Управление пользователями'
}

export default function ManageUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["users"],
    getUsers,
    useQueryOptions
  );



  const deleteHandler = async (deleteLogin : string | number) => {

    await deleteUser(deleteLogin);

    await queryClient.prefetchQuery(["users"], getUsers);

    // if (deleteKey === userToUpdate?.login) setFormMode('add');

  }

  if (isLoading) return <></>;
  if (isError || !data) return <></>;
  
  
  return (
    
    <section className="py-5 px-10 container mx-auto">
      <h2 className="text-xl md:text-5xl text-center font-bold py-10">
        {metadata.title}
      </h2>
      <div className="left flex gap-3">
        <Logout></Logout>
      </div>
      <Box>
        <TableWithPagination 
          tableContent={data} 
          primaryKey="login"
          headers={[
            { title: "Логин", key:"login" },
            { title: "Пароль", key: "password" },
            { title: "Права", key: "rights_id" },
          ]}
          deleteHandler={deleteHandler} 
          modifyHandler={() => console.log(5)} />
      </Box>
      
    </section>
    
  )
}
