import { DatePicker, TimePicker } from "@mui/lab"
import { Button, Grid, Stack, Typography, useTheme } from "@mui/material"
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

  const theme = useTheme()

  return (
    <Stack spacing={2}>
      <Typography variant="h2">New Quest</Typography>
      <Typography variant="caption">
        Items marked with asterisk* are optional
      </Typography>
      <Formik onSubmit={formSubmit} initialValues={initialValues}>
        {({ handleSubmit, setFieldValue, values }) => {
          const changeDate = (value: DateTime | null) =>
            setFieldValue("dueDate", value)
          return (
            <>
              <div
                style={{
                  padding: 15,
                  marginTop: 0,
                  backgroundColor: theme.palette.grey[300],
                  borderRadius: 5,
                }}
              >
                <Grid container direction="row" spacing={2}>
                  <Grid item xs={12} sm={12} md={3}>
                    <TextField
                      style={{ width: "100%" }}
                      name="name"
                      label="Quest Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <DatePicker
                      value={values.dueDate ?? null}
                      onChange={changeDate}
                      renderInput={(props) => (
                        <TextField
                          style={{ width: "100%" }}
                          name="dueDate"
                          {...props}
                          label="Deadline*"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={2}>
                    <TimePicker
                      value={values.dueDate ?? null}
                      onChange={changeDate}
                      renderInput={(props) => (
                        <TextField
                          style={{ width: "100%" }}
                          name="dueDate"
                          {...props}
                          label="Deadline*"
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={5}>
                    <RepeatCadenceSelector />
                  </Grid>
                </Grid>
                <Grid container>
                  <RecurrenceComponent />
                </Grid>
              </div>
              <TaskListForm />
              <Grid item xs={12} sm={12}>
                <Button
                  style={{ width: "100%" }}
                  variant="contained"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </Button>
              </Grid>
            </>
          )
        }}
      </Formik>
    </Stack>
  )
}
