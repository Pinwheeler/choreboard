import { Button, Stack, Typography } from "@mui/material"
import React, { useContext } from "react"
import { QuestContext } from "../../../core/contexts/QuestContext"
import { useDueDateInfo } from "../../../core/models/DueDateInfo"
import { TaskEntity } from "../../../core/models/Task.model"

export const ViewQuestPage = () => {
  const { quest } = useContext(QuestContext)
  const dueDateInfo = useDueDateInfo(quest.dueDate)

  return (
    <Stack spacing={2}>
      <Stack>
        <Stack direction="row" spacing={2}>
          <Typography variant="h3">{quest.name}</Typography>
        </Stack>
        {dueDateInfo && <Typography>Due in {dueDateInfo.text}</Typography>}
      </Stack>
      <Stack>
        <Typography variant="h4">Remaining Tasks:</Typography>
        {quest.tasks.map((t) => (
          <TaskLine key={`task_line_${t.name}`} task={t} />
        ))}
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
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="h5">{task.name}</Typography>
      <Button
        variant="contained"
        color="success"
        onClick={() => completeTask(task)}
      >
        Complete
      </Button>
    </Stack>
  )
}
