import { ArrowBack } from "@mui/icons-material"
import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material"
import React, { useContext, useMemo } from "react"
import { useHistory } from "react-router"
import { QuestContext } from "../../../core/contexts/QuestContext"
import { useDueDateInfo } from "../../../core/models/DueDateInfo"
import { TaskEntity } from "../../../core/models/Task.model"

export const ViewQuestPage = () => {
  const { quest } = useContext(QuestContext)
  const dueDateInfo = useDueDateInfo(quest.dueDate)

  const sortedTasks = quest.sortedTasks
  const history = useHistory()

  return (
    <Stack spacing={2}>
      <Stack>
        <Stack direction="row" spacing={2}>
          <IconButton aria-label="back" onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h3">{quest.name}</Typography>
        </Stack>
        {dueDateInfo && <Typography>Due in {dueDateInfo.text}</Typography>}
      </Stack>
      <Stack>
        {sortedTasks.activeTasks.length > 0 && (
          <>
            <Typography variant="h4">Remaining Tasks:</Typography>
            {sortedTasks.activeTasks.map((t) => (
              <TaskLine key={`task_line_${t.name}`} task={t} />
            ))}
          </>
        )}
      </Stack>
      <Stack>
        {sortedTasks.completedTasks.length > 0 && (
          <>
            <Typography variant="h4">Completed Tasks:</Typography>
            {sortedTasks.completedTasks.map((t) => (
              <TaskLine key={`task_line_${t.name}`} task={t} />
            ))}
          </>
        )}
      </Stack>
      <Stack>
        {sortedTasks.failedTasks.length > 0 && (
          <>
            <Typography variant="h4">Failed Tasks:</Typography>
            {sortedTasks.failedTasks.map((t) => (
              <TaskLine key={`task_line_${t.name}`} task={t} />
            ))}
          </>
        )}
      </Stack>
    </Stack>
  )
}

interface Props {
  task: TaskEntity
}

const TaskLine: React.FC<Props> = (props) => {
  const { completeTask } = useContext(QuestContext)
  const { task } = props
  const theme = useTheme()
  const color = useMemo(() => {
    if (task.complete) {
      return theme.palette.success.light
    } else if (task.isFailed) {
      return theme.palette.error.light
    }
  }, [
    task.complete,
    task.isFailed,
    theme.palette.error.light,
    theme.palette.success.light,
  ])
  return (
    <Stack direction="row" spacing={2}>
      <Typography
        variant="h5"
        color={color}
        style={{
          textDecoration:
            task.complete || task.isFailed ? "line-through" : undefined,
        }}
      >
        {task.name}
      </Typography>
      {task.isActive && (
        <Button
          variant="contained"
          color="success"
          onClick={() => completeTask(task)}
        >
          Complete
        </Button>
      )}
    </Stack>
  )
}
