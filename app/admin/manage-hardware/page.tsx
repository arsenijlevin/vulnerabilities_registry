"use client";

import Logout from '@app/components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TableWithPagination from '../../components/table-with-pagination/TableWithPagination';
import { useQueryOptions } from '@lib/useQueryOptions';
import { useState } from 'react';
import EditModalHardware from './EditModalHardware';
import DescriptionModal from '../../components/table-with-pagination/DescriptionModal';
import { getHardware } from './lib/getHardware';
import { getHardwareById } from './lib/getHardwareById';
import { deleteHardware } from './lib/deleteHardware';
import AddButton from '../../components/AddButton';

export const metadata = {
  title: 'Оборудование'
}

export default function ManageHardware() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const [openEdit, setOpenEdit] = useState(false);

  const hardwareAllQuery = useQuery(
    ["hardware"],
    getHardware,
    useQueryOptions
  );

  const hardwareByIdQuery = useQuery(
    ["hardware-id"],
    () => getHardwareById(3),
    useQueryOptions
  );

  const descriptionHandler = (isOpen: boolean, text: string) => {
    setOpen(isOpen);
    setDescriptionText(text);
  }

  const onEditOpen = async (isOpen: boolean, hardwareId: number) => {
    await queryClient.prefetchQuery(["hardware-id"], () => getHardwareById(hardwareId));

    setOpenEdit(isOpen);
  }


  const deleteHandler = async (id: string | number) => {

    await deleteHardware(id);

    await queryClient.prefetchQuery(["hardware"], getHardware);

    // if (deleteKey === userToUpdate?.login) setFormMode('add');

  }


  if (hardwareAllQuery.isLoading || hardwareByIdQuery.isLoading) return <></>;
  if (
    hardwareAllQuery.isError || !hardwareAllQuery.data ||
    hardwareByIdQuery.isError || !hardwareByIdQuery.data
  ) return <></>;

  return (
    <>
      <section className="py-5 px-10 container mx-auto">
        <h2 className="text-xl md:text-5xl text-center font-bold py-10">
          {metadata.title}
        </h2>
        <div className="left flex flex-col">
          <AddButton></AddButton>
          <Logout></Logout>
        </div>
        <Box>
          <TableWithPagination
            tableContent={hardwareAllQuery.data}
            primaryKey="id"
            headers={[
              { title: "Идентификатор", key: "id" },
              { title: "Наименование", key: "name" },
              { title: "Местонахождение", key: "location" },
            ]}
            deleteHandler={deleteHandler}
            onOpenEdit={onEditOpen}
            withDescription={"long_text_description"}
            openDescriptionHandler={descriptionHandler} />
        </Box>

      </section>
      <DescriptionModal
        text={descriptionText}
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />
      <EditModalHardware
        hardware={hardwareByIdQuery.data}
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        handleOpen={() => setOpenEdit(true)}
      />

    </>
  )
}
