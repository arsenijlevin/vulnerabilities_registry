'use client';

import { Box } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useQueryOptions } from '@lib/useQueryOptions';

import AddButton from '@components/AddButton';
import Logout from '@components/Logout';
import { Vulnerability, VulnerabilityDTO } from '@/dto/VulnerabilityDTO';
import { ChatbotForm } from '@components/ChatbotForm/ChatbotForm';
import { DataTable } from '@/components/DataTable';
import { useState } from 'react';
import { useDisclosure } from '@/hooks/useDisclosure';

async function deleteVulnerability(id: number) {
  const deleteResponse = await fetch(`/api/vulnerability/${id.toString()}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return deleteResponse;
}

async function getVulnerabilities() {
  const response = await fetch('/api/vulnerability', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const vulnerabilities = (await response.json()) as Vulnerability[];

  console.log(vulnerabilities);

  return vulnerabilities;
}

export default function ManageVulnerabilities() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery(['vulnerabilities'], getVulnerabilities, useQueryOptions);
  const disclosure = useDisclosure(true);
  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return deleteVulnerability(id);
    },
  });

  const deleteHandler = async (id: number | string) => {
    deleteMutation.mutate(parseInt(id.toString()));

    await queryClient.prefetchQuery(['vulnerabilities'], getVulnerabilities);
  };

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error!</>;

  return (
    <>
      <section className="py-5 px-10 container mx-auto">
        <h2 className="text-xl md:text-5xl text-center font-bold pb-10">Уязвимости оборудования</h2>
        <div className="left flex gap-3 flex-col">
          <AddButton></AddButton>
          <Logout></Logout>
        </div>
        <Box>
          <DataTable
            tableContent={data
              .map((vulnerability) => new VulnerabilityDTO(vulnerability).toTable())
              .sort((a, b) => b.id - a.id)}
            primaryKey="id"
            headers={[
              { title: 'Идентификатор', key: 'id' },
              { title: 'Название', key: 'name' },
              { title: 'Дата обнаружения', key: 'discovery_date' },
              { title: 'Состояние исправления', key: 'is_fixed' },
              { title: 'Тип уязвимости', key: 'vuln_types' },
              { title: 'Описание', key: 'description' },
            ]}
            deleteProps={{
              isLoading: deleteMutation.isLoading,
              handler: deleteHandler,
            }}
            withDescription
            descriptionTitle="Описание уязвимости"
          />
        </Box>
        <ChatbotForm disclosure={disclosure} />
      </section>
    </>
  );
}
