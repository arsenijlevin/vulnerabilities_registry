import { IconButton, Tooltip } from "@mui/material";
import BorderColorIcon from '@mui/icons-material/BorderColor';

export default function TooltipModifyButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip title="Изменить" onClick={onClick}>
      <IconButton>
        <BorderColorIcon />
      </IconButton>
    </Tooltip>
  )
}