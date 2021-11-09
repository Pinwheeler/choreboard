import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import { useField } from "formik"
import React from "react"
import { RecurrenceCadence } from "../../core/forms/Project.form"

export const RepeatCadenceSelector: React.FC = () => {
  const [field, meta, helper] = useField<RecurrenceCadence>("recurring")

  const onChange = (_event: any, value: RecurrenceCadence) => {
    helper.setValue(value)
  }

  return (
    <ToggleButtonGroup
      color="primary"
      value={field.value}
      onChange={onChange}
      exclusive
    >
      <ToggleButton value={RecurrenceCadence.none}>None</ToggleButton>
      <ToggleButton value={RecurrenceCadence.weekly}>Weekly</ToggleButton>
      <ToggleButton value={RecurrenceCadence.onWeekday}>
        On Weekday
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
