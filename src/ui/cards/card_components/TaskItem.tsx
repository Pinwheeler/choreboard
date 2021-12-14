import { Grid, Stack, Typography } from "@mui/material"
import React from "react"
import { TaskEntity } from "../../../core/models/Task.model"
import { useTaskInfo } from "../../../core/models/TaskInfo"
import coinIcon from "../../assets/coin.png"

interface TaskProps {
  task: TaskEntity
}

export const TaskItem: React.FC<TaskProps> = (props) => {
  const { task } = props
  const taskInfo = useTaskInfo(task)

  return (
    <Grid container>
      <Grid item xs={1.2}>
        <Stack direction="row" spacing={0.25}>
          <Typography>{task.coinValue}</Typography>
          <img
            src={coinIcon}
            alt="coin icon"
            style={{ width: 20, height: 20 }}
          />
        </Stack>
      </Grid>
      <Grid
        item
        xs={10}
        style={{
          textAlign: "left",
        }}
      >
        <Typography
          style={{
            color: taskInfo.color,
            textDecorationLine: taskInfo.textDecoration,
          }}
        >
          {task.name}
        </Typography>
      </Grid>
      {!task.completedBy && (
        <Grid item xs={0.8}>
          <Typography>{taskInfo.priorityText}</Typography>
        </Grid>
      )}
      {!task.completedBy && taskInfo.dueDateInfo && (
        <Typography
          style={{ color: taskInfo.dueDateInfo.color }}
          variant="caption"
        >{`due ${taskInfo.dueDateInfo.text}`}</Typography>
      )}
    </Grid>
  )
}
