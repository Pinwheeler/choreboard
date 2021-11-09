import {
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material"
import { useField } from "formik"
import React from "react"
import { RecurrenceCadence } from "../../core/forms/Project.form"
import { OnWeekdayRecurrence } from "./OnWeekdayRecurrenceComponent"

export const RecurrenceComponent: React.FC = () => {
  const [field, meta, helper] = useField<RecurrenceCadence>("recurring")

  console.log(field)

  switch (field.value) {
    case RecurrenceCadence.weekly:
      return <MonthlyRecurrence />
    case RecurrenceCadence.onWeekday:
      return <OnWeekdayRecurrence />
    default:
      return null
  }
}

const MonthlyRecurrence: React.FC = () => {
  const [field, meta, helper] = useField<number>("repeatWeekly")

  const onChange = (_event: any, value: number) => {
    helper.setValue(value)
  }

  return (
    <Stack direction="row">
      <Typography>Repeat every # of weeks: </Typography>
      <ToggleButtonGroup
        color="primary"
        value={field.value}
        onChange={onChange}
        exclusive
      >
        <ToggleButton value={1}>1</ToggleButton>
        <ToggleButton value={2}>2</ToggleButton>
        <ToggleButton value={3}>3</ToggleButton>
        <ToggleButton value={4}>4</ToggleButton>
        <ToggleButton value={5}>5</ToggleButton>
        <ToggleButton value={6}>6</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  )
}
