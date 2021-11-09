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
      style={{ width: "100%", height: "100%" }}
    >
      <ToggleButton style={{ width: "100%" }} value={RecurrenceCadence.none}>
        None
      </ToggleButton>
      <ToggleButton style={{ width: "100%" }} value={RecurrenceCadence.weekly}>
        Weekly
      </ToggleButton>
      <ToggleButton
        style={{ width: "100%" }}
        value={RecurrenceCadence.onWeekday}
      >
        On Weekday
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
