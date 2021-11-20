import {
  ButtonBase,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material"
import React, { useContext } from "react"
import { useHistory } from "react-router"
import { GuildContext } from "../../core/contexts/GuildContext"
import { useDueDateInfo } from "../../core/models/DueDateInfo"
import { QuestEntity } from "../../core/models/Quest.model"
import { TaskEntity } from "../../core/models/Task.model"
import { useTaskInfo } from "../../core/models/TaskInfo"

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
  const taskInfo = useTaskInfo(task)

  return (
    <Stack>
      <Typography
        style={{
          color: taskInfo.color,
          textDecorationLine: taskInfo.textDecoration,
        }}
      >
        {task.name}
      </Typography>
      {!task.complete && taskInfo.dueDateInfo && (
        <Typography
          style={{ color: taskInfo.dueDateInfo.color }}
          variant="caption"
        >{`due ${taskInfo.dueDateInfo.text}`}</Typography>
      )}
    </Stack>
  )
}
