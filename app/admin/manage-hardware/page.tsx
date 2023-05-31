"use client";

import Logout from '@app/components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TableWithPagination from '../../components/table-with-pagination/TableWithPagination';
import { useQueryOptions } from '@/lib/useQueryOptions';

export const metadata = {
  title: 'Оборудование'
}

async function getHardware() {
  const res = await fetch("/api/hardware/getAll");
  const hardware = await res.json();
  console.log(hardware)
  return hardware;
}

async function deleteUser(login : string | number) {
  const res = await fetch("/api/hardware/delete", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: `${login}`
    }),
  });

  if (res.status === 200) {
    return "OK"
  }

  return "";
}

export default function ManageHardware() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(
    ["hardware"],
    getHardware,
    useQueryOptions
  );



  const deleteHandler = async (deleteLogin : string | number) => {

    await deleteUser(deleteLogin);

    await queryClient.prefetchQuery(["hardware"], getHardware);

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
            { title: "Идентификатор", key:"login" },
            { title: "Наименование", key: "password" },
            { title: "Описание", key: "rights_id" },
            { title: "Местонахождение", key: "location" },
          ]}
          deleteHandler={deleteHandler} 
          modifyHandler={() => console.log(5)} />
      </Box>
      
    </section>
    
  )
}
