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
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Monday)) {
      repeatText += " M"
    }
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Tuesday)) {
      repeatText += " Tu"
    }
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Wednesday)) {
      repeatText += " W"
    }
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Thursday)) {
      repeatText += " Th"
    }
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Friday)) {
      repeatText += " F"
    }
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Saturday)) {
      repeatText += " Sa"
    }
    if (quest.repeatOnWeekday.find((d) => d === Weekday.Sunday)) {
      repeatText += " Su"
    }
  } else if (quest.recurring === "weekly") {
    repeatText = `repeats every ${quest.repeatWeekly} weeks`
  }

  const duePrefix = quest.recurring === "none" ? "due" : "resets"

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
              {(!quest.isComplete || quest.syntheticTo) &&
                dueDateInfo?.text && (
                  <Typography variant="body1">{`${duePrefix} ${dueDateInfo.text}`}</Typography>
                )}
            </Stack>
          </div>
          <Divider style={{ marginBottom: 5 }} />
          <Stack spacing={0.3}>
            {quest.tasks.map((t) => (
              <TaskItem key={`quest_${quest.id}_task_${t.name}`} task={t} />
            ))}
          </Stack>
        </CardContent>
      </ButtonBase>
    </Card>
  )
}
