import { IconButton, Tooltip } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description';

export default function TooltipShowDescriptionButton({ onClick } : { onClick: () => void }) {
  return (
    <Tooltip title="Описание" onClick={onClick}>
      <IconButton>
        <DescriptionIcon />
      </IconButton>
    </Tooltip>
  )
}