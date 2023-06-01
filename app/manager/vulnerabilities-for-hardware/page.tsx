"use client";

import Logout from '@app/components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TableWithPagination from '../../components/table-with-pagination/TableWithPagination';
import { useQueryOptions } from '@lib/useQueryOptions';
import { getVulnerabilitiesForHardware } from './lib/getVulnerabilitiesForHardware';
import { useState } from 'react';
import { getHardware } from '@app/admin/manage-hardware/lib/getHardware';
import Select from "react-select";
import DescriptionModal from '../../components/table-with-pagination/DescriptionModal';
import AddButton from '../../components/AddButton';

export const metadata = {
  title: 'Выбор уязвимостей по оборудованию'
}



export default function VulnerabilitiesForHardware() {
  const queryClient = useQueryClient();
  const [id, setId] = useState(-1);

  const vulnQuery = useQuery(
    ["vulnerabilities_for_hardware_id"],
    () => getVulnerabilitiesForHardware(id),
    useQueryOptions
  );

  const rightsQuery = useQuery(
    ["hardware"],
    () => getHardware(),
    useQueryOptions
  );

  const getLabels = (data: any[]) => {
    return data.map(x => {
      return {
        value: x.id,
        label: x.name
      }
    })
  }
  const [open, setOpen] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");
  const descriptionHandler = (isOpen: boolean, text: string) => {
    setOpen(isOpen);
    setDescriptionText(text);
  }


  const changeValue = async (id: number) => {
    setId(id);
    await queryClient.prefetchQuery(["vulnerabilities_for_hardware_id"], () => getVulnerabilitiesForHardware(id));
  }


  if (vulnQuery.isLoading || rightsQuery.isLoading) return <></>;
  if (vulnQuery.isError || !vulnQuery.data || !rightsQuery.data || rightsQuery.isError) return <></>;

  console.log(vulnQuery.data)


  return (

    <section className="py-5 px-10 container mx-auto">
      <h2 className="text-xl md:text-5xl text-center font-bold py-10">
        {metadata.title}
      </h2>
      <div className="left flex flex-col">
        <AddButton></AddButton>
        <Logout></Logout>
      </div>
      <Select onChange={(choice) => changeValue(choice?.value || "-1")} noOptionsMessage={() => 'Не найдено'} placeholder="Оборудование" options={getLabels(rightsQuery.data)} />
      <Box className={"mt-5"}>
        <TableWithPagination
          tableContent={vulnQuery.data}
          primaryKey="id"
          headers={[
            { title: "Идентификатор", key: "id" },
            { title: "Название", key: "name" },
            { title: "Тип", key: "vuln_type" },
          ]}
          withDescription={"long_text_description"}
          openDescriptionHandler={descriptionHandler}
          onOpenEdit={() => console.log(5)} />
      </Box>
      <DescriptionModal
        text={descriptionText}
        open={open}
        handleClose={() => setOpen(false)}
        handleOpen={() => setOpen(true)}
      />

    </section>

  )
}
