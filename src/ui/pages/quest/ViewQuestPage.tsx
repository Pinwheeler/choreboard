import { ArrowBack } from "@mui/icons-material"
import { Button, IconButton, Stack, Typography, useTheme } from "@mui/material"
import React, { useContext, useMemo, useState } from "react"
import { useHistory } from "react-router"
import { ApiContext } from "../../../core/contexts/ApiContext"
import { GuildContext } from "../../../core/contexts/GuildContext"
import { QuestContext } from "../../../core/contexts/QuestContext"
import { useDueDateInfo } from "../../../core/models/DueDateInfo"
import { TaskEntity } from "../../../core/models/Task.model"
import { LoadingSpinner } from "../../LoadingSpinner"

export const ViewQuestPage = () => {
  const { quest, questId } = useContext(QuestContext)
  const { deleteQuest } = useContext(ApiContext)
  const { guildId } = useContext(GuildContext)
  const dueDateInfo = useDueDateInfo(quest.dueDate)
  const [deleting, setDeleting] = useState(false)

  const sortedTasks = quest.sortedTasks
  const history = useHistory()

  const onDelete = () => {
    setDeleting(true)
    deleteQuest(guildId, quest.recurring, questId).then(() => {
      history.push(`/guilds/${guildId}`)
    })
  }

  if (deleting) {
    return (
      <Stack>
        <LoadingSpinner whatIsLoading="Deletion of Quest" />
        <Typography>Deleting...</Typography>
      </Stack>
    )
  }

  return (
    <Stack spacing={2}>
      <Stack>
        <Stack direction="row" spacing={2}>
          <IconButton aria-label="back" onClick={() => history.goBack()}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h3">{quest.name}</Typography>
          <Button
            variant="contained"
            color="warning"
            href={`/guilds/${guildId}/quests/${questId}/update`}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={onDelete}>
            Delete
          </Button>
        </Stack>
        {dueDateInfo && <Typography>Due in {dueDateInfo.text}</Typography>}
      </Stack>
      <Stack spacing={1}>
        {sortedTasks.activeTasks.length > 0 && (
          <>
            <Typography variant="h4">Remaining Tasks:</Typography>
            {sortedTasks.activeTasks.map((t) => (
              <TaskLine key={`task_line_${t.name}`} task={t} />
            ))}
          </>
        )}
      </Stack>
      <Stack spacing={1}>
        {sortedTasks.completedTasks.length > 0 && (
          <>
            <Typography variant="h4">Completed Tasks:</Typography>
            {sortedTasks.completedTasks.map((t) => (
              <TaskLine key={`task_line_${t.name}`} task={t} />
            ))}
          </>
        )}
      </Stack>
      <Stack spacing={1}>
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
      {task.complete && (
        <Button variant="contained" color="error">
          Un-Complete
        </Button>
      )}
    </Stack>
  )
}
