import { DatePicker, TimePicker } from "@mui/lab"
import { Button, Stack } from "@mui/material"
import { useField } from "formik"
import { DateTime } from "luxon"
import React from "react"
import { emptyUpcertTask, UpcertTask } from "../../core/forms/Task.form"
import { Priority } from "../../core/models/Priority"
import { PriorityComponent } from "./PriorityComponent"
import { TextField } from "./TextField"

export const TaskListForm: React.FC = () => {
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

  return (
    <Stack direction="row" spacing={1}>
      <TextField name={`tasks[${index}].name`} label="Task Name" />
      <DatePicker
        onChange={onDateChange}
        value={dateField.value ?? null}
        renderInput={(props) => (
          <TextField
            name={`tasks[${index}].dueDateDate`}
            {...props}
            label="Task Deadline (optional)"
          />
        )}
      />
      <TimePicker
        value={dateField.value ?? null}
        onChange={onDateChange}
        renderInput={(props) => (
          <TextField
            name={`tasks[${index}].dueDateTime`}
            {...props}
            label="Task Deadline (optional)"
          />
        )}
      />
      <PriorityComponent index={index} />
      <Button onClick={onDelete}>Delete</Button>
    </Stack>
  )
}
