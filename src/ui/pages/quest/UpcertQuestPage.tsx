import { ArrowBack } from "@mui/icons-material"
import { DatePicker, TimePicker } from "@mui/lab"
import {
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { Formik } from "formik"
import { DateTime } from "luxon"
import React, { useContext, useMemo, useState } from "react"
import { Redirect, useHistory, useParams } from "react-router"
import { ApiContext } from "../../../core/contexts/ApiContext"
import { QuestContext } from "../../../core/contexts/QuestContext"
import { UpcertQuest } from "../../../core/forms/Quest.form"
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
  const { questSyntheticToCurrentQuest } = useContext(QuestContext)
  const { guildId } = useParams<{ guildId?: string }>()
  const history = useHistory()
  const [updateSuccessful, setUpdateSuccessful] = useState(false)

  const formSubmit = (value: UpcertQuest) => {
    if (guildId) {
      console.log("====== submitting", value)
      upcertQuest(value, guildId)
        .then((v) => {
          console.log("+++++ success!", v)
          // also update any synthetic requests
          if (questSyntheticToCurrentQuest) {
            const syntheticUpdate: UpcertQuest = {
              ...value,
              dueDate: questSyntheticToCurrentQuest.dueDate,
              synthetic: true,
            }
            upcertQuest(syntheticUpdate, guildId).then((v) => {
              console.log("s+s+s+s+ synthetic success!", v)
              setUpdateSuccessful(true)
            })
          } else {
            setUpdateSuccessful(true)
          }
        })
        .catch((error) => {
          console.log("-----", error)
        })
    }
  }

  const initialValues: UpcertQuest = useMemo(
    () => ({
      id: quest?.id,
      name: quest?.name ?? "",
      guild: quest?.guild ?? `guilds/${guildId}`,
      recurring: quest?.recurring ?? "none",
      createdAt: DateTime.now(),
      dueDate: quest?.dueDate,
      repeatWeekly: quest?.repeatWeekly ?? 1,
      repeatOnWeekday: quest?.repeatOnWeekday ?? [],
      ownerId: quest?.ownerId ?? user.uid,
      tasks: quest?.tasks ?? [],
      synthetic: !!quest?.syntheticTo,
    }),
    [
      guildId,
      quest?.dueDate,
      quest?.guild,
      quest?.id,
      quest?.name,
      quest?.ownerId,
      quest?.recurring,
      quest?.repeatOnWeekday,
      quest?.repeatWeekly,
      quest?.syntheticTo,
      quest?.tasks,
      user.uid,
    ]
  )

  const theme = useTheme()

  const headlineText = quest ? `Editing: ${quest.name}` : "New Quest"

  if (updateSuccessful) {
    return <Redirect to={`/guilds/${guildId}`} />
  }

  return (
    <Stack spacing={2}>
      <Stack direction="row">
        <IconButton aria-label="Back" onClick={() => history.goBack()}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h2">{headlineText}</Typography>
      </Stack>
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
                  backgroundColor: theme.palette.grey[800],
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

                  <Grid item xs={12} sm={12} md={5}>
                    <RepeatCadenceSelector />
                  </Grid>
                  {values.recurring === "none" && (
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
                            defaultValue={quest?.dueDate}
                          />
                        )}
                      />
                    </Grid>
                  )}
                  {values.recurring === "none" && (
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
                            defaultValue={quest?.dueDate}
                          />
                        )}
                      />
                    </Grid>
                  )}
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
