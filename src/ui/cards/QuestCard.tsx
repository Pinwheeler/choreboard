import {
  ButtonBase,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import React, { useContext } from "react"
import { useHistory } from "react-router"
import { GuildContext } from "../../core/contexts/GuildContext"
import { useDueDateInfo } from "../../core/models/DueDateInfo"
import { QuestEntity } from "../../core/models/Quest.model"
import { TaskEntity } from "../../core/models/Task.model"

interface Props {
  quest: QuestEntity
}

export const QuestCard: React.FC<Props> = (props) => {
  const { quest } = props
  const { guildId } = useContext(GuildContext)
  const dueDateInfo = useDueDateInfo(quest.dueDate)
  const history = useHistory()

  return (
    <Card>
      <ButtonBase
        onClick={() => {
          history.push(`/guilds/${guildId}/quests/${quest.id}`)
        }}
      >
        <CardContent>
          <Typography variant="h5">{quest.name}</Typography>
          {dueDateInfo?.text && (
            <Typography variant="body1">{`due ${dueDateInfo.text}`}</Typography>
          )}
          <Divider />
          <Stack spacing={1}>
            {quest.tasks.map((t) => (
              <TaskItem key={`quest_${quest.id}_task_${t.name}`} task={t} />
            ))}
          </Stack>
        </CardContent>
      </ButtonBase>
    </Card>
  )
}

interface TaskProps {
  task: TaskEntity
}

const TaskItem: React.FC<TaskProps> = (props) => {
  const { task } = props
  const theme = useTheme()
  const dueDateInfo = useDueDateInfo(task.dueDate)
  const color = task.complete ? theme.palette.grey[400] : "blue"

  return (
    <Stack>
      <Typography
        style={{
          color: color,
          textDecorationLine: task.complete ? "line-through" : undefined,
        }}
      >
        {task.name}
      </Typography>
      {!task.complete && dueDateInfo && (
        <Typography
          style={{ color: dueDateInfo.color }}
          variant="caption"
        >{`due ${dueDateInfo.text}`}</Typography>
      )}
    </Stack>
  )
}
