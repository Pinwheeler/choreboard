import { useTheme } from "@mui/material"
import { DueDateInfo, useDueDateInfo } from "./DueDateInfo"
import { TaskEntity } from "./Task.model"

export interface TaskInfo {
  dueDateInfo?: DueDateInfo
  color: string
  textDecoration?: string
}

export const useTaskInfo = (task: TaskEntity): TaskInfo => {
  const dueDateInfo = useDueDateInfo(task.dueDate)
  const theme = useTheme()

  let color = theme.palette.text.secondary
  if (task.complete) {
    color = theme.palette.success.light
  }
  if (task.isFailed) {
    color = theme.palette.error.light
  }

  let textDecoration = undefined
  if (task.complete) {
    textDecoration = "line-through"
  }

  return {
    dueDateInfo,
    color,
    textDecoration,
  }
}
