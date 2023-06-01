import { Box, Button } from "@mui/material";

export default function AddButton() {
  return (
    <Box className="success container mx-auto mb-5">
      <Button variant="contained" color="success" className="mb-5">
        Добавить
      </Button>
    </Box>
  );
}