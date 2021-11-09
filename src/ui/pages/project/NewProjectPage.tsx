import { DatePicker, TimePicker } from "@mui/lab"
import { Button, Stack } from "@mui/material"
import { Formik } from "formik"
import { DateTime } from "luxon"
import React, { useContext, useMemo } from "react"
import {
  RecurrenceCadence,
  UpcertProject,
} from "../../../core/forms/Project.form"
import { AuthContext } from "../../AuthGate"
import { RecurrenceComponent } from "../../form_components/RecurrenceComponent"
import { RepeatCadenceSelector } from "../../form_components/RepeatCadenceSelector"
import { TaskListForm } from "../../form_components/TaskListForm"
import { TextField } from "../../form_components/TextField"

export const NewProjectPage: React.FC = () => {
  const { user } = useContext(AuthContext)

  const formSubmit = (value: UpcertProject) => {
    console.log("====== submitting", value)
  }

  const initialValues: UpcertProject = useMemo(
    () => ({
      name: "",
      recurring: RecurrenceCadence.none,
      repeatWeekly: 1,
      repeatOnWeekday: [],
      owner: user,
      tasks: [],
    }),
    [user]
  )

  return (
    <>
      <h1>New Quest</h1>
      <Formik onSubmit={formSubmit} initialValues={initialValues}>
        {({ handleSubmit, setFieldValue, values }) => {
          const changeDate = (value: DateTime | null) =>
            setFieldValue("dueDate", value)
          return (
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <TextField name="name" label="Quest Name" />
                <DatePicker
                  value={values.dueDate ?? null}
                  onChange={changeDate}
                  renderInput={(props) => (
                    <TextField
                      name="dueDate"
                      {...props}
                      label="Quest Deadline (optional)"
                    />
                  )}
                />
                <TimePicker
                  value={values.dueDate ?? null}
                  onChange={changeDate}
                  renderInput={(props) => (
                    <TextField
                      name="dueDate"
                      {...props}
                      label="Quest Deadline (optional)"
                    />
                  )}
                />
                <RepeatCadenceSelector />
              </Stack>
              <RecurrenceComponent />
              <TaskListForm />
              <Button variant="contained" onClick={() => handleSubmit()}>
                Submit
              </Button>
            </Stack>
          )
        }}
      </Formik>
    </>
  )
}
