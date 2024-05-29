'use client';

import { Box, Button, FormControl, Modal, TextField, Typography } from '@mui/material';
import { SingleHardware } from '@api/hardware/[[...id]]/route';
import Select from 'react-select';
import { getLocations } from '../manage-locations/lib/getLocations';
import { useQueryOptions } from '@lib/useQueryOptions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { locations } from '@prisma/client';
import { getHardware } from '@/app/admin/manage-hardware/lib/getHardware';

import { useRef, useState } from 'react';
import { UpdateHardwareData } from '@/app/api/hardware/[[...id]]/route';
import { updateHardware } from './lib/updateHardware';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Options {
  label: string;
  value: number;
}

interface Props {
  open: boolean;
  hardware?: SingleHardware;
  handleOpen: () => void;
  handleClose: () => void;
}

export default function EditModalHardware({ open, hardware, handleOpen, handleClose }: Props) {
  const queryClient = useQueryClient();

  const [name, setName] = useState(hardware.name);
  const [desc, setDesc] = useState(hardware.long_text_description);
  const [locations, setLocations] = useState<readonly Options[]>([]);

  const id = hardware.id;

  const getDataToUpdate = () => {
    const dataToUpdate: UpdateHardwareData = {
      name,
      long_text_description: desc,
      hardware_location: {
        upsert: locations.map((location, index) => ({
          where: {
            location_id_hardware_id: {
              hardware_id: id,
              location_id: hardware.hardware_location[index].location_id,
            },
          },
          update: {
            location_id: location.value,
          },
          create: {
            location_id: location.value,
          },
        })),
      },
    };

    return dataToUpdate;
  };

  const updateMutation = useMutation((data: UpdateHardwareData) => updateHardware(id, data), {
    onSuccess: async () => {
      await queryClient.prefetchQuery(['hardware'], getHardware);
    },
    onError: () => {
      updateMutation.isError = true;
    },
  });

  const locationQuery = useQuery(['location'], getLocations, useQueryOptions);

  const getLocationsLabels = (data: locations[]) => {
    return data.map((location) => {
      return {
        value: location.id,
        label: location.name,
      };
    });
  };

  const handleSubmit = () => {
    updateMutation.mutate(getDataToUpdate());
  };

  if (updateMutation.isLoading) return <></>;
  if (updateMutation.isError) return <></>;

  if (locationQuery.isLoading) return <></>;
  if (locationQuery.isError) return <></>;

  if (!hardware) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Оборудование не найдено
          </Typography>
        </Box>
      </Modal>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2}>
          Редактирование оборудования
        </Typography>
        <FormControl className="flex flex-col gap-10 w-full">
          <TextField label="Идентификатор" variant="standard" defaultValue={hardware.id} />
          <TextField
            label="Наименование"
            variant="standard"
            defaultValue={hardware.name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Select
            noOptionsMessage={() => 'Не найдено'
            placeholder="Выберите местоположения"
            isMulti
            options={getLocationsLabels(locationQuery.data)}
            defaultValue={getLocationsLabels(locationQuery.data).filter((option) =>
              hardware.hardware_location.some((hl) => hl.location_id === option.value),
            )}
            onChange={(options) => {
              setLocations(
                hardware.hardware_location.map((hl, index) => ({
                  value: options[index]?.value,
                  label: '',
                })),
              );
            }}
          />

          <TextField
            multiline
            maxRows={50}
            label="Описание"
            variant="standard"
            defaultValue={hardware.long_text_description}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          />
          <Button
            onClick={() => {
              handleSubmit();
            }}
          >
            Отправить
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
}
