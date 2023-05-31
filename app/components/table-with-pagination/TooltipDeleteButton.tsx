import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"

export default function TooltipDeleteButton({ onClick } : { onClick: () => void }) {
  return (
    <Tooltip title="Удалить" onClick={onClick}>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  )
}