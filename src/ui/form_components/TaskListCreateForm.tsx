import { DatePicker, TimePicker } from "@mui/lab"
import { Button, Grid, useTheme } from "@mui/material"
import { useField } from "formik"
import { DateTime } from "luxon"
import React from "react"
import { RecurrenceCadence } from "../../core/forms/Quest.form"
import { emptyUpcertTask, UpcertTask } from "../../core/forms/Task.form"
import { Priority } from "../../core/models/Priority.model"
import { ChallengeComponent } from "./ChallengeComponent"
import { PriorityComponent } from "./PriorityComponent"
import { TextField } from "./TextField"

export const TaskListCreateForm: React.FC = () => {
  const [tasks, _meta, helper] = useField<UpcertTask[]>("tasks")

  if (tasks.value.length === 0) {
    helper.setValue([emptyUpcertTask()])
    return null
  }

  const lastEntry = tasks.value[tasks.value.length - 1]
  const lastEntryEmpty =
    lastEntry.name === "" &&
    lastEntry.dueDate === undefined &&
    lastEntry.priority === Priority.normal
  if (!lastEntryEmpty) {
    helper.setValue([...tasks.value, emptyUpcertTask()])
  }

  return (
    <>
      {tasks.value.map((task, idx) => (
        <TaskItemForm index={idx} key={`task_item_form_${idx}`} />
      ))}
    </>
  )
}

interface Props {
  index: number
}

const TaskItemForm: React.FC<Props> = (props) => {
  const { index } = props
  const [tasksField, _tasksMeta, tasksHelper] = useField<UpcertTask[]>("tasks")
  const [recurringField] = useField<RecurrenceCadence>("recurring")
  const [dateField, _meta, helpers] = useField<DateTime | undefined>(
    `tasks[${index}].dueDate`
  )

  const onDateChange = (value: DateTime | null) => {
    helpers.setValue(value ?? undefined)
  }

  const onDelete = () => {
    const updatedList = [...tasksField.value]
    updatedList.splice(index, 1)
    tasksHelper.setValue(updatedList)
  }

  const theme = useTheme()

  return (
    <Grid
      container
      direction="row"
      spacing={2}
      style={{
        padding: 10,
        marginBottom: 10,
        width: "100%",
        backgroundColor: theme.palette.grey.A700,
        borderRadius: 5,
      }}
    >
      <Grid item xs={12} sm={12} md={1}>
        {`Task #${index + 1}`}
      </Grid>
      <Grid item xs={12} sm={12} md={3}>
        <TextField
          style={{ width: "100%" }}
          name={`tasks[${index}].name`}
          label="Task Name"
          defaultValue={tasksField.value[index].name}
        />
      </Grid>
      {recurringField.value === "none" && (
        <Grid item xs={12} sm={12} md={2}>
          <DatePicker
            onChange={onDateChange}
            value={dateField.value ?? null}
            renderInput={(props) => (
              <TextField
                style={{ width: "100%" }}
                name={`tasks[${index}].dueDateDate`}
                {...props}
                label="Deadline*"
                defaultValue={tasksField.value[index].dueDate}
              />
            )}
          />
        </Grid>
      )}
      {recurringField.value === "none" && (
        <Grid item xs={12} sm={12} md={2}>
          <TimePicker
            value={dateField.value ?? null}
            onChange={onDateChange}
            renderInput={(props) => (
              <TextField
                style={{ width: "100%" }}
                name={`tasks[${index}].dueDateTime`}
                {...props}
                label="Deadline*"
                defaultValue={tasksField.value[index].dueDate}
              />
            )}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={12} md={1.5}>
        <PriorityComponent index={index} />
      </Grid>
      <Grid item xs={12} sm={12} md={1.5}>
        <ChallengeComponent index={index} />
      </Grid>
      <Grid item xs={12} sm={12} md={1}>
        <Button
          color="error"
          variant="contained"
          style={{ width: "100%" }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </Grid>
    </Grid>
  )
}
