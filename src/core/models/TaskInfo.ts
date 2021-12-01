import { useTheme } from "@mui/material"
import { DueDateInfo, useDueDateInfo } from "./DueDateInfo"
import { Priority } from "./Priority.model"
import { TaskEntity } from "./Task.model"

export interface TaskInfo {
  dueDateInfo?: DueDateInfo
  color: string
  textDecoration?: string
  priorityText: string
}

export const useTaskInfo = (task: TaskEntity): TaskInfo => {
  const dueDateInfo = useDueDateInfo(task.dueDate)
  const theme = useTheme()

  let color = theme.palette.text.secondary
  if (task.completedBy) {
    color = theme.palette.success.light
  }
  if (task.isFailed) {
    color = theme.palette.error.light
  }

  let textDecoration = undefined
  if (task.completedBy) {
    textDecoration = "line-through"
  }

  let priorityText = ""
  if (task.priority === Priority.high) {
    priorityText = "⬆"
  } else if (task.priority === Priority.low) {
    priorityText = "⬇"
  }

  return {
    dueDateInfo,
    color,
    textDecoration,
    priorityText,
  }
}
