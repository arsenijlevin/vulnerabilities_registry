"use client"

import { Box, Button, FormControl, Modal, TextField, Typography } from "@mui/material";
import { SingleHardware } from "../../api/hardware/get/route";
import Select from 'react-select';
import { getLocations } from "../manage-locations/lib/getLocations";
import { useQueryOptions } from "../../../lib/useQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { locations } from "@prisma/client";

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

// interface Options {
//   label: string,
//   value: number
// }

interface Props {
  open: boolean,
  hardware: SingleHardware | null,
  handleOpen: () => void,
  handleClose: () => void
}

export default function EditModalHardware({
  open,
  hardware,
  handleOpen,
  handleClose
}: Props) {
  // const queryClient = useQueryClient();
  // const refId = useRef<HTMLInputElement>(null);
  // const refName = useRef<HTMLInputElement>(null);
  // const refDescription = useRef<HTMLInputElement>(null);
  // const [locations, setLocations] = useState<readonly Options[]>([])

  // const id: number = parseInt(refId.current?.value ?? "");
  // const getDataToUpdate = () => {
  //   const dataToUpdate: UpdateHardwareData = {
  //     id: parseInt(refId.current?.value || "-1"),
  //     name: refName.current?.value ?? "",
  //     long_text_description: refDescription.current?.value ?? "",
  //     hardware_location: {
  //       connectOrCreate: locations.map(location => {
  //         return {
  //           location_id_hardware_id: {
  //             location_id: location.value,
  //             hardware_id: id
  //           }
  //         }
  //       })
  //     }
  //   }

  //   return dataToUpdate;
  // }

  // console.log(refId.current)

  // const updateMutation = useMutation(
  //   (data: UpdateHardwareData) => updateHardware(data),
  //   {
  //     onSuccess: async () => {
  //       queryClient.prefetchQuery(['hardware'], getHardware);
  //     },
  //     onError: async () => {
  //       updateMutation.isError = true;
  //     }
  //   }
  // );


  const locationQuery = useQuery(
    ["location"],
    getLocations,
    useQueryOptions
  );

  const getLocationsLabels = (data: locations[]) => {
    return data.map(location => {
      return {
        value: location.id,
        label: location.name
      }
    },)
  }

  // const handleSubmit = () => {
  //   updateMutation.mutate(getDataToUpdate());
  // }

  // if (updateMutation.isLoading) return <></>;
  // if (updateMutation.isError) return <></>;

  if (locationQuery.isLoading) return <></>;
  if (locationQuery.isError || !locationQuery.data) return <></>;


  if (hardware == null) {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Оборудование не найдено
          </Typography>
        </Box>
      </Modal>
    )
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" marginBottom={2}>
          Редактирование оборудования
        </Typography>
        <FormControl className="flex flex-col gap-10 w-full">
          <TextField label="Идентификатор" variant="standard" defaultValue={hardware.id} />
          <TextField label="Наименование" variant="standard" defaultValue={hardware.name} />
          <Select noOptionsMessage={() => 'Не найдено'} placeholder="Выберите местоположения" isMulti options={getLocationsLabels(locationQuery.data)} />

          <TextField multiline maxRows={50} label="Описание" variant="standard" defaultValue={hardware.long_text_description} />
          <Button>Отправить</Button>
        </FormControl>
      </Box>
    </Modal>
  )
}