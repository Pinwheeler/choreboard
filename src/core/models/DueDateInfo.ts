import { useTheme } from "@mui/material"
import { DateTime } from "luxon"

export interface DueDateInfo {
  text: string
  color: string
}

export const useDueDateInfo = (date?: DateTime): DueDateInfo | undefined => {
  const theme = useTheme()
  if (!date) {
    return undefined
  }

  const dueIn = date.diffNow()
  const days = dueIn.as("days")
  let color = theme.palette.grey[400]

  if (days < 1) {
    color = theme.palette.error.main
  } else if (days < 2) {
    color = theme.palette.warning.main
  }

  return {
    text: date.toRelative() ?? "error parsing due date",
    color,
  }
}
