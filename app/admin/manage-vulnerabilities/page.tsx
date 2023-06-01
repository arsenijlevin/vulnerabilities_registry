"use client";

import Logout from '@app/components/Logout';
import { Box } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import TableWithPagination from '../../components/table-with-pagination/TableWithPagination';
import { useQueryOptions } from '@lib/useQueryOptions';
import { Vulnerabilities } from '../../api/vulnerabilities/getAll/route';
import { useState } from 'react';
import DescriptionModal from '../../components/table-with-pagination/DescriptionModal';
import { DateTime } from "luxon";
import AddButton from '../../components/AddButton';

export const metadata = {
  title: 'Уязвимости оборудования'
}

async function getVulnerabilities() {
  const res = await fetch("/api/vulnerabilities/getAll");
  const vulnerabilities = await res.json() as Vulnerabilities;


  const vulnerabilitiesWithStringTypes = vulnerabilities.map((vulnerability) => {
    let discoveryDateString = ""

    if (!vulnerability.discovery_date) {
      discoveryDateString = "Неизвестно";
    } else {
      const luxonDate = DateTime.fromJSDate(new Date(vulnerability.discovery_date));
      discoveryDateString = luxonDate.toLocaleString(DateTime.DATE_FULL, { locale: 'ru' });
    }

    return {
      ...vulnerability,
      long_text_description: vulnerability.long_text_description ?? "",
      is_fixed: vulnerability.is_fixed ?? false,
      discovery_date: discoveryDateString,
      vuln_types: vulnerability.vuln_types.map((vuln_type) => vuln_type.vuln_types_list.title).join(", "),
    };
  })

  return vulnerabilitiesWithStringTypes;
}

async function deleteVulnerability(id: string | number) {
  const res = await fetch("/api/vulnerabilities/delete", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login: `${id}`
    }),
  });

  if (res.status === 200) {
    return "OK"
  }

  return "";
}

export default function ManageVulnerabilities() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [descriptionText, setDescriptionText] = useState("");

  const { data, isLoading, isError } = useQuery(
    ["vulnerabilities"],
    getVulnerabilities,
    useQueryOptions
  );

  const descriptionHandler = (isOpen: boolean, text: string) => {
    setOpen(isOpen);
    setDescriptionText(text);
  }


  const deleteHandler = async (id: string | number) => {

    await deleteVulnerability(id);

    await queryClient.prefetchQuery(["vulnerabilities"], getVulnerabilities);

    // if (deleteKey === userToUpdate?.login) setFormMode('add');

  }

  if (isLoading) return <></>;
  if (isError || !data) return <></>;


  return (
    <>
      <section className="py-5 px-10 container mx-auto">
        <h2 className="text-xl md:text-5xl text-center font-bold py-10">
          {metadata.title}
        </h2>
        <div className="left flex gap-3 flex-col">
          <AddButton></AddButton>
          <Logout></Logout>
        </div>
        <Box>
          <TableWithPagination
            tableContent={data}
            primaryKey="id"
            headers={[
              { title: "Идентификатор", key: "id" },
              { title: "Название", key: "name" },
              { title: "Дата обнаружения", key: "discovery_date" },
              { title: "Состояние исправления", key: "is_fixed" },
              { title: "Тип уязвимости", key: "vuln_types" },
            ]}
            deleteHandler={deleteHandler}
            onOpenEdit={() => console.log(5)}
            openDescriptionHandler={descriptionHandler}
            withDescription={"long_text_description"}
          />
        </Box>

      </section>
      <DescriptionModal
        text={descriptionText}
        open={open}
        handleClose={() => setOpen(false)} handleOpen={() => setOpen(true)} />
    </>
  )
}
