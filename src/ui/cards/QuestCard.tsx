import LoopIcon from "@mui/icons-material/Loop"
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
import { Weekday } from "../../core/forms/Quest.form"
import { useDueDateInfo } from "../../core/models/DueDateInfo"
import { QuestEntity } from "../../core/models/Quest.model"
import { TaskItem } from "./card_components/TaskItem"

interface Props {
  quest: QuestEntity
}

export const QuestCard: React.FC<Props> = (props) => {
  const { quest } = props
  const { guildId } = useContext(GuildContext)
  const dueDateInfo = useDueDateInfo(quest.dueDate)
  const history = useHistory()
  let repeatText: string = ""

  if (quest.recurring === "onWeekday") {
    quest.repeatOnWeekday.forEach((weekday) => {
      switch (weekday) {
        case Weekday.Monday:
          repeatText += " M"
          break
        case Weekday.Tuesday:
          repeatText += " Tu"
          break
        case Weekday.Wednesday:
          repeatText += " W"
          break
        case Weekday.Thursday:
          repeatText += " Th"
          break
        case Weekday.Friday:
          repeatText += " F"
          break
        case Weekday.Saturday:
          repeatText += " Sa"
          break
        case Weekday.Sunday:
          repeatText += " Su"
          break
      }
    })
  } else if (quest.recurring === "weekly") {
    repeatText = `repeats every ${quest.repeatWeekly} weeks`
  }

  return (
    <Card style={{ height: "100%", width: "100%" }}>
      <ButtonBase
        style={{ height: "100%", width: "100%" }}
        onClick={() => {
          history.push(`/guilds/${guildId}/quests/${quest.id}`)
        }}
      >
        <CardContent
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ height: 65 }}>
            <Typography variant="h5">{quest.name}</Typography>
            <Stack direction="row" style={{ justifyContent: "space-between" }}>
              {quest.recurring !== "none" && (
                <Stack direction="row" spacing={1}>
                  <LoopIcon />
                  <Typography variant="body1">{repeatText}</Typography>
                </Stack>
              )}
              {!quest.isComplete && dueDateInfo?.text && (
                <Typography variant="body1">{`due ${dueDateInfo.text}`}</Typography>
              )}
            </Stack>
          </div>
          <Divider style={{ marginBottom: 5 }} />
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
