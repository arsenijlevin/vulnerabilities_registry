'use client';

import { Box, Modal, Typography } from '@mui/material';

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

export interface TableDataDescriptionModalProps {
  title: string;
  text: string;
  open: boolean;
  handleClose: () => void;
}

export function TableDataDescriptionModal(props: TableDataDescriptionModalProps) {
  const { title, text, open, handleClose } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }} className="whitespace-pre-line">
          {text}
        </Typography>
      </Box>
    </Modal>
  );
}
