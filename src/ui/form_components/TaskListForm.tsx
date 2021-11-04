import { DatePicker, TimePicker } from "@mui/lab";
import { Stack } from "@mui/material";
import { useField } from "formik";
import { DateTime } from "luxon";
import React from "react";
import { emptyUpcertTask, UpcertTask } from "../../core/forms/Task.form";
import { Priority } from "../../core/models/Priority";
import { TextField } from "./TextField";

export const TaskListForm: React.FC = () => {
  const [tasks, meta, helper] = useField<UpcertTask[]>("tasks");

  if (tasks.value.length === 0) {
    helper.setValue([emptyUpcertTask()]);
    return null;
  }

  const lastEntry = tasks.value[tasks.value.length - 1];
  const lastEntryEmpty =
    lastEntry.name === "" &&
    lastEntry.dueDate === undefined &&
    lastEntry.priority === Priority.normal;
  if (!lastEntryEmpty) {
    helper.setValue([...tasks.value, emptyUpcertTask()]);
  }

  return (
    <>
      {tasks.value.map((task, idx) => (
        <TaskItemForm index={idx} key={`task_item_form_${idx}`} />
      ))}
    </>
  );
};

interface Props {
  index: number;
}

const TaskItemForm: React.FC<Props> = (props) => {
  const { index } = props;
  const [dateField, meta, helpers] = useField<DateTime | undefined>(
    `tasks[${index}].dueDate`
  );

  const onDateChange = (value: DateTime | null) => {
    console.log("onDateChange", value);
    helpers.setValue(value ?? undefined);
  };

  return (
    <Stack direction="row">
      <TextField name={`tasks[${index}].name`} label="Task Name" />
      <DatePicker
        onChange={onDateChange}
        value={dateField.value ?? null}
        renderInput={(props) => (
          <TextField name={`tasks[${index}].dueDateDate`} {...props} />
        )}
      />
      <TimePicker
        value={dateField.value ?? null}
        onChange={onDateChange}
        renderInput={(props) => (
          <TextField name={`tasks[${index}].dueDateTime`} {...props} />
        )}
      />
    </Stack>
  );
};
