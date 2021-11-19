import { DatePicker, TimePicker } from "@mui/lab"
import { Button, Grid, Stack, Typography, useTheme } from "@mui/material"
import { Formik } from "formik"
import { DateTime } from "luxon"
import React, { useContext, useMemo } from "react"
import { useParams } from "react-router"
import * as yup from "yup"
import { ApiContext } from "../../../core/contexts/ApiContext"
import { RecurrenceCadence, UpcertQuest } from "../../../core/forms/Quest.form"
import { QuestEntity } from "../../../core/models/Quest.model"
import { AuthContext } from "../../AuthGate"
import { RecurrenceComponent } from "../../form_components/RecurrenceComponent"
import { RepeatCadenceSelector } from "../../form_components/RepeatCadenceSelector"
import { TaskListCreateForm } from "../../form_components/TaskListCreateForm"
import { TextField } from "../../form_components/TextField"

interface Props {
  quest?: QuestEntity
}

export const UpcertQuestPage: React.FC<Props> = (props) => {
  const { quest } = props
  const { user } = useContext(AuthContext)
  const { upcertQuest } = useContext(ApiContext)
  const { guildId } = useParams<{ guildId?: string }>()

  const formSubmit = (value: UpcertQuest) => {
    if (guildId) {
      console.log("====== submitting", value)
      upcertQuest(value, guildId)
        .then((value) => {
          console.log("+++++ success!", value)
        })
        .catch((error) => {
          console.log("-----", error)
        })
    }
  }

  const initialValues: UpcertQuest = useMemo(
    () => ({
      name: quest?.name ?? "",
      guild: quest?.guild ?? `guilds/${guildId}`,
      recurring: quest?.recurring ?? RecurrenceCadence.none,
      repeatWeekly: quest?.repeatWeekly ?? 1,
      repeatOnWeekday: quest?.repeatOnWeekday ?? [],
      ownerId: quest?.ownerId ?? user.uid,
      tasks: quest?.tasks ?? [],
    }),
    [
      guildId,
      quest?.guild,
      quest?.name,
      quest?.ownerId,
      quest?.recurring,
      quest?.repeatOnWeekday,
      quest?.repeatWeekly,
      quest?.tasks,
      user.uid,
    ]
  )

  const theme = useTheme()

  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    dueDate: yup.string(),
    recurring: yup.string().matches(/none|weekly|onWeekday/),
    repeatWeekly: yup.number(),
    repeatOnWeekday: yup.array(),
    owner: yup.object({}),
    tasks: yup.array().of(
      yup.object({
        name: yup.string().required(),
        dueDate: yup.string(),
        priority: yup.number(),
      })
    ),
  })

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
              <TaskListCreateForm />
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