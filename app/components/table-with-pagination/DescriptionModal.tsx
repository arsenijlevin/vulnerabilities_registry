"use client";

import { Box, Modal, Typography } from "@mui/material";

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

interface Props {
  text: string,
  open: boolean,
  handleOpen: () => void,
  handleClose: () => void
}

export default function DescriptionModal({ text, open, handleOpen, handleClose }: Props) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Описание уязвимости
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="whitespace-pre-line">
          {text}
        </Typography>
      </Box>
    </Modal>
  )
}